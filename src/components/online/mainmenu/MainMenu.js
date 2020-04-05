import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';
import { BaseContainer, ButtonContainer, FormContainer } from '../../../helpers/layout';
import { api, handleError } from '../../../helpers/api';
import User from '../../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button, LogOutButton, MenuButton, MenuIcon } from '../../../views/design/Button';
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

    async logOut(){
        try {
            const requestBody = JSON.stringify({
                token: localStorage.getItem('token')
            });
            const response = await api.put('/logout', requestBody);

            // Get the returned user and update a new object.
            localStorage.removeItem('id');
            localStorage.removeItem('token');
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
                            <Button
                                width="50%"
                                onClick = {() => {this.goToLeaderBoard()}}
                            >
                                Leaderboard
                            </Button>
                            <Button
                                width="50%"
                                onClick = {() => {this.goToSettings()}}
                            >
                                Settings
                            </Button>
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