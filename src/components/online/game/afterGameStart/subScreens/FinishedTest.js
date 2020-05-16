import React from "react";
import styled from "styled-components";
import {
    ButtonContainer,
    FormContainer, PlayerContainer, SimpleColumnContainer
} from "../../../../../helpers/layout";
import {AvatarButton, EvolveButton, LogOutButton} from "../../../../../views/design/Button";
import Confetti from "../../../../shared/Confetti";
import Grid from "@material-ui/core/Grid";
import {Clock} from "../Clock";
import {api, handleError} from "../../../../../helpers/api";
import {Spinner} from "../../../../../views/design/Spinner";
import {RandomPokemonFact} from "../../../mainmenu/RandomPokemonFact";
import {EmoteContainer, PlayerEmote, PlayerGame} from "../../../../../views/Player";
import Stepper from "@material-ui/core/Stepper";
import {ColorlibConnector, ColorlibStepIcon} from "../../../../../views/design/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import {BerriesIconWithBadge} from "../../../../../views/design/Icons";
import {FlippedCard} from "./FlippedCard";
import {PlaceholderCard} from "../../../../../views/design/PokemonCard";
import ReactCardFlip from "react-card-flip";


const Label = styled.label`
  position: relative;
  width: 400px;
 
  color: white;
  
  margin-bottom: 50px;
  text-transform: uppercase;
  font-size: 30px;
  font-weight: 300;
  text-align: center;
`;

const LabelSmall = styled.label`
  position: relative;
  transform : translate(-50%, 0%);
  width: 400px;
  left: 50%;
  color: white;
  margin-bottom: 10px;
`;

const Space = styled.div`
  margin-bottom: 80px
  width: 100%
`;

export class FinishedTest extends React.Component {
    clock = {
        GAMESTART: "gamestart",
        REMATCH: "rematch",
        PERIOD: "period",
    }
    timeout_leave = null;


    constructor() {
        super();
        this.state = {
            rematchClicked: false,
            timerOver: false,
            isFlipped: false
        };
    }

    showLeaderboard() {

        return (
            <div style={{width: '420px'}}>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                {this.props.masterState.players.map(player => {
                    return (
                        <PlayerContainer>
                            {player.user.id == localStorage.getItem('id') ?
                                (<PlayerEmote player={player} addOn = "(Me)" winner={this.props.masterState.winners[0].id == player.id}/>) :
                                (<PlayerEmote player={player} addOn = "" winner={this.props.masterState.winners[0].id == player.id}/>)
                            }
                        </PlayerContainer>

                    );
                })}
            </Grid>
                </div>
        );
    }

    componentDidMount() {
        this.timeout_leave = setTimeout(() => {
            this.setState({timerOver: true})
        }, 3000000)
    }


    componentDidUpdate() {
        if (this.state.timerOver && !this.state.rematchClicked) {
            this.props.history.push('/socialmode');
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout_leave);
        this.timeout_leave=null;
    }

    winnerText() {
        let text = '';
        if (this.props.masterState.winners[0].id === this.props.masterState.player_me.id) {
            text = 'You won the Game!'
        }
        else {
            text = ''+this.props.masterState.winners[0].user.username+' has won the Game!'
        }
        return text;
    }

    async rematch() {
        try {
            this.setState({rematchClicked: true})
            clearTimeout(this.timeout_leave);
            this.timeout_leave=null;
            const requestBody = JSON.stringify({
                npc: 0,
                card: this.props.masterState.totalCards,
                generation:  localStorage.getItem('generation')
            });
            await api.put('/games/' + this.props.masterState.pokeCode.toString(), requestBody, {headers: {'Token': localStorage.getItem('token')}});

        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }

    emotes = [1, 2, 3, 4, 5]

    showEmotes(){

        return (
            <div style={{width: '420px'}}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    {

                        this.emotes.map(emote => {
                        return (
                            <AvatarButton style={{margin: '20px'}} onClick={() => this.sendEmote(emote)}>
                                <EmoteContainer>
                                    <img src={require('../../../../shared/images/emotes/'+emote+'.svg')} />
                                </EmoteContainer>
                            </AvatarButton>

                        );
                    })}
                </Grid>
            </div>
        );
    }

    async sendEmote(emote){
        try {

            await api.put('/games/' + this.props.masterState.pokeCode.toString()+'/emotes', JSON.stringify({
                emote: emote}), {headers: {'Token': localStorage.getItem('token')}});

        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }

    render() {
        {console.log("rematchClicked is: "+this.state.rematchClicked)}
        return (
            <FormContainer margin={'5em'}>
                {this.props.masterState.winners[0].id == this.props.masterState.player_me.id && !this.state.rematchClicked ?
                    <Confetti/> : null}
                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center">

                    {this.rematchClicked ?
                        <div>
                            <LabelSmall>
                                Game will start shortly
                            </LabelSmall>
                            <Spinner/>
                            <RandomPokemonFact/>
                        </div>
                        :
                            <Grid
                                container
                                direction="row"
                                justify="space-around"
                                alignItems="center"
                            >
                                <div>
                                    <ButtonContainer>
                                        {this.props.masterState.winners[0].user.avatarId.valueOf() < 10 ? <img alt="avatar" src={require('../../../../../components/shared/images/avatarSVG/00'+(this.props.masterState.winners[0].user.avatarId)+'-avatar.svg')} height={"150px"} width={"150px"}/>
                                            : <img alt="avatar" src={require('../../../../../components/shared/images/avatarSVG/0'+(this.props.masterState.winners[0].user.avatarId)+'-avatar.svg')} height={"150px"} width={"150px"}/>}
                                    </ButtonContainer>
                                    <Space/>
                                    <Label>
                                        {this.winnerText()}
                                    </Label>
                                </div>
                                <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection='vertical'>
                                    {this.showLeaderboard()}

                                    {this.showEmotes()}
                                </ReactCardFlip>

                                {this.props.masterState.amIAdmin && !this.state.rematchClicked?
                                    <ButtonContainer>
                                        <Clock remainingTime={15000} totalTime={15000} type={this.clock.REMATCH} />
                                        <Space/>
                                        <div>
                                            <EvolveButton
                                                width = "150px"
                                                disabled = {this.state.rematchClicked}
                                                onClick={() => {this.rematch()}} > Rematch
                                            </EvolveButton>

                                        </div>
                                        <EvolveButton
                                            width = "150px"
                                            onClick={() => {this.setState({isFlipped: !this.state.isFlipped})}} > flipped
                                        </EvolveButton>
                                        <div>
                                            <LogOutButton
                                                width = "100px"
                                                onClick={() => { if (window.confirm('Are you sure you want to leave the game?')) this.props.history.push('/menu') }} > Leave
                                            </LogOutButton>
                                        </div>
                                    </ButtonContainer>
                                    :
                                    <ButtonContainer>
                                        {this.props.masterState.amIAdmin ?
                                            <Label>
                                                Game will start shortly...
                                            </Label>
                                            :
                                            <Label>
                                                Wait for Admin...
                                            </Label>

                                        }
                                        <Space/>
                                        <Spinner/>

                                        <LogOutButton
                                            width = "50%"
                                            onClick={() => { if (window.confirm('Are you sure you want to leave the game?')) this.props.history.push('/menu') }} > Leave
                                        </LogOutButton>
                                    </ButtonContainer>
                                }

                            </Grid>
                    }


                </Grid>
            </FormContainer>
        )
    }
}

