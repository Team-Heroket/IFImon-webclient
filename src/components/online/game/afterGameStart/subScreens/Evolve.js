/**
    This component is displayed from 15 to 30 seconds

    I can click on evolve. If I do so a put request is sent to the server. I save it to the local storage

    Next screen displayed is "Result"
 */


import React from "react";
import {ButtonContainer, PlayerContainer, SimpleColumnContainer} from "../../../../../helpers/layout";
import {PlayerGame} from "../../../../../views/Player";
import {LogOutButton, EvolveButton, ActiveEvolveButton} from "../../../../../views/design/Button";
import {AmountOfBerries, BerriesIconWithBadge, PossibleWinnerIcon} from "../../../../../views/design/Icons";
import {FocusedPokemonCard} from "../../../../../views/design/PokemonCard";
import Grid from "@material-ui/core/Grid";
import {ColorlibConnector, ColorlibStepIcon} from "../../../../../views/design/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import {FlippedCardEvolve} from "./FlippedCardEvolve";
import {FlippedCard} from "./FlippedCard";
import {api, handleError} from "../../../../../helpers/api";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


export class Evolve extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            evolved: false
        }
    }

    /**
     * Returns the left-hand side of the screen with all the players, the stepper and the berries
     */
    showLeaderboard() {
        let steps = ['Category selection', 'Evolve Pokémon', 'Results'];

        if(this.props.masterState.amITurnPlayer){
            steps[0] = 'Select category';
        }
        return (<SimpleColumnContainer width={'280px'} sideMargin={'0px'} style={{marginLeft: '10px'}}>
                {this.props.masterState.players.map(player => {
                    return (
                        <PlayerContainer>
                            {player.user.id == localStorage.getItem('id') ?
                                (<PlayerGame player={player} addOn = "(Me)"/>) :
                                (<PlayerGame player={player} addOn = ""/>)
                            }
                        </PlayerContainer>

                    );
                })}

                <Stepper alternativeLabel activeStep={1} connector={<ColorlibConnector />} style={{ backgroundColor: "transparent" }} style={{padding: '0px', margin: '0px', marginTop: '25px', marginBottom: '25px', background: 'transparent', width: '280px'}}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {BerriesIconWithBadge(this.props.masterState.berries)}
                <LogOutButton
                    width = "50%"
                    disabled={this.props.masterState.amITurnPlayer}
                    onClick={() => { if (window.confirm('Are you sure you want to leave the game?')) this.props.history.push('/menu') }} > Give Up
                </LogOutButton>

            </SimpleColumnContainer>
        );
    }
    async handleClick(event) {
        console.log("Make evolve put request")
        try {
            this.setState({'evolved':true})
            const requestBody = JSON.stringify({
                amount: event.currentTarget.id+1,
                id: this.props.masterState.player_me.user.id
            });

            await api.put('/games/' + this.state.pokeCode + '/berries', requestBody, {headers: {'Token': localStorage.getItem('token')}});

        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }
    /**
     * Returns the evolve buttons. If there are no possible evolutions it displays a corresponding text
     */
    evolveButtons() {
        let evolutions = [];
        for (let i=0; i< this.props.masterState.deck.cards[0].evolutionNames.length; i++) {
            let disableButton = (this.props.masterState.berries<i+1);
            evolutions.push(
                !this.state.evolved ?
                    <EvolveButton
                        id = {i}
                        onClick={() => {
                            try {
                                this.setState({'evolved':true})
                                const requestBody = JSON.stringify({
                                    amount: i+1,
                                    id: this.props.masterState.player_me.user.id
                                });

                                api.put('/games/' + this.props.masterState.pokeCode + '/berries', requestBody, {headers: {'Token': localStorage.getItem('token')}});

                            } catch (error) {
                                alert(`Something went wrong: \n${handleError(error)}`);
                            }
                            localStorage.setItem("evolveTo", i+1)
                            setTimeout(this.props.parentMethod(), 5000)}}
                        disabled={disableButton}
                    >
                        {this.props.masterState.deck.cards[0].evolutionNames[i]} Cost: {i+1}
                    </EvolveButton> : null


                /*
                 localStorage.getItem('evolveTo')==i+1 ?
                    <ActiveEvolveButton
                        id = {i}
                        onClick={() => {localStorage.setItem("evolveTo", 0);
                            setTimeout(parentMethod(), 5000)}}
                        disabled={disableButton}
                    >
                        {masterState.deck.cards[0].evolutionNames[i]} Cost: {i+1}
                    </ActiveEvolveButton>
                    :
                <EvolveButton
                    id = {i}
                    onClick={() => {localStorage.setItem("evolveTo", i+1);
                        setTimeout(parentMethod(), 5000)}}
                    disabled={disableButton}
                >
                    {masterState.deck.cards[0].evolutionNames[i]} Cost: {i+1}
                </EvolveButton>

                 */
            )
        }

        return evolutions;
    }

    /**
     * If we are the winner, it is set to the text 'Your Card'. Otherwise it is set to the username of the winner
     */

    render() {
        let winnersUsername = this.props.masterState.winners[0].user.username == this.props.masterState.player_me.user.username ? 'Your Card' : this.props.masterState.winners[0].user.username;
        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    style={{marginTop: '50px'}}
                >
                    {this.showLeaderboard()}
                    {this.props.masterState.turnPlayer.user.npc ?
                        <FlippedCard front={FocusedPokemonCard(this.props.masterState.deck.cards[0], true, this.props.masterState.chosenCategory, 'Your Card', null, false, true)}/>
                        : FocusedPokemonCard(this.props.masterState.deck.cards[0], true, this.props.masterState.chosenCategory, 'Your Card', null, false, true)}

                    {
                        this.props.masterState.deck.cards[0].evolutionNames.length == 0 ?
                            <ButtonContainer>
                                {this.props.masterState.deck.cards[0].name} has no evolutions!
                            </ButtonContainer>
                            :
                            <ButtonContainer>
                                {this.state.evolved ? <div><ButtonContainer><CheckCircleIcon/></ButtonContainer>
                                    <ButtonContainer>Evolution submitted!</ButtonContainer></div> : <ButtonContainer>
                                    Do you want to evolve?
                                </ButtonContainer>}
                                <br/>
                                {this.evolveButtons()}
                            </ButtonContainer>

                    }


                    <FlippedCardEvolve front = {<SimpleColumnContainer align='left'>
                        <AmountOfBerries width={'50px'} style={{ marginBottom: '-45px', marginLeft: '-5px',paddingLeft: '10px', background: 'radial-gradient(174.31% 329.79% at -6.61% -61.9%, #00D1FF 0%, rgba(255, 255, 255, 0) 100%), #5259FF', zIndex: '100'}} > <PossibleWinnerIcon/> </AmountOfBerries>
                        {FocusedPokemonCard((this.props.masterState.winners[0]).deck.cards[0], true, this.props.masterState.chosenCategory, winnersUsername, null ,false, true)}
                    </SimpleColumnContainer>}/>

                </Grid>
            </div>

        );
    }

};