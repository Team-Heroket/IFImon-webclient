import React from 'react';
import {withRouter} from "react-router-dom";
import {FormContainer, GameContainer, Row} from "../../../../../helpers/layout";
import Header from "../../../../../views/Header";
import styled from "styled-components";
import {BackButton, SoundButton} from "../../../../../views/design/Icons";
import {api, handleError} from "../../../../../helpers/api";
import {Spinner} from "../../../../../views/design/Spinner";
import {ChooseCategory} from "../subScreens/ChooseCategory";
import {Evolve} from "../subScreens/Evolve";
import {Finished} from "../subScreens/Finished";
import {Result} from "../subScreens/Result";
import {Clock} from "../Clock";
import {Spectator} from "../subScreens/Spectator";
import Grid from "@material-ui/core/Grid";
import {RandomPokemonFact} from "../../../mainmenu/RandomPokemonFact";
import {FinishedTest} from "../subScreens/FinishedTest";





const Space = styled.div`
  margin-bottom: 80px
  width: 100%
`;

const Audio = React.memo(function Audio({children}) {
    return(
        <div style={{width: '0px', height: '0px', margin: '0px', fontSize: '0'}}>
            <audio src={require('../../../../shared/BackGroundMusic.mp3')} id="Background"/>
            {setTimeout(()=> {
                try{
                document.getElementById("Background").volume = localStorage.getItem('VolumeMuted')=='false' ? (localStorage.getItem('MusicVol')/100) : 0;
                document.getElementById("Background").play();
                document.getElementById("Background").loop = true;
                }catch (e) {}
                }, 500)}
        </div>
    )
})

/**
 1) all clients: get game
 2) turnPlayer: put category
 3) all clients: get game
 4) those clients who want to: put berry
 5) all clients get game
 6)turnPlayer: put nextTurn
 */

class Game extends React.Component {

    timeout_makeTurn = null;
    timeout_waitForCategoryResult = null;
    timeout_evolve = null;
    timeout_callNext = null;
    timeout_waitForAdmin = null;
    timeout_all = null;

    timer_spectator = null;
    timer_waitForNextTurn = null;
    timer_waitForCategory = null;
    timer_listenToAdmin = null;



    period = {
        CHOOSECATEGORY: "choose",
        EVOLVE: "evolve",
        RESULT: "result",
        FINISHED: "finished",
        WAIT: "wait",
        INTERMEDIARY: "intermediary",
        NEWROUNDTIMER: "newroundtimer",
        SPECTATOR: "spectator"
    }

    category = {
        HP: "HP",
        WEIGHT: "WEIGHT",
        CAPTURERATE: "CAPTURE_RATING",
        ATTACKPOINTS: "ATK",
        DEFENSEPOINTS: "DEF",
        SPEED: "SPEED"
    }

    clock = {
        GAMESTART: "gamestart",
        NEWROUND: "newround",
        PERIOD: "period"
    }

    constructor() {
        super();
        this.state = {
            pokeCode: null,
            players: null,
            player_me: null,
            admin: null,
            turnPlayer: null,
            startTime: null,
            amITurnPlayer: null,
            amIAdmin: null,
            justInitialized: true,
            chosenCategory: null,
            evolved: false,
            remainingTime: null,
            berries: null,
            evolveBerries: 0,
            nowTemporaryTimer: false,
            goToEvolve: true,
            currentPeriod: this.period.INTERMEDIARY,
            oldPeriod: this.period.INTERMEDIARY,
            currentCard: null,
            oldCard: null,
            state: null,
            totalCards: null,
            mute: (localStorage.getItem('VolumeMuted') ? (localStorage.getItem('VolumeMuted')=='true' ? true : false) : false)
        }
        localStorage.setItem('SelectedCat',0);
    }


