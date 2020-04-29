import React from 'react';
import styled from 'styled-components';
import {
    AvatarContainer,
    BaseContainer,
    ButtonContainer,
    FormContainer,
    SimpleColumnContainer,
    SimpleContainer
} from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import {AvatarButton, Button, LogOutButton} from '../../views/design/Button';
import Header from "../../views/Header";
import Grid from "@material-ui/core/Grid";
import {Alert} from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";


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
  margin-top: 5px;
  padding-left:10px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 16px;
  font-weight: 300;
  
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
  margin-top: 5px;
  -Webkit-text-security: disc;
  text-security: disc;
`;



const Column = styled.div`
    float: ${props => props.float || "left"};;
    align-items: center
    
    width = 100%
    
    @media only screen and (min-width: 768px){
    width: 50%;
    padding-top: 100px;
    }
`

const Label = styled.label`
  position: relative;
  left: 10px;
  width: 400px;
  
  color: white;
  margin-left: 4px;
  margin-bottom: 5px;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 300;
`;

class Register extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            open: false,
            errorCode: null,
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
                    <SimpleContainer index = {i}>
                        <img alt="avatar" src={require('../shared/images/avatarSVG/0'+s+'-avatar.svg')} height={"66px"} width={"66px"} index = {i}/>
                    </SimpleContainer>
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
            if(error.response.data.status == '400'){
                this.setState({open: true, errorCode: 400});
            }else if(error.response.data.status == '500'){
                this.setState({open: true, errorCode: 500});
            }
            else{
            alert(`Something went wrong during the login: \n${handleError(error)}`);}
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
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                >
                    <FormContainer margin={'100px'}>
                            <Collapse in={this.state.open}>
                                <Alert severity="warning"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                this.setState({open: false});
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit"/>
                                        </IconButton>
                                    }
                                >
                                    {this.state.errorCode == 400 ? 'Username already taken!' : 'Internal Server Error'}
                                </Alert>
                                <br/>
                            </Collapse>
                            <Label>Enter Username</Label>
                            <InputField
                                placeholder="Enter here.."
                                onChange={e => {
                                    this.handleInputChange('username', e.target.value);
                                }}
                            />
                            <br/>

                            <Label>Enter Password</Label>
                            <PasswordField
                                placeholder="Enter here.."
                                onChange={e => {
                                    this.handleInputChange('password', e.target.value);
                                }}
                            />
                                <Button
                                    disabled={!this.state.username || !this.state.password || !this.state.avatarId}
                                    width="250px"
                                    onClick={() => {
                                        this.register();
                                    }}
                                >
                                    Sign Up
                                </Button>
                                <LogOutButton
                                    width="250px"
                                    onClick={() => {
                                        this.goToLogin();
                                    }}
                                >
                                    Cancel
                                </LogOutButton>
                    </FormContainer>
                    <FormContainer margin={'100px'}>
                        <Label>Choose your Avatar</Label>
                        <AvatarContainer>
                            {
                                this.createAvatarList()
                            }
                        </AvatarContainer>
                    </FormContainer>
                </Grid>
            </BaseContainer>
        );
    }



}

export default withRouter(Register);

