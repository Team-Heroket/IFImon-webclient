/**
    This component is displayed from 15 to 30 seconds

    I can click on evolve. If I do so a put request is sent to the server. I save it to the local storage
    If by the end of this I haven't clicked on evolve, the Game component sends a put request with evolveBerries = 0

    Next screen displayed is "Result"
 */


import React from "react";
import {api, handleError} from "../../../../../helpers/api";
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



export let Evolve = ({masterState, history, parentMethod}) => {

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

                <Stepper alternativeLabel activeStep={1} connector={<ColorlibConnector />} style={{ backgroundColor: "transparent" }} style={{padding: '0px', margin: '0px', marginTop: '25px', marginBottom: '25px', background: 'transparent', width: '280px'}}>
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

    function evolveButtons() {
        let evolutions = [];
        for (let i=0; i< masterState.deck.cards[0].evolutionNames.length; i++) {
            let disableButton = (masterState.berries<i+1);
            evolutions.push(
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
                style={{marginTop: '50px'}}
            >
                {showLeaderboard()}

                {FocusedPokemonCard(masterState.deck.cards[0], true, masterState.chosenCategory, 'Your Card', null, false, true)}

                {
                    masterState.deck.cards[0].evolutionNames.length == 0 ?
                        <ButtonContainer>
                            {masterState.deck.cards[0].name} has no evolutions!
                        </ButtonContainer>
                        :
                        <ButtonContainer>
                            Do you want to evolve?
                            <br/>
                            {evolveButtons()}
                        </ButtonContainer>

                }


                <FlippedCardEvolve front = {<SimpleColumnContainer align='left'>
                    <AmountOfBerries width={'50px'} style={{ marginBottom: '-45px', marginLeft: '-5px',paddingLeft: '10px', background: 'radial-gradient(174.31% 329.79% at -6.61% -61.9%, #00D1FF 0%, rgba(255, 255, 255, 0) 100%), #5259FF', zIndex: '100'}} > <PossibleWinnerIcon/> </AmountOfBerries>
                    {FocusedPokemonCard((masterState.winners[0]).deck.cards[0], true, masterState.chosenCategory, masterState.winners[0].user.username, null ,false, true)}
                </SimpleColumnContainer>}/>

            </Grid>
        </div>

    );
};