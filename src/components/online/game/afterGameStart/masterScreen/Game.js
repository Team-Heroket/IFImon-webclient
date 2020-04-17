import React from 'react';
import {withRouter} from "react-router-dom";
import {
    BaseContainer,
    ButtonContainer,
    FormContainer,
    PokeCodeContainer,
    PlayerContainer,
    GameContainer, Row
} from "../../../../../helpers/layout";
import Header from "../../../../../views/Header";
import styled from "styled-components";
import {Button, MenuButton, RoundContainer, TransparentButton} from "../../../../../views/design/Button";
import {BackIcon} from "../../../../../views/design/Icons";
import {api, handleError} from "../../../../../helpers/api";
import {Spinner} from "../../../../../views/design/Spinner";
import {Player, PlayerAdmin, PlayerMe, PlayerMeAndAdmin, PlayerStatCard} from "../../../../../views/Player";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import {ChooseCategory} from "../subScreens/ChooseCategory";
import {Evolve} from "../subScreens/Evolve";
import {Finished} from "../subScreens/Finished";
import {Result} from "../subScreens/Result";
import {Clock} from "../Clock";


const Space = styled.div`
  margin-bottom: 80px
  width: 100%
`;

class Game extends React.Component {

    recurrentTimer = null;
    timeout_all = null;
    timeout_chose = null;
    timeout_getMidInfo = null;
    timeout_berry = null;
    timeout_result = null;
    timeout_newRoundTimer = null;

    timeUntilEvolve = 15000;
    timeUntilResult = 30000;
    timeUntilNewRoundTimer = 35000;
    timeUntilNewRound = 40000;

    period = {
        CHOOSECATEGORY: "choose",
        EVOLVE: "evolve",
        RESULT: "result",
        FINISHED: "finished",
        WAIT: "wait",
        INTERMEDIARY: "intermediary",
        NEWROUNDTIMER: "newroundtimer"
    }

    category = {
        HEIGHT: "HEIGHT",
        WEIGHT: "WEIGHT",
        CAPTURERATE: "CAPTURERATE",
        ATTACKPOINTS: "ATTACKPOINTS",
        DEFENSEPOINTS: "DEFENSEPOINTS"
    }

    constructor() {
        super();
        this.state = {
            pokeCode: null,
            players: null,
            player_me: null,
            admin: null,
            turnPlayer: null,
            startTime: new Date().getTime()-30000,
            amITurnPlayer: true,
            amIAdmin: null,
            period: this.period.INTERMEDIARY,
            justInitialized: true,
            chosenCategory: null,
            evolved: 0,
            remainingTime: null,
            berries: null,
            evolveBerries: 0
        }
    }

    goToSocialMode() {
        this.props.history.push('/socialmode');
    }


