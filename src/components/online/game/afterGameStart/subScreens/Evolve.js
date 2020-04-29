/**
    This component is displayed from 15 to 30 seconds

    I can click on evolve. If I do so a put request is sent to the server. I save it to the local storage
    If by the end of this I haven't clicked on evolve, the Game component sends a put request with evolveBerries = 0

    Next screen displayed is "Result"
 */


import React from "react";
import {api, handleError} from "../../../../../helpers/api";
import {ButtonContainer, PlayerContainer} from "../../../../../helpers/layout";
import {PlayerGame} from "../../../../../views/Player";
import styled from "styled-components";
import {LogOutButton, EvolveButton} from "../../../../../views/design/Button";
import {BerriesIconWithBadge} from "../../../../../views/design/Icons";
import {FocusedPokemonCard} from "../../../../../views/design/PokemonCard";
import Grid from "@material-ui/core/Grid";
import {ColorlibConnector, ColorlibStepIcon} from "../../../../../views/design/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Badge from "@material-ui/core/Badge";



export let Evolve = ({masterState, history}) => {

    //This function is evoked after 5 seconds (masterState.startTime+20000 - new Date().getTime()) FOR EVERYONE
    async function evolvePokemon() {
        try {
            const requestBody = JSON.stringify({
                amount: masterState.evolveBerries,
                id: masterState.player_me.user.id
            });
            const response = await api.put('/games/'+masterState.pokeCode+'/berries',requestBody , { headers: {'Token': localStorage.getItem('token')}});
            let currentBerries = masterState.berries;
            masterState.berries = currentBerries-masterState.evolveBerries


        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }


    function showLeaderboard() {
        let steps = ['Category selection', 'Evolve Pokémon', 'Results'];

        if(masterState.amITurnPlayer){
            steps[0] = 'Select category';
        }
        let amountOfBerries = masterState.berries;
        return (<ButtonContainer>
                {masterState.players.map(player => {
                    return (
                        <PlayerContainer>
                            {player.user.id == localStorage.getItem('id') ?
                                (<PlayerGame player={player} addOn = "(Me)"/>) :
                                (<PlayerGame player={player} addOn = ""/>)
                            }
                        </PlayerContainer>

                    );
                })}
                <Stepper alternativeLabel activeStep={1} connector={<ColorlibConnector />} style={{ backgroundColor: "transparent" }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {BerriesIconWithBadge(masterState.berries)}


                <LogOutButton
                    width = "50%"
                    disabled={masterState.amITurnPlayer}
                    onClick={() => { if (window.confirm('Are you sure you want to leave the game?')) history.push('/menu') }} > Give Up
                </LogOutButton>
            </ButtonContainer>
        );
    }

    function evolveButtons() {
        let evolutions = [];
        localStorage.setItem('evolveTo', 0)
        for (let i=0; i< masterState.deck.cards[0].evolutionNames.length; i++) {
            let disableButton = (masterState.berries<i+1);
            console.log(masterState.berries+" and i "+i);
            evolutions.push(
                <EvolveButton
                    id = {i}
                    onClick={() => {localStorage.setItem("evolveTo", i+1)}}
                    disabled={disableButton}
                >
                    {masterState.deck.cards[0].evolutionNames[i]} Cost: {i+1}
                </EvolveButton>
            )
        }

        return evolutions;
    }



    return (
        <div>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                {showLeaderboard()}

                {FocusedPokemonCard(masterState.deck.cards[0], true, masterState.chosenCategory, 'Your Card', false)}


                { masterState.deck.cards[0].evolutionNames.length == 0 ?

                    <ButtonContainer>
                        {masterState.deck.cards[0].name} has no evolutions!
                    </ButtonContainer>
                    :
                    <ButtonContainer>
                        Do you want to evolve?
                        <br/>
                        {evolveButtons()}
                        <LogOutButton disabled={masterState.berries<1}
                            onClick={() => {
                            localStorage.setItem("evolveTo", 0)}}
                        >
                            undo
                        </LogOutButton>
                    </ButtonContainer>
                }


                <Badge color={'primary'} badgeContent={'Current winner'}>
                 {FocusedPokemonCard((masterState.winners[0]).deck.cards[0], true, masterState.chosenCategory, masterState.winners[0].user.username, false)}
                </Badge>
            </Grid>
        </div>

    );
};