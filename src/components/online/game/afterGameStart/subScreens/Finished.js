import React from "react";
import styled from "styled-components";
import {FormContainer} from "../../../../../helpers/layout";
import {LogOutButton} from "../../../../../views/design/Button";
import Confetti from "../../../../shared/Confetti";
import Grid from "@material-ui/core/Grid";
import {Clock} from "../Clock";
import {api, handleError} from "../../../../../helpers/api";

/**
    This will be displayed when the whole Game is finished

 */



const Space = styled.div`
  margin-bottom: 80px
  width: 100%
`;

const Label = styled.label`
  position: relative;
  transform : translate(-50%, 0%);
  width: 400px;
 
  color: white;
  
  margin-bottom: 50px;
  text-transform: uppercase;
  font-size: 30px;
  font-weight: 300;
`;
let clock;
clock = {
    GAMESTART: "gamestart",
    REMATCH: "rematch",
    PERIOD: "period",
}



export let Finished = ({masterState, history}) => {

    let clickedOnRematch
    function winnerText() {
        let text = '';
        if (masterState.winners[0].id === masterState.player_me.id) {
            text = 'You won the Game!'
        }
        else {
            text = ''+masterState.winners[0].user.username+' has won the Game!'
        }
        return text;
    }

    async function rematch() {
        try {
            const requestBody = JSON.stringify({
                npc: 0
            });
            await api.put('/games/' + masterState.pokeCode.toString(), requestBody, {headers: {'Token': localStorage.getItem('token')}});

        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }





    return (
        <div>
            <Grid>
                <div>
                    {masterState.winners[0].user.avatarId.valueOf() < 10 ? <img alt="avatar" src={require('../../../../../components/shared/images/avatarSVG/00'+(masterState.winners[0].user.avatarId)+'-avatar.svg')} height={"150px"} width={"150px"}/>
                        : <img alt="avatar" src={require('../../../../../components/shared/images/avatarSVG/0'+(masterState.winners[0].user.avatarId)+'-avatar.svg')} height={"150px"} width={"150px"}/>}
                    <Space/>
                    <Label>
                        {winnerText()}
                    </Label>
                </div>
                {masterState.amIAdmin ?
                    <div>
                        <Clock remainingTime={10000} totalTime={10000} type={clock.REMATCH} />
                        <Space/>
                        <LogOutButton
                            width = "50%"
                            onClick={() => {rematch()}} > Rematch
                        </LogOutButton>
                        <LogOutButton
                            width = "50%"
                            onClick={() => { if (window.confirm('Are you sure you want to leave the game?')) history.push('/menu') }} > Leave
                        </LogOutButton>
                    </div>
                    :
                    <div>
                        <Clock remainingTime={15000} totalTime={15000} type={clock.REMATCH} />
                        <Space/>
                        <LogOutButton
                            width = "50%"
                            onClick={() => { if (window.confirm('Are you sure you want to leave the game?')) history.push('/menu') }} > Leave
                        </LogOutButton>
                    </div>
                }
            </Grid>
        </div>



    );
};