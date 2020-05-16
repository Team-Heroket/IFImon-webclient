import React from "react";
import styled from "styled-components";
import {
    ButtonContainer,
    FormContainer
} from "../../../../../helpers/layout";
import {EvolveButton, LogOutButton} from "../../../../../views/design/Button";
import Confetti from "../../../../shared/Confetti";
import Grid from "@material-ui/core/Grid";
import {Clock} from "../Clock";
import {api, handleError} from "../../../../../helpers/api";
import {Spinner} from "../../../../../views/design/Spinner";
import {RandomPokemonFact} from "../../../mainmenu/RandomPokemonFact";


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
            timerOver: false
        };
    }

    componentDidMount() {
        this.timeout_leave = setTimeout(() => {
            this.setState({timerOver: true})
        }, 15000)
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
                        <div>
                            <Grid
                                container
                                direction="row"
                                justify="space-evenly"
                                alignItems="center">
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
                        </div>
                    }


                </Grid>
            </FormContainer>
        )
    }
}

