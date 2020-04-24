/**
    This component is displayed from 15 to 30 seconds

    I can click on evolve. If I do so a put request is sent to the server. I save it to the local storage
    If by the end of this I haven't clicked on evolve, the Game component sends a put request with evolveBerries = 0

    Next screen displayed is "Result"
 */


import React from "react";
import {api, handleError} from "../../../../../helpers/api";
import {ButtonContainer, GameContainer, PlayerContainer, Row,} from "../../../../../helpers/layout";
import {Player, PlayerGame, PlayerMe, PlayerMeGame} from "../../../../../views/Player";
import styled from "styled-components";
import {LogOutButton, RoundContainer, Button, AvatarButton, EvolveButton} from "../../../../../views/design/Button";
import {BackIcon, BerriesIcon, BerriesIconWithBadge} from "../../../../../views/design/Icons";
import {FocusedPokemonCard, PlaceholderCard, PokemonCard} from "../../../../../views/design/PokemonCard";
import Grid from "@material-ui/core/Grid";
import {Clock} from "../Clock";
import {ColorlibConnector, ColorlibStepIcon} from "../../../../../views/design/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";


const Column = styled.div`
    position: absolute
    left: auto
    }
`
function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Select campaign settings...';
        case 1:
            return 'What is an ad group anyways?';
        case 2:
            return 'This is the bit I really care about!';
        default:
            return 'Unknown step';
    }
}

function getSteps() {
    return ['Select campaign settings', 'Create an ad group', 'Create an ad'];

}

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
                    onClick={() => {
                        history.push('/menu');
                    }}
                >Give Up
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

                {FocusedPokemonCard(masterState.deck.cards[0], true, masterState.chosenCategory, 'Your Card')}

                <ButtonContainer>
                    Do you want to evolve?
                    <br/>
                    {evolveButtons()}
                    <LogOutButton
                        onClick={() => {
                            localStorage.setItem("evolveTo", 0)
                        }}
                    >
                        undo
                    </LogOutButton>

                </ButtonContainer>

                {FocusedPokemonCard((masterState.winners[0]).deck.cards[0], true, masterState.chosenCategory, masterState.winners[0].user.username)}

            </Grid>
        </div>

    );
};