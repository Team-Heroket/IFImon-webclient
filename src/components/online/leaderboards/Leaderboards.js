import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../../helpers/layout';
import { api, handleError } from '../../../helpers/api';
import { withRouter } from 'react-router-dom';
import { Button, LogOutButton, MenuButton, MenuIcon } from '../../../views/design/Button';
import Header from "../../../views/Header";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  align-items: center;
  justify-content: center;
  margin-bottom:20px
`;

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
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

class Leaderboard extends React.Component {

    goToSettings() {
        this.props.history.push('/settings/'+localStorage.getItem('id'))
    }

    goToLeaderBoard() {
        this.props.history.push('/leaderboard')
    }

    async logOut(){

    }

    sortByPoints(){

    }

    componentWillMount() {
        try {
            const response = api.get('/users');

        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    render() {
        return (
            <BaseContainer>
                <Header height={140} top={33}/>
                <FormContainer>

                </FormContainer>
            </BaseContainer>
        );
    }
}

export default withRouter(Leaderboard);