import React from "react";
import {ButtonContainer, PlayerContainer, Row} from "../../../../../helpers/layout";
import {Player, PlayerGame, PlayerMe, PlayerMeGame} from "../../../../../views/Player";
import styled from "styled-components";
import {LogOutButton, RoundContainer} from "../../../../../views/design/Button";
import {BackIcon} from "../../../../../views/design/Icons";
import {PlaceholderCard, PokemonCard} from "../../../../../views/design/PokemonCard";
import Grid from "@material-ui/core/Grid";


export let Spectator = ({masterState}) => {


    function showLeaderboard() {
        return (
            <ButtonContainer>
                <h1> Spectating - You Lost! </h1>
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

            </ButtonContainer>
        );
    }

    function pokemonCardsUsers() {
        let firstCards = [];
        for (let i=0; i<masterState.players.length; i++) {
            if (!masterState.players[i].deck.empty) {
                firstCards.push(PokemonCard(masterState.players[i].deck.cards[0], false));
            }
        }
        return firstCards;
    }

    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
        >
            {showLeaderboard()}

            {pokemonCardsUsers()}


        </Grid>

    );
};
