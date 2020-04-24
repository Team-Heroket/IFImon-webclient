/**
    This component is displayed from 0 to 15 seconds

    If TurnPlayer is me, I get to be able to choose a category and call the put request
    If TurnPlayer is not me, I just get to see my card and not hte others.

    Next screen displayed is "Evolve"
 */


import React from "react";
import {api, handleError} from "../../../../../helpers/api";
import {
    ButtonContainer,
    DESKTOP_WIDTH,
    GameContainer,
    PlayerContainer, Row,
    SimpleContainer
} from "../../../../../helpers/layout";
import {Player, PlayerGame, PlayerMe, PlayerMeGame} from "../../../../../views/Player";
import styled from "styled-components";
import {LogOutButton, RoundContainer} from "../../../../../views/design/Button";
import {PlaceholderCard, PokemonCard} from "../../../../../views/design/PokemonCard";
import { Redirect } from 'react-router-dom'

import Grid from '@material-ui/core/Grid';
import {Spinner} from "../../../../../views/design/Spinner";
import {Clock} from "../Clock";
import {ColorlibConnector, ColorlibStepIcon} from "../../../../../views/design/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import {BerriesIcon, BerriesIconWithBadge} from "../../../../../views/design/Icons";

let category;
category = {
    HP: "HP",
    WEIGHT: "WEIGHT",
    CAPTURERATE: "CAPTURE_RATING",
    ATTACKPOINTS: "ATK",
    DEFENSEPOINTS: "DEF",
    SPEED: "SPEED"
}
let clock;
clock = {
    GAMESTART: "gamestart",
    NEWROUND: "newround",
    PERIOD: "period"
}

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

export let ChooseCategory = ({masterState, history}) => {


    function showLeaderboard() {

        let steps = ['Category selection', 'Evolve Pokémon', 'Results'];

        if(masterState.amITurnPlayer){
            steps[0] = 'Select category';
        }
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
                <Stepper alternativeLabel activeStep={0} connector={<ColorlibConnector />} style={{ backgroundColor: "transparent" }}>
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
                >
                        Give Up
                    </LogOutButton>
            </ButtonContainer>
        );
    }

    function goBack() {

    }



    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
        >
                {showLeaderboard()}
                {PokemonCard(masterState.deck.cards[0], !masterState.amITurnPlayer, 'Your Card')}
                {PlaceholderCard()}

            </Grid>
    );
};