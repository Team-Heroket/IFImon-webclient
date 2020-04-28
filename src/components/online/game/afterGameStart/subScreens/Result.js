/**
 This component is displayed from 30 to 35 seconds

 I get the end result of that round (who won, etc.)

 After the 35 second mark a 5 second clock is displayed (in the Game component)
 */

import React from "react";
import {ButtonContainer, GameContainer, PlayerContainer, Row} from "../../../../../helpers/layout";
import {Player, PlayerGame, PlayerMe, PlayerMeGame, PlayersCard} from "../../../../../views/Player";
import styled from "styled-components";
import {LogOutButton, RoundContainer} from "../../../../../views/design/Button";
import {BackIcon, BerriesIcon, BerriesIconWithBadge} from "../../../../../views/design/Icons";
import {FocusedPokemonCard, PlaceholderCard, PokemonCard} from "../../../../../views/design/PokemonCard";
import Grid from "@material-ui/core/Grid";
import {Clock} from "../Clock";
import {ColorlibConnector, ColorlibStepIcon} from "../../../../../views/design/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Badge from "@material-ui/core/Badge";

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


export let Result = ({masterState, history}) => {


    function showCards() {
        return(<ButtonContainer>
            {
                masterState.players.map(player => {
                    if(masterState.winners.length>1){
                        let printed = false;
                        for (let c = 0; c < masterState.winners.length; c++) {
                            if (masterState.winners[c].user.username == player.user.username) {
                                printed = true;
                                return (
                                    <Badge color={"primary"} badgeContent={"Draw"}>
                                        <PlayerContainer>
                                            <PlayersCard player={player} addOn = {masterState.chosenCategory}/>
                                        </PlayerContainer>
                                    </Badge>
                                )
                            }
                        }
                        if(!printed){
                            return (
                                <PlayerContainer>
                                    <PlayersCard player={player} addOn = {masterState.chosenCategory}/>
                                </PlayerContainer>
                            );
                        }
                    }else{
                    if(masterState.winners[0].user.id === player.user.id){
                        return (
                            <Badge color={"secondary"} badgeContent={"Winner"}>
                            <PlayerContainer>
                                <PlayersCard player={player} addOn = {masterState.chosenCategory}/>
                            </PlayerContainer>
                            </Badge>
                        )
                    }
                    else{
                        return(
                                <PlayerContainer>
                                    <PlayersCard player={player} addOn = {masterState.chosenCategory}/>
                                </PlayerContainer>
                        )
                    }}


                })
            }
        </ButtonContainer>);
    }

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

                <Stepper alternativeLabel activeStep={2} connector={<ColorlibConnector />} style={{ backgroundColor: "transparent" }}>
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

    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
        >
            {showLeaderboard()}
            <div>
                {FocusedPokemonCard(masterState.deck.cards[0], true, masterState.chosenCategory, 'Your Card', false)}
            </div>
            <div>
                {showCards()}
            </div>
            <div>
                <Badge color={masterState.winners.length >1 ?'primary': 'secondary'} badgeContent={masterState.winners.length >1 ?'Draw': 'Winner'}>
                    {FocusedPokemonCard((masterState.winners[0]).deck.cards[0], true, masterState.chosenCategory, masterState.winners[0].user.username, true) }
                </Badge>

            </div>

        </Grid>

    );
};