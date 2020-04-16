/*
    This component is displayed from 15 to 25 seconds

    I can click on evolve. If I do so a put request is sent to the server. I save it to the local storage
    If by the end of this I haven't clicked on evolve, the Game component sends a put request with evolveBerries = 0

    Next screen displayed is "Result"
 */


import React from "react";
import {api, handleError} from "../../../../../helpers/api";
import {PlayerContainer, Row} from "../../../../../helpers/layout";
import {Player, PlayerGame, PlayerMe, PlayerMeGame} from "../../../../../views/Player";
import styled from "styled-components";
import {LogOutButton, RoundContainer} from "../../../../../views/design/Button";
import {BackIcon} from "../../../../../views/design/Icons";


const Column = styled.div`
    position: absolute
    left: auto
    }
`


export let Evolve = ({masterState}) => {

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
            <div>
                <Column>
                    {masterState.players.map(player => {
                        return (

                            <PlayerContainer>
                                {player.user.id == localStorage.getItem('id') ?
                                    (<PlayerMeGame player={player}  />) :
                                    (<PlayerGame player={player}  />)
                                }
                            </PlayerContainer>

                        );
                    })}
                    <LogOutButton width = "280px">
                        Give Up
                    </LogOutButton>
                </Column>
            </div>
        );
    }

    return (
        <div>
            <h1>Evolve</h1>
            {showLeaderboard()}
        </div>

    );
};