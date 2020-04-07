import React from 'react';
import styled from 'styled-components';
import { BaseContainer, ButtonContainer, FormContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import {AvatarButton, Button} from '../../views/design/Button';
import Header from "../../views/Header";


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


const Row = styled.div`
    &::after{
    content: "";
    clear: "";
    display: table "";
    }
    `;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  position: relative;
  transform : translate(-50%, 0%);
  height: 35px;
  width: 400px;
  left: 50%;
  border: none;
  border-radius: 25px;
  margin-bottom: 20px;
  padding-left:10px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 16px;
  font-weight: 300;
  margin-top: 15px;
  
`;

const PasswordField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  position: relative;
  transform : translate(-50%, 0%);
  height: 35px;
  width: 400px;
  left: 50%;
  border: none;
  border-radius: 25px;
  margin-bottom: 20px;
  padding-left:10px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 16px;
  font-weight: 300;
  margin-top: 15px;
  -Webkit-text-security: disc;
  text-security: disc;
`;



const Column = styled.div`
    float: left
    align-items: center
    width = 100%
    
    @media only screen and (min-width: 768px){
    width: 50%;
    padding-top: 100px;
    }
`

const Label = styled.label`
  position: relative;
  transform : translate(-50%, 0%);
  width: 400px;
  left: 15%;
  color: white;
  margin-left: 4px;
  margin-bottom: 10px;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 300;
`;



class Register extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            password: null,
            username: null,
            avatarId: null,
            avatarClicked: null
        };
    }

    handleClick(event) {
        this.setState({avatarId: event.currentTarget.id,
            avatarClicked: event.currentTarget.id});
        console.log("New id: "+event.currentTarget.id);
    }

    createAvatarList() {
        let avatar_list = [];
        for (let i=1; i<61; i++) {
            let s;
            let enable;
            enable = false;
            s = '';
            if(i<10){
                s='0'+i;
            }
            else{
                s=i.toString();
            }
            if(i == this.state.avatarClicked){
                enable = true;
            }
            avatar_list.push(

                <AvatarButton
                    enabled={enable}
                    id = {i}
                    onClick={this.handleClick}
                >
                    <li index = {i}>
                        <img alt="avatar" src={require('../shared/images/avatarSVG/0'+s+'-avatar.svg')} height={"66px"} width={"66px"} index = {i}/>
                    </li>
                </AvatarButton>
            )
        }

        return avatar_list;
    }


    async register() {
        try {
            const requestBody = JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                avatarId: this.state.avatarId
            });
            await api.post('/users', requestBody);
            this.goToLogin();

        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    goToLogin() {
        this.props.history.push('/login');
    }


    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    render() {
        return (
            <BaseContainer>
                <Header height={195} top={66} />
                <div>
                    <Column>

                        <Row>
                            <Label>Enter Username</Label>
                        </Row>
                        <InputField
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange('username', e.target.value);
                            }}
                        />
                        <Row>
                            <Label>Enter Password</Label>
                        </Row>
                        <PasswordField
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange('password', e.target.value);
                            }}
                        />
                        <ButtonContainer>
                            <Button
                                disabled={!this.state.username || !this.state.password || !this.state.avatarId}
                                width="50%"
                                onClick={() => {
                                    this.register();
                                }}
                            >
                                Sign Up
                            </Button>
                            <Button

                                width="50%"
                                onClick={() => {
                                    this.goToLogin();
                                }}
                            >
                                Login
                            </Button>

                        </ButtonContainer>
                    </Column>
                    <Column>
                        <Label>Choose new Avatar</Label>
                        <ul>
                            {
                                this.createAvatarList()
                            }
                        </ul>
                    </Column>

                </div>
            </BaseContainer>
        );
    }



}

export default withRouter(Register);

