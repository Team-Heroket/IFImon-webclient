/**
    This component is displayed from 0 to 15 seconds

    If TurnPlayer is me, I get to be able to choose a category and call the put request
    If TurnPlayer is not me, I just get to see my card and not hte others.

    Next screen displayed is "Evolve"
 */


import React from "react";
import {
    PlayerContainer, SimpleColumnContainer
} from "../../../../../helpers/layout";
import {PlayerGame} from "../../../../../views/Player";
import {LogOutButton} from "../../../../../views/design/Button";
import {FocusedPokemonCard, PlaceholderCard} from "../../../../../views/design/PokemonCard";

import Grid from '@material-ui/core/Grid';

import {ColorlibConnector, ColorlibStepIcon} from "../../../../../views/design/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import {BerriesIconWithBadge} from "../../../../../views/design/Icons";
import {FlippedCard} from "./FlippedCard";

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


export let ChooseCategory = ({masterState, history, parentMethod}) => {

    function showLeaderboard() {
        let steps = ['Category selection', 'Evolve Pokémon', 'Results'];

        if(masterState.amITurnPlayer){
            steps[0] = 'Select category';
        }else{
            steps[0] = masterState.turnPlayer.user.username + ' is choosing';
        }
        return (<SimpleColumnContainer width={'280px'} sideMargin={'0px'} style={{marginLeft: '10px'}}>
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

                <Stepper alternativeLabel activeStep={0} connector={<ColorlibConnector />} style={{ backgroundColor: "transparent" }} style={{padding: '0px', margin: '0px', marginTop: '25px', marginBottom: '25px', background: 'transparent', width: '280px'}}>
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

            </SimpleColumnContainer>
        );
    }

    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            style={{marginTop: '50px'}}
        >
                {showLeaderboard()}
                {localStorage.getItem('SelectedCat')==0 ?
                    <FlippedCard front = {FocusedPokemonCard(masterState.deck.cards[0], !masterState.amITurnPlayer, '0', 'Your Card', parentMethod, false, true)}/>
                :
                    <FlippedCard front = {FocusedPokemonCard(masterState.deck.cards[0], !masterState.amITurnPlayer, localStorage.getItem('SelectedCat'), 'Your Card', parentMethod, false, true)}/>
                }
                {PlaceholderCard()}

            </Grid>
    );
};