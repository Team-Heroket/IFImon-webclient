import React from "react";
import {ButtonContainer, PlayerContainer, Row} from "../../../../../helpers/layout";
import {Player, PlayerGame, PlayerMe, PlayerMeGame} from "../../../../../views/Player";
import styled from "styled-components";
import {LogOutButton, RoundContainer} from "../../../../../views/design/Button";
import {BackIcon} from "../../../../../views/design/Icons";
import {FocusedPokemonCard, PlaceholderCard, PokemonCard} from "../../../../../views/design/PokemonCard";
import Grid from "@material-ui/core/Grid";


export let Spectator = ({masterState, history}) => {


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
                <LogOutButton
                    width = "50%"
                    disabled={masterState.amITurnPlayer}
                    onClick={() => { if (window.confirm('Are you sure you want to leave the game?')) history.push('/menu') }} > Leave
                </LogOutButton>

            </ButtonContainer>
        );
    }

    function pokemonCardsUsers() {
        let firstCards = [];
        for (let i=0; i<masterState.players.length; i++) {
            if (!masterState.players[i].deck.empty) {
                firstCards.push(FocusedPokemonCard(masterState.players[i].deck.cards[0], true,  masterState.chosenCategory, masterState.players[i].user.username, masterState.winners[0].user.username == masterState.players[i].user.username ? true : false));
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
