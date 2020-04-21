import React from 'react';
import styled from 'styled-components';
import { BaseContainer, ButtonContainer, FormContainer } from '../../../helpers/layout';
import { api, handleError } from '../../../helpers/api';
import User from '../../shared/models/User';
import { withRouter } from 'react-router-dom';
import {
    Button,
    LogOutButton,
    MenuButton,
    MenuButtonIcon,
    MenuIcon,
    TransparentButton,
    TestObject,
} from '../../../views/design/Button';
import Header from "../../../views/Header";
import {BackIcon} from "../../../views/design/Icons";
import {PlayerMe} from "../../../views/Player";
import {PokemonCard} from "../../../views/design/PokemonCard";


const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
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

class MainMenu extends React.Component {

    constructor() {
        super();
        this.state = {
            pokeCode: "asdasas",
            amountOfPlayers: 6,
            amountOfNPC: 0,
        };
    }

    goToSettings() {
        this.props.history.push('/settings/'+localStorage.getItem('id'))
    }

    goToQuickplay() {
        this.props.history.push('/quickplay')
    }

    goToLeaderBoard() {
        this.props.history.push('/leaderboards')
    }

    goToSocialMode() {
        this.props.history.push('/socialmode')
    }

    async logOut(){
        try {
            const body = JSON.stringify({});
            let token = localStorage.getItem('token');
            localStorage.removeItem('token');
            localStorage.removeItem('id');

            await api.put('/logout', body , { headers: {'Token': token}});

            // Get the returned user and update a new object.


            this.props.history.push('/login')
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }

    }

    render() {
        return (
            <BaseContainer>
                {console.log(localStorage.getItem('token'))}
                {console.log(localStorage.getItem('id'))}
                <Header height={140} top={33}/>
                <FormContainer>
                    <Form>
                        <ButtonContainer>

                            <MenuButtonIcon type={{text: "social mode"}}
                                            onClicktoDo = {() => {this.goToSocialMode()}}
                            />
                            <MenuButtonIcon type={{text: "leaderboard"}}
                                            onClicktoDo = {() => {this.goToLeaderBoard()}}
                            />
                            <MenuButtonIcon type={{text: "quickplay"}}
                                            onClicktoDo = {() => {this.goToQuickplay()}}
                            />
                            <MenuButtonIcon type={{text: "settings"}}
                                            onClicktoDo = {() => {this.goToSettings()}}
                            />

                            <LogOutButton
                                width="50%"
                                onClick = {() => {this.logOut()}}
                            >
                                Log Out
                            </LogOutButton>
                        </ButtonContainer>

                    </Form>
                </FormContainer>
            </BaseContainer>
        );
    }
}

export default withRouter(MainMenu);