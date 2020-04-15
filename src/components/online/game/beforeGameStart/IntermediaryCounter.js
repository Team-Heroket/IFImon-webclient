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

const Row = styled.div`
    &::after{
    content: "";
    clear: "";
    display: table "";
    }
    `;



const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const Label = styled.label`
  position: relative;
  transform : translate(-50%, 0%);
  width: 400px;
  left: 50%;
  color: white;
  margin-left: 50px;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Label2 = styled.label`
  position: relative;
  transform : translate(-50%, 0%);
  width: 400px;
  left: 50%;
  color: white;
  margin-bottom: 10px;
  
  text-align: center;
  font-weight: 500;
  font-size: 20px;
`;

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  align-items: center;
  justify-content: center;
`;


const Space = styled.div`
  margin-bottom: 45px
`;

const Column = styled.div`
    float: right
    align-items: center
    width = 100%
    
    @media only screen and (min-width: 768px){
    width: 50%;
    }
`





class IntermediaryCounter extends React.Component {
    totalTimer = null;


    constructor() {
        super();

        this.state = {
            pokeCode: null,
            clickedOnStart: null
        };
    }

    setTimer() {
        let start = this.getClickedOnStart();
        let timePassed = this.getTimePassed(start)

        console.log("Time passed: "+timePassed)
        if (timePassed > 30000) {
            this.goToSocialMode();
        }
        else {
            let remainingTime = 30000-timePassed;
            this.totalTimer = setTimeout(() => {
                this.goToGame();
            }, remainingTime)
        }

    }

    async getClickedOnStart() {
        try {

            console.log("Tried to get timer now");

            const response2 = await api.get('/games/' + this.props.match.params.pokeCode.toString(), {headers: {'Token': localStorage.getItem('token')}});
            const resp2 = response2.data;
            this.setState({clickedOnStart: resp2.clickedOnStart})
            return resp2.clickedOnStart
        }
        catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }

    }

    getTimePassed(start) {
        let startmili = parseInt(new Date(start).getTime(),10);
        let nowmili = parseInt(new Date().getTime(), 10)
        console.log(startmili);
        console.log(nowmili);
        let remainingTime = nowmili-startmili;
        return remainingTime;
    }

    componentDidMount() {
        this.setState({pokeCode: this.props.match.params.pokeCode})
        //this.setTimer();
    }

    componentWillUnmount() {
        clearTimeout(this.totalTimer);
        this.totalTimer=null;
    }

    renderTime = value => {
        if (value == 0){
            return <div>NOW</div>
        }

        return (
            <div className="timer">
                <div className="text">Game starts in</div>
                <div className="value">{value}</div>
                <div className="text">seconds</div>
            </div>
        );
    };
    

    render() {

        return (
            <BaseContainer>
                <Header height={140} top={33} />
                <FormContainer>
                <CountdownCircleTimer
                    isPlaying
                    durationSeconds={30}
                    colors={[
                        ['#004777', .33],
                        ['#F7B801', .33],
                        ['#A30000']
                    ]}
                    renderTime = {this.renderTime}
                    trailColor= "transparent"
                />
                </FormContainer>
            </BaseContainer>


        );
    }


}
export default withRouter(IntermediaryCounter);