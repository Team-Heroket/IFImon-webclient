import React from "react";
import {ButtonContainer, PlayerContainer} from "../../../../../helpers/layout";
import {PlayerGame} from "../../../../../views/Player";
import styled from "styled-components";
import {LogOutButton} from "../../../../../views/design/Button";
import {FocusedPokemonCard} from "../../../../../views/design/PokemonCard";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";


const Label = styled.label`
  position: relative;
  width: 400px;
 
  color: white;
  
  margin-bottom: 50px;
  font-size: 30px;
  font-weight: 300;
  text-align: center;
`;

export let Spectator = ({masterState, history}) => {


    function showLeaderboard() {
        return (
            <ButtonContainer>
                <Label>  YOU LOST! <br/> You are now spectating </Label>
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
            for (let i=0; i < masterState.players.length; i++) {
                let printed = false;
                if(masterState.winners.length > 0) {
                    for (let c = 0; c < masterState.winners.length; c++) {
                        if (masterState.winners[c].user.username == masterState.players[i].user.username) {
                            firstCards.push(
                                <Badge color={"secondary"} badgeContent={"Winner"}>
                                    {FocusedPokemonCard(masterState.players[i].deck.cards[0], true, masterState.chosenCategory, masterState.players[i].user.username, false, true)}
                                </Badge>
                            );
                            printed = true;
                        }
                    }
                    if(!printed && !masterState.players[i].deck.empty){
                        firstCards.push(
                            FocusedPokemonCard(masterState.players[i].deck.cards[0], true, masterState.chosenCategory, masterState.players[i].user.username, false, true)
                        );
                    }
                } else if (!masterState.players[i].deck.empty){
                    firstCards.push(
                        FocusedPokemonCard(masterState.players[i].deck.cards[0], true, masterState.chosenCategory, masterState.players[i].user.username, false, true)
                    );
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
