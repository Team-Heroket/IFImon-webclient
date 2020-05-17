import React from 'react';
import styled from 'styled-components';
import {
    AvatarContainer,
    BaseContainer,
    FormContainer,
    SimpleContainer
} from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import {AvatarButton, Button, LogOutButton} from '../../views/design/Button';
import Header from "../../views/Header";
import Grid from "@material-ui/core/Grid";
import {Alert} from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";


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
  margin-bottom: 25px;
  padding-left:10px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 16px;
  font-weight: 300;
  margin-top: 5px;
  -Webkit-text-security: disc;
  text-security: disc;
`;



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
        this.keyPress = this.keyPress.bind(this);
        localStorage.setItem('accountCreation', 'false');
        this.state = {
            open: false,
            errorCode: null,
            password: null,
            passwordRepeat: null,
            username: null,
            avatarId: null,
            avatarClicked: null,
            openNetworkError: false
        };
    }


    handleClick(event) {
        this.setState({avatarId: event.currentTarget.id,
            avatarClicked: event.currentTarget.id});
        console.log("New id: "+event.currentTarget.id);
    }

    keyPress(e){
        if(e.keyCode == 13 && this.state.username && this.state.password && this.state.avatarId){
            this.register();
        }
    }

    componentDidUpdate() {
        if (this.state.openNetworkError ==true) {
            setTimeout(() => {
                this.setState({openNetworkError: false})
            }, 5000)
        }
        else if (this.state.open ==true) {
            setTimeout(() => {
                this.setState({open: false, errorCode: false})
            }, 5000)
        }
    }

    createAvatarList() {
        let avatar_list = [];
        for (let i=1; i<61; i++) {
            let enable;
            enable = false;
            let s = '';
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
                    onKeyDown={this.keyPress}
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
            localStorage.setItem('accountCreation', "true");
            this.goToLogin();

        } catch (error) {
            if (error.response) {
                if(error.response.data.status == '400'){
                    this.setState({open: true, errorCode: 400});
                }else if(error.response.data.status == '500'){
                    this.setState({open: true, errorCode: 500});
                }
                else{
                    alert(`Something went wrong during the login: \n${handleError(error)}`);}
            }
            else {
                this.setState({openNetworkError: true})
            }
        }
    }

    goToLogin() {
        this.props.history.push('/login');
    }

    checkPassword() {
        if (this.state.password) {
            if (this.state.password.length < 8) {
                return "Password must be at least 8 characters long";
            }

            else if (!this.hasUpperCase(this.state.password)) {
                return "Password must contain at least one capital letter"
            }
            else if (!this.hasLowerCase(this.state.password)) {
                return "Password must contain at least one lower case letter"
            }
            else if (!this.hasNumber(this.state.password)) {
                return "Password must contain at least one number"
            }
            else {
                return null;
            }
        }

    }
    hasUpperCase(word) {
        let hasUpper = false
        console.log("word length is: "+word.length)
        let i=0;
        while (i<word.length) {
            let character = word.charAt(i);
            if (!isNaN(character * 1)){
            }else{
                if (character == character.toUpperCase()) {
                    hasUpper = true;
                    return hasUpper;
                }
            }
            i++;
        }
        return hasUpper;
    }

    hasLowerCase(word) {
        let hasLower = false
        let i=0;
        while (i<word.length) {
            let character = word.charAt(i);
            if (!isNaN(character * 1)){

            }else{
                if (character == character.toLowerCase()) {
                    hasLower = true;
                    return hasLower;
                }
            }
            i++;
        }
        return false;
    }

    hasNumber(word) {
        let hasLower = false
        let i=0;
        while (i<word.length) {
            let character = word.charAt(i);
            if (!isNaN(character * 1)){
                hasLower = true;
                return hasLower
            }
            i++;
        }
        return false;
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
                                <Alert severity="error"
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
                        <Collapse in={this.state.openNetworkError}>
                            <Alert severity="error"
                                   action={
                                       <IconButton
                                           aria-label="close"
                                           color="inherit"
                                           size="small"
                                           onClick={() => {
                                               this.setState({openNetworkError: false});
                                           }}
                                       >
                                           <CloseIcon fontSize="inherit"/>
                                       </IconButton>
                                   }
                            >
                                Network Error - Server is Offline
                            </Alert>
                            <br/>
                        </Collapse>
                            <Label>Enter Username</Label>
                            <InputField
                                placeholder="Enter here.."
                                onChange={e => {
                                    this.handleInputChange('username', e.target.value);
                                }}
                                onKeyDown={this.keyPress}
                            />
                            <br/>

                            <Label style={{marginTop: '10px'}}>Enter Password</Label>
                            <PasswordField
                                placeholder="Enter here.."
                                onChange={e => {
                                    this.handleInputChange('password', e.target.value);
                                }}
                                style={this.checkPassword() ? ({'margin-bottom': '4px'}) : ({'margin-bottom': '30px'})}
                                onKeyDown={this.keyPress}
                            />
                            <Label
                                style={this.checkPassword() ? ({'margin-bottom': '11px','font-size': '13px', color: 'red', 'font-weight': '400'}) : ({'margin-bottom': '0px'})}

                            >
                                {this.state.password ? this.checkPassword(): null}
                            </Label>

                            <br/>
                        <Label style={{marginTop: '10px'}}>Enter Password Again</Label>
                        <PasswordField
                            placeholder="Enter here.."

                            style = {this.state.password ? ((this.state.password == this.state.passwordRepeat) ? ({background: 'rgba(27, 253, 78, 0.3)'}) : ({background: 'rgba(255, 0, 0, 0.3)'}))
                                : ({background: 'rgba(255, 255, 255, 0.2)'})}
                            onChange={e => {
                                this.handleInputChange('passwordRepeat', e.target.value);
                            }}
                            onKeyDown={this.keyPress}
                        />
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                                <Button style={{marginLeft: '7px', marginTop: '27px'}}
                                    disabled={!this.state.username || !this.state.password || !this.state.avatarId || !this.state.passwordRepeat || !(this.state.password == this.state.passwordRepeat) || this.checkPassword()}
                                    width="50%"
                                    onClick={() => {
                                        this.register();
                                    }}
                                >
                                    Sign Up
                                </Button>
                                <LogOutButton
                                    width="33%"
                                    onClick={() => {
                                        this.goToLogin();
                                    }}
                                >
                                    Cancel
                                </LogOutButton>
                        </Grid>
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