    async getGameInfo() {
        try {
            console.log("Tried getting game info");

            const response2 = await api.get('/games/' + this.props.match.params.pokeCode.toString(), {headers: {'Token': localStorage.getItem('token')}});
            const resp2 = response2.data;
            let usersList = resp2.players;
            usersList.sort((a, b) => (a.deck.cards.length > b.deck.cards.length) ? -1 : 1)


            //This here does the ranking:
            usersList[0].ranking = 1;
            for (let i=1; i<usersList.length; i++) {
                if (usersList[i - 1].deck.cards.length == usersList[i].deck.cards.length) {
                    usersList[i].ranking = usersList[i - 1].ranking
                } else {
                    usersList[i].ranking = usersList[i - 1].ranking + 1;
                }
            }

            this.setState({'amITurnPlayer': false});
            if (resp2.turnPlayer.user.id == localStorage.getItem('id')) {
                this.setState({'amITurnPlayer': true});
            }

            let user_me = null;
            //For every user sets turnplayer to true or false
            for (let i=0; i<usersList.length; i++) {
                if (usersList[i].user.id == resp2.turnPlayer.user.id) {
                    usersList[i].turnPlayer = true;
                }
                else {
                    usersList[i].turnPlayer = false;
                }
                if (usersList[i].user.id == localStorage.getItem('id')) {
                    user_me = usersList[i];
                }
            }
            let amIAdmin = false;
            if (user_me.id == resp2.creator.id) {
                amIAdmin = true;
            }
            console.log("Am I Admin? "+amIAdmin)

            let currentPeriod = null;
            let oldCard = null;
            if (resp2.state == 'FINISHED') {
                currentPeriod = this.period.FINISHED;
                clearInterval(this.timer_waitForNextTurn);
                this.timer_waitForNextTurn= null;
                oldCard = this.state.oldCard;
            }

            else if (user_me.deck.empty) {
                currentPeriod = this.period.SPECTATOR;
                oldCard = this.state.oldCard;
            }



            else if (resp2.winners.length == 0) {
                if(this.state.currentPeriod == this.period.RESULT){
                    localStorage.setItem('SelectedCat',0);
                }
                currentPeriod = this.period.CHOOSECATEGORY;
                clearInterval(this.timer_waitForNextTurn);
                this.timer_waitForNextTurn= null;
                clearInterval(this.timer_listenToAdmin);
                this.timer_listenToAdmin=null;

                oldCard = user_me.deck.cards[0];
            }
            else {
                if (this.state.goToEvolve) {
                    currentPeriod = this.period.EVOLVE;
                    clearInterval(this.timer_waitForNextTurn);
                    clearInterval(this.timer_waitForCategory);
                    this.timer_waitForCategory=null;
                    oldCard = this.state.oldCard;
                }
                else {
                    currentPeriod = this.period.RESULT;
                }
            }


            this.setState({
                admin: resp2.creator.user,
                players: usersList,
                player_me: user_me,
                state: resp2.state,
                turnPlayer: resp2.turnPlayer,
                pokeCode: this.props.match.params.pokeCode,
                berries: user_me.berries,
                deck: user_me.deck,
                winners: resp2.winners,
                amIAdmin: amIAdmin,
                chosenCategory: resp2.category,
                currentPeriod: currentPeriod,
                currentCard: user_me.deck.cards[0]
            })



            if (this.state.justInitialized) {
                let totalCards = usersList[0].deck.cards.length;
                let startTime = Number.parseInt(resp2.startTime,10);
                this.setState({'startTime': startTime, totalCards: totalCards}, this.startGame);
            }


        } catch (error) {
            if (error.response.status == 404) {
                this.props.history.push('/menu')
            }
            else {
                alert(`Something went wrong: \n${handleError(error)}`);
            }
        }
    }

    startGame() {
        console.log("Starttime is: "+this.state.startTime);
        let remainingTime = this.state.startTime - new Date().getTime();
        console.log("Remaining time is: "+remainingTime);
        this.setState({remainingTime: remainingTime})
        if (remainingTime < 0) {
            this.setState({justInitialized: false}, this.startRound)
        }
        else {
            this.timeout_all = setTimeout(() => {
                this.setState({justInitialized: false})
                this.startRound();
            }, remainingTime)
        }
    }

