import React from "react";
import styled from "styled-components";
import {FormContainer} from "../../../../../helpers/layout";

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
  left: 15%;
  color: white;
  margin-left: 4px;
  margin-bottom: 50px;
  text-transform: uppercase;
  font-size: 30px;
  font-weight: 300;
`;

let linkToImage = '../../../../../components/shared/images/avatarSVG';


export let Finished = ({masterState}) => {

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
                {masterState.winners[0].user.avatarId < 10 ? <img alt="avatar" src={require('../../../../../components/shared/images/avatarSVG/00'+(masterState.winners[0].user.avatarId)+'-avatar.svg')} height={"150px"} width={"150px"}/>
                    : <img alt="avatar" src={require(linkToImage+'/0'+(masterState.winners[0].user.avatarId)+'-avatar.svg')} height={"66px"} width={"66px"}/>}
                <div>
                    <Space/>
                    <Label>
                        {winnerText()}
                    </Label>
                </div>
            </FormContainer>
        </div>



    );
};