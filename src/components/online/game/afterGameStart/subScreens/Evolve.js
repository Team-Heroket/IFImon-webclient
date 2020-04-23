/**
    This component is displayed from 15 to 30 seconds

    I can click on evolve. If I do so a put request is sent to the server. I save it to the local storage
    If by the end of this I haven't clicked on evolve, the Game component sends a put request with evolveBerries = 0

    Next screen displayed is "Result"
 */


import React from "react";
import {api, handleError} from "../../../../../helpers/api";
import {ButtonContainer, PlayerContainer, Row,} from "../../../../../helpers/layout";
import {Player, PlayerGame, PlayerMe, PlayerMeGame} from "../../../../../views/Player";
import styled from "styled-components";
import {LogOutButton, RoundContainer, Button, AvatarButton} from "../../../../../views/design/Button";
import {BackIcon} from "../../../../../views/design/Icons";
import {PlaceholderCard, PokemonCard} from "../../../../../views/design/PokemonCard";
import Grid from "@material-ui/core/Grid";


const Column = styled.div`
    position: absolute
    left: auto
    }
`


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
        return (
            <ButtonContainer>
                <h1> Evolve </h1>
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
                <LogOutButton
                    width = "50%"
                    disabled={masterState.amITurnPlayer}
                    onClick={() => {
                        history.push('/menu');
                    }}
                >
                    Give Up
                </LogOutButton>
                <h1>{masterState.berries} berries</h1>
            </ButtonContainer>
        );
    }

    function evolveButtons() {
        let evolutions = [];
        localStorage.setItem('evolveTo', 0)
        for (let i=0; i< masterState.deck.cards[0].evolutionNames.length; i++) {
            evolutions.push(

                <Button
                    id = {i}
                    onClick={() => localStorage.setItem("evolveTo", i+1)}
                >
                    {masterState.deck.cards[0].evolutionNames[i]} Cost: {i+1}
                </Button>
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

                {PokemonCard(masterState.deck.cards[0], masterState.amITurnPlayer)}

                <ButtonContainer>
                    Do you want to evolve?
                    <br/>
                    {evolveButtons()}
                </ButtonContainer>

                {PlaceholderCard()}

            </Grid>
        </div>

    );
};