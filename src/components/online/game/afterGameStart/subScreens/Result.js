/*
    This component is displayed from 25 to 30 seconds

    I get the end result of that round (who won, etc.)

    Next screen displayed is "ChooseCategory"
 */

import React from "react";
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

export let Result = ({masterState}) => {


    function showLeaderboard() {
        return (
            <div>
                <Column>
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
                    <LogOutButton width = "280px">
                        Give Up
                    </LogOutButton>
                </Column>
            </div>
        );
    }

    return (
        <div>
            <h1>Result</h1>
            {showLeaderboard()}
        </div>

    );
};