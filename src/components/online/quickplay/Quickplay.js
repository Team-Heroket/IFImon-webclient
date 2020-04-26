import React from 'react';
import {withRouter} from "react-router-dom";
import {BaseContainer, ButtonContainer, FormContainer, PokeCodeContainer, PlayerContainer} from "../../../helpers/layout";
import Header from "../../../views/Header";
import styled from "styled-components";
import {Button, MenuButton, RoundContainer, TransparentButton} from "../../../views/design/Button";
import {BackIcon} from "../../../views/design/Icons";
import {api, handleError} from "../../../helpers/api";
import {Spinner} from "../../../views/design/Spinner";
import {Player, PlayerAdmin, PlayerMe, PlayerMeAndAdmin, PlayerStatCard} from "../../../views/Player";


const Row = styled.div`
    &::after{
    content: "";
    clear: "";
    display: table "";
    }
    `;



const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const Label = styled.label`
  position: relative;
  transform : translate(-50%, 0%);
  width: 400px;
  left: 50%;
  color: white;
  margin-left: 50px;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Label2 = styled.label`
  position: relative;
  transform : translate(-50%, 0%);
  width: 400px;
  left: 50%;
  color: white;
  margin-bottom: 10px;
  
  text-align: center;
  font-weight: 500;
  font-size: 20px;
`;

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  align-items: center;
  justify-content: center;
`;


const Space = styled.div`
  margin-bottom: 45px
`;







class Quickplay extends React.Component {

    constructor() {
        super();
        this.state = {
            pokeCode: null
        };
    }
    async quickplay() {
        try {
            console.log('requesting new game')
            const requestBody = JSON.stringify({
                gameName: 'lol',
                mode: "SINGLE_PLAYER"
            });
            const request = await api.post('/games', requestBody, {headers: {'Token': localStorage.getItem('token')}});
            this.props.history.push('/game/'+(request.data).token);
        } catch (error) {
            alert(`Something went wrong during the quickplay creation: \n${handleError(error)}`);
        }
    }

    componentDidMount() {
        this.quickplay();
    }

    render() {
        return (
            <BaseContainer>
                <Header height={140} top={33}/>
                <RoundContainer onClick={() => {
                    this.goBack()
                }}>
                    <BackIcon/>
                </RoundContainer>
                <FormContainer>
                    <Space/>
                    <Spinner/>
                </FormContainer>
            </BaseContainer>
        );
    }



}
export default withRouter(Quickplay);