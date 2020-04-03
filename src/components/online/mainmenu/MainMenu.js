import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../../helpers/layout';
import { api, handleError } from '../../../helpers/api';
import User from '../../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../../views/design/Button';



const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
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
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

class MainMenu extends React.Component {

    goToSettings() {
        this.props.history.push('/settings/'+localStorage.getItem('id'))
    }

    goToLeaderBoard() {
        this.props.history.push('/leaderboard')
    }





    render() {
        return (

                <FormContainer>
                    <Form>
                        <ButtonContainer>
                            <Button
                                width="50%"
                                onClick = {() => {this.goToLeaderBoard()}}
                            >
                                Leaderboard
                            </Button>
                        </ButtonContainer>
                        <ButtonContainer>
                            <Button
                                width="50%"
                                onClick = {() => {this.goToSettings()}}
                            >
                                Settings
                            </Button>
                        </ButtonContainer>
                    </Form>
                </FormContainer>

        );
    }
}

export default withRouter(MainMenu);