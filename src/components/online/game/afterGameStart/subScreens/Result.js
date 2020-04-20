/**
    This component is displayed from 30 to 35 seconds

    I get the end result of that round (who won, etc.)

    After the 35 second mark a 5 second clock is displayed (in the Game component)
 */

import React from "react";
import {ButtonContainer, PlayerContainer, Row} from "../../../../../helpers/layout";
import {Player, PlayerGame, PlayerMe, PlayerMeGame} from "../../../../../views/Player";
import styled from "styled-components";
import {LogOutButton, RoundContainer} from "../../../../../views/design/Button";
import {BackIcon} from "../../../../../views/design/Icons";
import {PlaceholderCard, PokemonCard} from "../../../../../views/design/PokemonCard";
import Grid from "@material-ui/core/Grid";

const Column = styled.div`
    position: absolute
    left: auto
    }
`

export let Result = ({masterState}) => {


    function showLeaderboard() {
        return (
            <ButtonContainer>
                <h1> Result </h1>
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

    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
        >
            {showLeaderboard()}

            {PokemonCard(masterState.deck.cards[0], masterState.amITurnPlayer)}

            {PokemonCard((masterState.winners[0]).deck.cards[0], false)}


        </Grid>

    );
};