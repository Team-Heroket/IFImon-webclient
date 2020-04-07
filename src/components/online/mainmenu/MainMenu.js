import React from 'react';
import styled from 'styled-components';
import { BaseContainer, ButtonContainer, FormContainer } from '../../../helpers/layout';
import { api, handleError } from '../../../helpers/api';
import User from '../../shared/models/User';
import { withRouter } from 'react-router-dom';
import {Button, LogOutButton, MenuButton, MenuIcon, TransparentButton} from '../../../views/design/Button';
import Header from "../../../views/Header";


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

    goToSettings() {
        this.props.history.push('/settings/'+localStorage.getItem('id'))
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
            const response = await api.put('/logout', body , { headers: {'Token': localStorage.getItem('token')}});

            // Get the returned user and update a new object.
            localStorage.removeItem('id');
            localStorage.removeItem('token');

            this.props.history.push('/login')
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }

    }

    render() {
        return (
            <BaseContainer>
                <Header height={140} top={33}/>
                <FormContainer>
                    <Form>
                        <ButtonContainer>
                            <TransparentButton
                                width="50%"
                                onClick = {() => {this.goToSocialMode()}}
                            >
                                SocialMode
                            </TransparentButton>
                            <TransparentButton
                                width="50%"
                                onClick = {() => {this.goToLeaderBoard()}}
                            >
                                Leaderboard
                            </TransparentButton>
                            <TransparentButton
                                width="50%"
                                onClick = {() => {this.goToSettings()}}
                            >
                                Settings
                            </TransparentButton>
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