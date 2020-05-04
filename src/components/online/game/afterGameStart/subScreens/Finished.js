import React from "react";
import styled from "styled-components";
import {
    ButtonContainer,
    FormContainer
} from "../../../../../helpers/layout";
import {EvolveButton, LogOutButton} from "../../../../../views/design/Button";
import Confetti from "../../../../shared/Confetti";
import Grid from "@material-ui/core/Grid";
import {Clock} from "../Clock";
import {api, handleError} from "../../../../../helpers/api";
import {Spinner} from "../../../../../views/design/Spinner";

/**
    This will be displayed when the whole Game is finished

 */



const Space = styled.div`
  margin-bottom: 80px
  width: 100%
`;

const Label = styled.label`
  position: relative;
  width: 400px;
 
  color: white;
  
  margin-bottom: 50px;
  text-transform: uppercase;
  font-size: 30px;
  font-weight: 300;
  text-align: center;
`;

let clock;
clock = {
    GAMESTART: "gamestart",
    REMATCH: "rematch",
    PERIOD: "period",
}



export let Finished = ({masterState, history}) => {

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
                npc: 0,
                card: masterState.totalCards
            });
            await api.put('/games/' + masterState.pokeCode.toString(), requestBody, {headers: {'Token': localStorage.getItem('token')}});

        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }






    return (
            <FormContainer margin={'5em'}>
                {masterState.winners[0].id == masterState.player_me.id ? <Confetti/> : null}
            <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center">
                <div>
                    <ButtonContainer>
                    {masterState.winners[0].user.avatarId.valueOf() < 10 ? <img alt="avatar" src={require('../../../../../components/shared/images/avatarSVG/00'+(masterState.winners[0].user.avatarId)+'-avatar.svg')} height={"150px"} width={"150px"}/>
                        : <img alt="avatar" src={require('../../../../../components/shared/images/avatarSVG/0'+(masterState.winners[0].user.avatarId)+'-avatar.svg')} height={"150px"} width={"150px"}/>}
                    </ButtonContainer>
                        <Space/>
                    <Label>
                        {winnerText()}
                    </Label>
                </div>
                {masterState.amIAdmin ?
                    <ButtonContainer>
                        <Clock remainingTime={10000} totalTime={10000} type={clock.REMATCH} />
                        <Space/>
                        <div>
                            <EvolveButton
                            width = "150px"
                            onClick={() => {rematch()}} > Rematch
                            </EvolveButton>
                        </div>
                        <div>
                            <LogOutButton
                            width = "100px"
                            onClick={() => { if (window.confirm('Are you sure you want to leave the game?')) history.push('/menu') }} > Leave
                            </LogOutButton>
                        </div>
                    </ButtonContainer>
                    :
                    <ButtonContainer>
                        <Label>
                            Wait for Admin...
                        </Label>
                        <Space/>
                        <Spinner/>
                        <LogOutButton
                            width = "50%"
                            onClick={() => { if (window.confirm('Are you sure you want to leave the game?')) history.push('/menu') }} > Leave
                        </LogOutButton>
                    </ButtonContainer>
                }
            </Grid>
    </FormContainer>




    );
};