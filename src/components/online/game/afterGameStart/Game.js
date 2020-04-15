import React from 'react';
import {withRouter} from "react-router-dom";
import {BaseContainer, ButtonContainer, FormContainer, PokeCodeContainer, PlayerContainer} from "../../../../helpers/layout";
import Header from "../../../../views/Header";
import styled from "styled-components";
import {Button, MenuButton, RoundContainer, TransparentButton} from "../../../../views/design/Button";
import {BackIcon} from "../../../../views/design/Icons";
import {api, handleError} from "../../../../helpers/api";
import {Spinner} from "../../../../views/design/Spinner";
import {Player, PlayerAdmin, PlayerMe, PlayerMeAndAdmin, PlayerStatCard} from "../../../../views/Player";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';


class Game extends React.Component {

    recurrentTimer = null;
    timeout_chose = null;
    timeout_getMidInfo = null;
    timeout_berry = null;
    timeout_result = null;

    period = {
        CHOOSECATEGORY: "choose",
        EVOLVE: "evolve",
        RESULT: "result",
        FINISHED: "finished",
        WAIT: "wait"
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
            period: this.period.CHOOSECATEGORY,
            justInitialized: true,
            chosenCategory: null,
            evolved: 0,
            remainingTime: null

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
            let usersList = [];
            let user_me = null
            for (let i=0; i<resp2.players.length; i++) {
                usersList.push(resp2.players[i].user)
                if (resp2.players[i].user.id == localStorage.getItem('id')) {
                    user_me = resp2.players[i].user
                }
            }

            if (resp2.state == "LOBBY") {
                this.goToSocialMode()
            }


            let amIAdmin1 = false;
            if (user_me.username == resp2.creator.user.username) {
                amIAdmin1 = true;
            }

            let amITurnPlayer1 = false;
            if (user_me.username == resp2.turnPlayer.user.username) {
                amITurnPlayer1 = true;
            }


            await this.setState({
                admin: resp2.creator.user,
                players: usersList,
                player_me: user_me,
                state: resp2.state,
                turnPlayer: resp2.turnPlayer,
                amIAdmin: amIAdmin1,
                amITurnPlayer: amITurnPlayer1,
                pokeCode: this.props.match.params.pokeCode
            })

            if (this.state.justInitialized) {
                let startTime = this.state.startTime.substring(0, 10) + 'T' + this.state.startTime.substring(11);
                startTime = parseInt(new Date(startTime).getTime(), 10);
                let startTimeDELETETHIS = startTime-30000;
                console.log(startTime)
                this.setState({'startTime' : startTime});
            }

            this.setState({justInitialized: false});


        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
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
        /*
        try {
            console.log("Tried getting game info");
            const requestBody = JSON.stringify({
                category: category
            });
            const response = await api.put('/games/'+this.state.pokeCode+'/categories',requestBody , { headers: {'Token': localStorage.getItem('token')}});

        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }

         */
    }

    startRound() {
        let startTime = this.state.startTime+30000;
        this.setState({'startTime': startTime});
        //console.log(startTime+10000 - new Date().getTime());
        this.setState({remainingTime: startTime+10000 - new Date().getTime(), period: this.period.CHOOSECATEGORY});

        if (this.state.amITurnPlayer) {
            this.timeout_chose = setTimeout(()=>{
                this.makeTurn();
                this.setState({
                    categoryChosen: null,
                    remainingTime: startTime+15000 - new Date().getTime()
                })
                console.log("Now turnPlayer made a turn (after 10 seconds)")
            }, startTime+10000 - new Date().getTime());
            }

        this.timeout_getMidInfo = setTimeout(()=>{
            //this.getGameInfo()
            this.setState({
                categoryChosen: null,
                period: this.period.EVOLVE,
                remainingTime: startTime+20000 - new Date().getTime()
            })
            console.log("Now every player gets info (after 15 seconds)")
        }, startTime+15000 - new Date().getTime());

        this.timeout_berry = setTimeout(()=>{
            console.log("Now every player has or hasn't evolved berry (after 20 seconds)")
            //put request for berry
            this.setState({
                period: this.period.WAIT,
                remainingTime: startTime+25000 - new Date().getTime()
            })
        }, startTime+20000 - new Date().getTime());

        this.timeout_result =setTimeout(()=>{
            console.log("Now every player gets end result (after 25 seconds)")
            //this.getGameInfo()
            this.setState({
                period: this.period.RESULT
            })
        }, startTime+25000 - new Date().getTime());

    }

    recurrentRounds() {
        this.recurrentTimer = setInterval(()=>{
            this.startRound();
        }, 30000);
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

    renderTime = value => {
        if (value == 0){
            return <div>NOW</div>
        }

        return (
            <div className="timer">
                <div className="text">Period: {this.state.period} </div>
                <div className="value">{value}</div>

            </div>
        );
    };


    componentDidMount() {
        //this.getGameInfo();
        setTimeout('', 500);
        console.log("Entered mount")
        this.recurrentRounds();
        this.startRound();
    }

    componentDidUpdate() {
        console.log("Remaining Time: "+ this.state.remainingTime/1000 + " seconds for "+ this.state.period)
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
    }

    circleTimer(time) {
        return (<CountdownCircleTimer
            isPlaying
            durationSeconds={time}
            colors={[
                ['#004777', .33],
                ['#F7B801', .33],
                ['#A30000']
            ]}
            renderTime = {this.renderTime}
            trailColor= "transparent"
        />)
    }

    render() {
        return (
            <BaseContainer>
                <Header height={140} top={33} />
                {this.circleTimer(this.state.remainingTime/1000)}

            </BaseContainer>
        );
    }
}
export default withRouter(Game);