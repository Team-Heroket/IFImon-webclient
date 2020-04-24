import React from "react";
import styled from "styled-components";
import {FormContainer} from "../../../../../helpers/layout";
import {LogOutButton} from "../../../../../views/design/Button";

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


    return (
        <div>
            <FormContainer>
                <Space/>
                {masterState.winners[0].user.avatarId.valueOf() < 10 ? <img alt="avatar" src={require('../../../../../components/shared/images/avatarSVG/00'+(masterState.winners[0].user.avatarId)+'-avatar.svg')} height={"150px"} width={"150px"}/>
                    : <img alt="avatar" src={require('../../../../../components/shared/images/avatarSVG/0'+(masterState.winners[0].user.avatarId)+'-avatar.svg')} height={"150px"} width={"150px"}/>}
                <div>
                    <Space/>
                    <Label>
                        {winnerText()}
                    </Label>
                    <Space/>
                    <LogOutButton
                        width = "50%"
                        onClick={() => { if (window.confirm('Are you sure you want to leave the game?')) history.push('/menu') }} > Leave
                    </LogOutButton>
                </div>
            </FormContainer>
        </div>



    );
};