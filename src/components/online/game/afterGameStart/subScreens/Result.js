/**
 This component is displayed from 30 to 35 seconds

 I get the end result of that round (who won, etc.)

 After the 35 second mark a 5 second clock is displayed (in the Game component)
 */

import React from "react";
import {ButtonContainer, PlayerContainer, SimpleColumnContainer} from "../../../../../helpers/layout";
import {PlayerGame, PlayersCard} from "../../../../../views/Player";
import {LogOutButton} from "../../../../../views/design/Button";
import {BerriesIconWithBadge} from "../../../../../views/design/Icons";
import {FocusedPokemonCard} from "../../../../../views/design/PokemonCard";
import Grid from "@material-ui/core/Grid";
import {ColorlibConnector, ColorlibStepIcon} from "../../../../../views/design/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Badge from "@material-ui/core/Badge";
import {FlippedCardResult} from "./FlippedCardResult";
import {FlippedCardResultOur} from "./FlippedCardResultOur";



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

                <Stepper alternativeLabel activeStep={2} connector={<ColorlibConnector />} style={{ backgroundColor: "transparent" }} style={{padding: '0px', margin: '0px', marginTop: '25px', marginBottom: '25px', background: 'transparent', width: '280px'}}>
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

    let winnersUsername = masterState.winners[0].user.username == masterState.player_me.user.username ? 'Your Card' : masterState.winners[0].user.username;

    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            style={{marginTop: '50px'}}
        >
            {showLeaderboard()}
            <FlippedCardResultOur front = {
                FocusedPokemonCard(masterState.deck.cards[0], true, masterState.chosenCategory, 'Your Card', null ,false, true)
            }/>
            {showCards()}
            <FlippedCardResult front = {
                <div>
                    <Badge color={masterState.winners.length >1 ?'primary': 'secondary'} badgeContent={masterState.winners.length >1 ?'Draw': 'Winner'}>
                        {FocusedPokemonCard((masterState.winners[0]).deck.cards[0], true, masterState.chosenCategory, winnersUsername, null ,true, localStorage.getItem('playedSound')=='true' ? true : masterState.mute , localStorage.getItem('SFXVol')/100) }
                    </Badge>
                </div>
            }/>


        </Grid>

    );
};