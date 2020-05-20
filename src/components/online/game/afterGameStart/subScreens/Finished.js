import React from "react";
import styled from "styled-components";
import {
    ButtonContainer,
    FormContainer, PlayerContainer, SimpleColumnContainer, SimpleRowContainer
} from "../../../../../helpers/layout";
import {AvatarButton, EvolveButton, LogOutButton} from "../../../../../views/design/Button";
import Confetti from "../../../../shared/Confetti";
import Grid from "@material-ui/core/Grid";
import {Clock} from "../Clock";
import {api, handleError} from "../../../../../helpers/api";
import {Spinner} from "../../../../../views/design/Spinner";
import {RandomPokemonFact} from "../../../mainmenu/RandomPokemonFact";
import {EmoteContainer, PlayerEmote} from "../../../../../views/Player";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import TelegramIcon from '@material-ui/icons/Telegram';
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


export class Finished extends React.Component {
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
        }, 30000)
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
            localStorage.setItem('SelectedCat', 0)
        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }

    async sendEmote(emote){
        try {

            await api.put('/games/' + this.props.masterState.pokeCode.toString()+'/emotes', JSON.stringify({
                emote: emote}), {headers: {'Token': localStorage.getItem('token')}});

        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }

    actions = [
        { icon:
                <img src={require('../../../../shared/images/emotes/1.svg')} style={{width: '40px', height: '40px', margin: '0px', padding: '0px'}}/>, name: 1 },
        { icon:
                <img src={require('../../../../shared/images/emotes/2.svg')} style={{width: '40px', height: '40px', margin: '0px', padding: '0px'}}/>,
             name: 2 },
        { icon:
                <img src={require('../../../../shared/images/emotes/3.svg')} style={{width: '40px', height: '40px', margin: '0px', padding: '0px'}}/>,
             name: 3 },
        { icon:
                <img src={require('../../../../shared/images/emotes/4.svg')} style={{width: '40px', height: '40px', margin: '0px', padding: '0px'}}/>
            , name: 4 },
        { icon:
                <img src={require('../../../../shared/images/emotes/5.svg')} style={{width: '40px', height: '40px', margin: '0px', padding: '0px'}}/>
           , name: 5 }
    ]


    render() {
        {console.log("rematchClicked is: "+this.state.rematchClicked)}
        return (
            <FormContainer margin={'5em'}>
                {this.props.masterState.winners.length != 0 && this.props.masterState.winners[0].id == this.props.masterState.player_me.id && !this.state.rematchClicked ?
                    <Confetti/> : null}
                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center">

                    {this.rematchClicked || this.props.masterState.winners.length == 0 ?
                        <SimpleColumnContainer width={'750px'}>
                            <Label style={{width: '100%', marginBottom: '25px'}}>
                                Game will start shortly
                            </Label>
                            <br/>

                            <br/>
                            <Spinner/>

                        <br/>
                            <RandomPokemonFact style={{marginTop: '50px'}}/>
                        </SimpleColumnContainer>
                        :
                            <Grid
                                container
                                direction="row"
                                justify="space-around"
                                alignItems="center"
                            >{ this.props.masterState.winners.length !=0 ?
                                <div>
                                    <ButtonContainer>
                                        {this.props.masterState.winners[0].user.avatarId.valueOf() < 10 ?
                                            <img alt="avatar"
                                                 src={require('../../../../../components/shared/images/avatarSVG/00' + (this.props.masterState.winners[0].user.avatarId) + '-avatar.svg')}
                                                 height={"150px"} width={"150px"}/>
                                            : <img alt="avatar"
                                                   src={require('../../../../../components/shared/images/avatarSVG/0' + (this.props.masterState.winners[0].user.avatarId) + '-avatar.svg')}
                                                   height={"150px"} width={"150px"}/>}
                                    </ButtonContainer>
                                    <Space/>
                                    <Label>
                                        {this.winnerText()}
                                    </Label>
                                </div> : null}

                                <SimpleRowContainer>
                                            {this.showLeaderboard()}
                                            <SpeedDial
                                            ariaLabel="SpeedDial tooltip example"
                                            hidden={false}
                                            icon={<SpeedDialIcon openIcon={<TelegramIcon/>}/>}
                                            onClose={() => {
                                            this.setState({open: false})
                                        }}
                                            onOpen={() => {
                                            this.setState({open: true})
                                        }}
                                            open={this.state.open}
                                            style={{right: '0px'}}
                                            >
                                            {this.actions.map((action) => (
                                                <SpeedDialAction
                                                    key={action.name}
                                                    icon={action.icon}
                                                    tooltipTitle={'send'}
                                                    onClick={() => {
                                                        this.setState({open: false});
                                                        this.sendEmote(action.name)
                                                    }}
                                                />
                                            ))}}
                                        </SpeedDial>

                                </SimpleRowContainer>

                                {this.props.masterState.amIAdmin && !this.state.rematchClicked?
                                    <ButtonContainer>
                                        <Clock remainingTime={30000} totalTime={30000} type={this.clock.REMATCH} />
                                        <Space/>
                                        <div>
                                            <EvolveButton
                                                width = "150px"
                                                disabled = {this.state.rematchClicked}
                                                onClick={() => {this.rematch()}} > Rematch
                                            </EvolveButton>

                                        </div>
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