    startClock() {

        if (!this.state.remainingTime) {
            return <Spinner/>

        } else {
            return (
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <FormContainer width={'500px'}>
                        <Clock remainingTime={this.state.remainingTime} totalTime={15000} type={this.clock.GAMESTART} />
                    </FormContainer>
                    <FormContainer width={'500px'}>
                        <RandomPokemonFact/>
                    </FormContainer>
                </Grid>

        );


        }
    }

    async evolvePokemon() {
        console.log("Make evolve put request")
        try {
            console.log("Amount in evolve is: "+localStorage.getItem('evolveTo'))
            const requestBody = JSON.stringify({
                amount: localStorage.getItem('evolveTo'),
                id: this.state.player_me.user.id
            });
            let currentBerries = this.state.berries;
            this.setState({berries: currentBerries - this.state.evolveBerries, evolved: true})
            const response = await api.put('/games/' + this.state.pokeCode + '/berries', requestBody, {headers: {'Token': localStorage.getItem('token')}});


        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }

    async makeTurn() {
        console.log("Make category put request")
        //Insert Put Function for turnPlayer to choose
        let category = localStorage.getItem('SelectedCat');
        if (category == 0) {
            let categories = [this.category.HP, this.category.SPEED, this.category.WEIGHT, this.category.CAPTURERATE, this.category.ATTACKPOINTS, this.category.DEFENSEPOINTS];
            let randomIndex = Math.floor(Math.random() * Math.floor(categories.length));
            category = categories[randomIndex]
            localStorage.setItem('SelectedCat', category);
            console.log("Random Category: " + category);
        }

        try {
            console.log("Category selected: ", category);
            const requestBody = JSON.stringify({
                category: category
            });
            const response = await api.put('/games/' + this.state.pokeCode + '/categories', requestBody, {headers: {'Token': localStorage.getItem('token')}});

        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }


    }

    /**
     1) all clients: get game - DONE 0-5s
     2) turnPlayer: put category - DONE 13-15s
     3) all clients: get game - DONE 15s
     4) those clients who want to: put berry - DONE
     5) all clients get game - DONE
     6) turnPlayer: put nextTurn - DONE
     */

    async startNormalRound() {
        let startTime = this.state.startTime;
        console.log("entered startNormalRound now")

        if (this.state.currentPeriod == this.period.FINISHED) {
            this.startFinishedRound();
        }

        else if (this.state.currentPeriod == this.period.SPECTATOR) {
            this.startSpectatorRound();
        }

        else if (this.state.currentPeriod == this.period.CHOOSECATEGORY) {
            this.setState({goToEvolve: true, evolved: false});
            if (this.state.amITurnPlayer) {
                this.timeout_makeTurn = await setTimeout(() => {
                    this.makeTurn();
                    localStorage.setItem('playedSound', 'false');
                }, 13000)
                this.timeout_waitForCategoryResult = setTimeout(() => {
                    this.timer_waitForCategory= setInterval(() => {
                        console.log('getGame made in waitForCategory with pokeCode: '+this.state.pokeCode)
                        this.getGameInfo()
                    }, 1000)
                }, 12000)
            }
            else {
                this.timer_waitForCategory= setInterval(() => {
                    console.log('getGame made in waitForCategory with pokeCode: '+this.state.pokeCode)
                    this.getGameInfo()
                }, 2000)
            }
        }
        else if (this.state.currentPeriod == this.period.EVOLVE) {
            localStorage.setItem('evolveTo', 0);
            this.timeout_evolve = setTimeout(() => {
                if (localStorage.getItem('evolveTo') != 0) {
                    this.evolvePokemon();
                }
                this.setState({goToEvolve: false},  this.getGameInfo);
                localStorage.setItem('playedSound', 'false');
            }, 10000)
        }
        else if (this.state.currentPeriod == this.period.RESULT) {
            localStorage.setItem('evolveTo', 0);
            console.log('getGame made in result with pokeCode: '+this.state.pokeCode)
            this.getGameInfo()
            this.timer_waitForNextTurn= setInterval(() => {
                this.getGameInfo()
            }, 2000)
            setTimeout(() => {
                localStorage.setItem('playedSound', 'false');
            }, 13000)

            if (this.state.amIAdmin) {
                this.timeout_callNext = setTimeout(() => {
                    this.makeFinalTurn();
                    setTimeout(() => {
                        this.setState({goToEvolve: true},  this.getGameInfo);
                    }, 2000)
                }, 10000)
            }
        }

    }

    startSpectatorRound() {
        let startTime = this.state.startTime;

        this.setState({period: this.period.SPECTATOR, startTime: startTime + 40000});

        clearTimeout(this.timeout_makeTurn);
        this.timeout_makeTurn = null;

        clearTimeout(this.timeout_waitForCategoryResult);
        this.timeout_waitForCategoryResult = null;

        clearTimeout(this.timeout_evolve);
        this.timeout_evolve = null;

        clearTimeout(this.timeout_callNext);
        this.timeout_callNext = null;

        clearInterval(this.timer_waitForNextTurn);
        this.timer_waitForNextTurn = null;

        clearInterval(this.timer_waitForCategory)
        this.timer_waitForCategory = null;

        this.getGameInfo();

        this.timer_spectator = setInterval( () => {
            this.getGameInfo();
        }, 10000)


    }

    async getGameWaitForAdmin() {
        try {
            console.log("Tried getting game info");

            const response2 = await api.get('/games/' + this.props.match.params.pokeCode.toString(), {headers: {'Token': localStorage.getItem('token')}});
            const resp2 = response2.data;
            let startTime = parseInt(resp2.startTime,10);
            let state = resp2.state;

            this.setState({startTime: startTime, state: state})


        } catch (error) {
            if (error.response.status == 404) {
                this.props.history.push('/menu')
            }
            else {
                alert(`Something went wrong: \n${handleError(error)}`);
            }
        }
    }

    startFinishedRound() {
        this.setState({period: this.period.FINISHED});

        clearInterval(this.recurrentTimer);
        this.recurrentTimer = null;

        if (this.state.amIAdmin) {
            this.timer_listenToAdmin = setInterval(() => {
                console.log('getGame made in listenToAdmin with pokeCode: '+this.state.pokeCode)
                this.getGameWaitForAdmin();
            }, 2000)
        }
        else {

            this.timer_listenToAdmin = setInterval(() => {
                console.log('getGame made in listenToAdmin with pokeCode: '+this.state.pokeCode)
                this.getGameWaitForAdmin();
            }, 2000)
        }

    }

    async startRound() {

        this.startNormalRound();

    }

    componentDidUpdate(prevProps, prevState) {

        if (prevState.currentPeriod != this.state.currentPeriod && !this.state.justInitialized && prevState.currentPeriod) {
            console.log("prevState is: "+prevState.currentPeriod)
            console.log("currentState is: "+this.state.currentPeriod)
            this.startRound();
        }

        if (prevState.currentPeriod && prevState.currentCard  && this.state.currentCard &&  prevState.currentCard.id != this.state.currentCard.id && !this.state.justInitialized && this.state.currentPeriod == this.period.RESULT && !this.state.evolved) {

            console.log(" Entered ComponentDidUpdate Period with: "+localStorage.getItem('evolveTo'));
            this.setState({goToEvolve: true});
        }

        if (prevState.currentPeriod &&  prevState.amIAdmin != this.state.amIAdmin && !this.state.justInitialized && this.state.currentPeriod == this.period.RESULT) {
            clearInterval(this.timer_waitForNextTurn);
            this.timer_waitForNextTurn = null;
            this.startRound();
        }

        if (prevState.state && this.state.state && prevState.state == 'FINISHED' && this.state.state == 'RUNNING') {
            this.setState({justInitialized: true}, this.getGameInfo)
            clearInterval(this.timer_listenToAdmin);
            this.timer_listenToAdmin = null;
            clearTimeout(this.timeout_waitForAdmin);
            this.timeout_waitForAdmin = null;
        }
    }

    componentDidMount() {
        this.setupBeforeUnloadListener();
        this.getGameInfo();
    }

    componentWillUnmount() {
        clearTimeout(this.timeout_all)
        this.timeout_all = null;

        clearTimeout(this.timeout_makeTurn);
        this.timeout_makeTurn = null;

        clearTimeout(this.timeout_waitForCategoryResult);
        this.timeout_waitForCategoryResult = null;

        clearTimeout(this.timeout_evolve);
        this.timeout_evolve = null;

        clearTimeout(this.timeout_callNext);
        this.timeout_callNext = null;

        clearInterval(this.timer_waitForNextTurn);
        this.timer_waitForNextTurn = null;

        clearInterval(this.timer_waitForCategory)
        this.timer_waitForCategory = null;

        clearInterval(this.timer_spectator);
        this.timer_spectator = null;

        clearInterval(this.timer_listenToAdmin);
        this.timer_listenToAdmin = null;

        clearTimeout(this.timeout_waitForAdmin);
        this.timeout_waitForAdmin = null;
        this.leaveGame();
    }

    async leaveGame() {
        localStorage.setItem('generation', null);
        try {
            const requestBody = JSON.stringify({
                id: this.state.player_me.user.id,
                action: "LEAVE"
            });
            console.log(requestBody);
            console.log(this.state.pokeCode)
            await api.put('/games/'+this.state.pokeCode+'/players', requestBody,{ headers: {'Token': localStorage.getItem('token')}});
        } catch (error) {
            console.log('logged error:'+ error);
            if (error.response.status != 404) {
                alert(`Something went wrong: \n${handleError(error)}`);
            }

        }
    }

    renderPeriod() {

        if (this.state.currentPeriod == this.period.CHOOSECATEGORY) {
            return <ChooseCategory masterState={this.state} history={this.props.history} parentMethod={() => {this.forceUpdate()}} />
        } else if (this.state.currentPeriod == this.period.EVOLVE) {
            console.log(" Entered EVOLVE Period with: "+localStorage.getItem('evolveTo'));
            return <Evolve masterState={this.state} history={this.props.history} parentMethod={() => {this.forceUpdate()}}/>
        } else if (this.state.currentPeriod == this.period.RESULT) {
            console.log(" Entered RESULT Period with: "+localStorage.getItem('evolveTo'));
            return <Result masterState={this.state} history={this.props.history} />
        } else if (this.state.currentPeriod == this.period.SPECTATOR) {
            return <Spectator masterState={this.state} history={this.props.history}/>
        } else if (this.state.currentPeriod == this.period.FINISHED) {
            return <FinishedTest masterState={this.state} history={this.props.history}/>
        } else if (this.state.currentPeriod == this.period.NEWROUNDTIMER) {
            return <Clock remainingTime={this.state.remainingTime} totalTime={5000} type={this.clock.NEWROUND}/>

        }
    }

    goBack() {
        if (window.confirm('Are you sure you want to leave the game?')) this.props.history.push('/menu')
    }

    setupBeforeUnloadListener = () => {
        window.addEventListener("beforeunload", (ev) => {
            return this.leaveGame();
        });
    };

    render() {
        return (
            <GameContainer>
                <Audio/>
                <Header height={140} top={33}/>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                >
                    <BackButton action={() => {this.goBack()}}/>
                    { this.state.mute ?
                        <SoundButton mute={true} action={()=>{
                            localStorage.setItem('VolumeMuted', 'false');
                            this.setState({mute: false});
                            document.getElementById("Background").volume = localStorage.getItem('MusicVol')/100;
                        }} />
                        :
                        <SoundButton mute={false} action={() => {
                            localStorage.setItem('VolumeMuted', 'true');
                            this.setState({mute: true});
                            document.getElementById("Background").volume = 0}} />
                    }
                </Grid>

                {this.state.justInitialized ?

                    <FormContainer><Space/>{this.startClock()}</FormContainer> :
                    this.renderPeriod()
                }

            </GameContainer>
        );
    }

    async makeFinalTurn() {
        console.log("Tried to make final turn")
        try {
            const response = await api.put('/games/' + this.state.pokeCode + '/next', {}, {headers: {'Token': localStorage.getItem('token')}});

        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }

}

export default withRouter(Game);