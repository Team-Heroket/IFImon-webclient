/*
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
    PlayerContainer,
    SimpleContainer
} from "../../../../../helpers/layout";
import {Player, PlayerGame, PlayerMe, PlayerMeGame} from "../../../../../views/Player";
import styled from "styled-components";
import {LogOutButton, RoundContainer} from "../../../../../views/design/Button";
import {PokemonCard} from "../../../../../views/design/PokemonCard";

import Grid from '@material-ui/core/Grid';

let category;
category = {
    HEIGHT: "HEIGHT",
    WEIGHT: "WEIGHT",
    CAPTURERATE: "CAPTURERATE",
    ATTACKPOINTS: "ATTACKPOINTS",
    DEFENSEPOINTS: "DEFENSEPOINTS"
}


export let ChooseCategory = ({masterState}) => {

    function showLeaderboard() {
        return (<ButtonContainer>
                <h1> Select Category </h1>
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
                    <LogOutButton width = "50%">
                        Give Up
                    </LogOutButton>
                <h1>{masterState.berries} berries</h1>
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

                {PokemonCard(masterState.deck.cards[0], !masterState.amITurnPlayer)}

                {PokemonCard(masterState.deck.cards[1], masterState.amITurnPlayer)}

            </Grid>
    );
};