    async getGameInfo() {
        try {
            console.log("Tried getting game info");

            const response2 = await api.get('/games/'+this.props.match.params.pokeCode.toString(), { headers: {'Token': localStorage.getItem('token')}});
            const resp2 = response2.data;
            let usersList = resp2.players;
            usersList.sort((a, b) => (a.deck.cards.length > b.deck.cards.length) ? 1 : -1)

            usersList[0].ranking = 1;
            if (usersList[0].id == resp2.turnPlayer.id) {
                usersList[0].turnPlayer = true;
            }
            else {
                usersList[0].turnPlayer = false;
            }
            console.log(usersList[0].turnPlayer);
            for (let i=1; i<usersList.length; i++) {
                if (usersList[i].id == resp2.turnPlayer.id) {
                    usersList[i].turnPlayer = true;
                }
                else {
                    usersList[i].turnPlayer = false;
                }

                if (usersList[i-1].deck.cards.length==usersList[i].deck.cards.length) {
                    usersList[i].ranking = usersList[i-1].ranking
                }
                else {
                    usersList[i].ranking = usersList[i-1].ranking+1;
                }
            }

            let user_me = null;
            for (let i=0; i<resp2.players.length; i++) {
                if (resp2.players[i].user.id == localStorage.getItem('id')) {
                    user_me = resp2.players[i]
                }
            }

            if (resp2.state == "LOBBY") {
                this.goToLobby();
            }


            let amIAdmin1 = false;
            if (user_me.user.username == resp2.creator.user.username) {
                amIAdmin1 = true;
            }

            let amITurnPlayer1 = false;
            if (user_me.user.username == resp2.turnPlayer.user.username) {
                amITurnPlayer1 = true;
            }



            this.setState({
                admin: resp2.creator.user,
                players: usersList,
                player_me: user_me,
                state: resp2.state,
                turnPlayer: resp2.turnPlayer,
                amIAdmin: amIAdmin1,
                amITurnPlayer: amITurnPlayer1,
                pokeCode: this.props.match.params.pokeCode,
                berries: user_me.berries,
                deck: user_me.deck
            })

            if (this.state.justInitialized) {
                console.log("startTime before substring", resp2.startTime);
                let startTime = resp2.startTime.substring(0, 10) + 'T' + resp2.startTime.substring(11);
                console.log("Start Time is equal to: "+startTime)
                console.log("Now the time is equal to: "+new Date())
                startTime = parseInt(new Date(startTime).getTime(), 10);
                this.setState({'startTime' : startTime}, this.startGame);
            }



        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    startGame() {
        let remainingTime = this.state.startTime - new Date().getTime();
        this.setState({remainingTime: remainingTime})
        this.timeout_all = setTimeout(()=>{
            this.setState({justInitialized: false})
            this.startRound();
            this.recurrentRounds();
        }, remainingTime)

    }



    startClock() {

        if (!this.state.remainingTime) {
            return <Spinner/>
        }
        else {
            return <Clock remainingTime = {this.state.remainingTime} totalTime = {35000}/>
        }
    }

    async evolvePokemon() {
        try {
            const requestBody = JSON.stringify({
                amount: this.state.evolveBerries,
                id: this.state.player_me.user.id
            });
            const response = await api.put('/games/'+this.state.pokeCode+'/berries',requestBody , { headers: {'Token': localStorage.getItem('token')}});
            let currentBerries = this.state.berries;
            this.setState({berries: currentBerries-this.state.evolveBerries})


        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }


    async makeTurn() {
        //Insert Put Function for turnPlayer to choose
        let category = this.state.chosenCategory;
        if (!category) {
            let categories = [this.category.HEIGHT, this.category.WEIGHT, this.category.CAPTURERATE, this.category.ATTACKPOINTS, this.category.DEFENSEPOINTS];
            let randomIndex = Math.floor(Math.random() * Math.floor(categories.length));
            category = categories[randomIndex]
            console.log("Random Category: "+category);
        }

        try {
            console.log("Tried getting game info");
            const requestBody = JSON.stringify({
                category: category
            });
            const response = await api.put('/games/'+this.state.pokeCode+'/categories',requestBody , { headers: {'Token': localStorage.getItem('token')}});

        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }


    }


    startRound() {
        console.log("Got In here start round")
        let startTime = this.state.startTime;

        this.setState({startTime: startTime+40000,remainingTime: startTime+15000 - new Date().getTime(), period: this.period.CHOOSECATEGORY});

        this.timeout_chose = setTimeout(()=>{
            this.setState({
                categoryChosen: null,
                remainingTime: startTime+this.timeUntilResult - new Date().getTime(),
                period: this.period.EVOLVE
            })
            console.log("Now turnPlayer made a turn or just waited (after 15 seconds)")
        }, startTime+this.timeUntilEvolve - new Date().getTime());


        this.timeout_getMidInfo = setTimeout(()=>{
            this.getGameInfo()
            this.setState({
                categoryChosen: null,
                period: this.period.RESULT,
                remainingTime: startTime+this.timeUntilNewRoundTimer - new Date().getTime()
            })
            console.log("Now every player gets info (after 15 seconds)")
        }, startTime+this.timeUntilResult - new Date().getTime());

        this.timeout_result = setTimeout(()=>{
            this.setState({
                categoryChosen: null,
                period: this.period.NEWROUNDTIMER,
                remainingTime: startTime+this.timeUntilNewRound - new Date().getTime()
            })
            console.log("Now every player gets info (after 15 seconds)")
        }, startTime+this.timeUntilNewRoundTimer - new Date().getTime());

        this.timeout_newRoundTimer = setTimeout(()=>{
            this.setState({
                categoryChosen: null,
                period: this.period.NEWROUNDTIMER,
            })
            console.log("Now every player gets info (after 15 seconds)")
        }, startTime+this.timeUntilNewRound - new Date().getTime());


    }

    recurrentRounds() {
        this.recurrentTimer = setInterval(()=>{
            this.startRound();
        }, 40000);
    }

    async giveUp() {
        try {
            const requestBody = JSON.stringify({
                id: this.state.user.id,
                action: "LEAVE"
            });
            console.log(requestBody);
            console.log(this.state.pokeCode)
            await api.put('/games/'+this.state.pokeCode+'/players', requestBody,{ headers: {'Token': localStorage.getItem('token')}});
            this.goToSocialMode();
        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }



    componentDidMount() {
        this.getGameInfo();
    }


    componentWillUnmount() {
        clearInterval(this.recurrentTimer);
        this.recurrentTimer=null;
        clearTimeout(this.timeout_chose);
        this.timeout_chose=null;
        clearTimeout(this.timeout_getMidInfo);
        this.timeout_getMidInfo=null;
        clearTimeout(this.timeout_berry);
        this.timeout_berry=null;
        clearTimeout(this.timeout_result);
        this.timeout_result=null;
        clearTimeout(this.timeout_all);
        this.timeout_all=null;
    }

    renderPeriod() {
        if (this.state.period == this.period.CHOOSECATEGORY) {
            return <ChooseCategory masterState = {this.state}/>
        }
        else if (this.state.period == this.period.EVOLVE) {
            return <Evolve masterState = {this.state}/>
        }
        else if (this.state.period == this.period.RESULT) {
            return <Result masterState = {this.state}/>
        }
        else if (this.state.period == this.period.NEWROUNDTIMER) {
            return <Clock remainingTime = {this.state.remainingTime} totalTime = {5000}/>
        }
    }


    render() {
        return (
            <GameContainer>
                <Header height={140} top={33} />
                <Row>
                    <RoundContainer onClick={() => {
                        this.goBack()
                    }}>
                        <BackIcon/>
                    </RoundContainer>
                </Row>
                {this.state.justInitialized ?

                    <div><Space/>{this.startClock()}</div> : this.renderPeriod()
                }

            </GameContainer>
        );
    }
}
export default withRouter(Game);