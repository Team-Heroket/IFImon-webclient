import React from 'react';
import styled from 'styled-components';
import { BaseContainer, ButtonContainer, FormContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import Header from "../../views/Header";
import {Alert} from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";
import {OrSeparation} from "../../views/design/Icons";


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
  -Webkit-text-security: disc;
  text-security: disc;
`;

const Label = styled.label`
  position: relative;
  transform : translate(-50%, 0%);
  width: 400px;
  left: 50%;
  color: white;
  margin-left: 4px;
  margin-bottom: 10px;
  text-transform: uppercase;
`;


class Login extends React.Component {

  constructor() {
    super();
    this.keyPress = this.keyPress.bind(this);
    this.state = {
      password: null,
      username: null,
      openError: false,
      openSuccess: false
    };
  }

  keyPress(e){
    if(e.keyCode == 13 && this.state.username && this.state.password){
      this.login();
    }
  }

  /**
   * If we just came from register and created an account, a corresponding "success" alert appears
   */
  componentDidMount() {
    localStorage.setItem('info', 0)
    localStorage.setItem("justLoggedIn", "false")
    if (localStorage.getItem('accountCreation') == 'true') {
      this.setState({openSuccess: true});
      setTimeout(() => {
        this.setState({openSuccess: false});
        localStorage.setItem('accountCreation', 'false');
      }, 5000);
    }
  }

  /**
   * Makes the login request. If it is successful, user goes to main menu. Otherwise an alert appears
   */
  async login() {
    try {
      const requestBody = JSON.stringify({
        username: this.state.username,
        password: this.state.password
      });
      const response = await api.put('/login', requestBody);

      // Get the returned user and update a new object.
      const data = response.data;


      localStorage.setItem('token', data.token);
      localStorage.setItem('id', data.id)
      localStorage.setItem('username', this.state.username)
      localStorage.setItem("justLoggedIn", "true")

      // Login successfully worked --> navigate to the route /game in the GameRouter
      this.props.history.push(`/menu`);
    } catch (error) {
      if (error.response) {
        if(error.response.data.error == 'User not found'){
          this.setState({openError: true, errorCode: 404});
        }
        else if(error.response.status == 401){
          this.setState({openError: true, errorCode: 401});
        }
        else if(error.response.status == 500){
          this.setState({open: true, errorCode: 500});
        }
        else {
          alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
      }
      else {
        this.props.history.push('/error');
      }

    }
  }

  async goToRegister() {
    this.props.history.push('/register');
  }


  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState( {[key]: value} );
  }

  /**
   * Makes sure that Alerts disappear after 5 seconds
   */
  componentDidUpdate() {

    if (this.state.open == true) {
      setTimeout(() => {
        this.setState({open: false, errorCode: false})
      }, 5000)
    } else if (this.state.openError == true) {
      setTimeout(() => {
        this.setState({openError: false, errorCode: false})
      }, 5000)
    }
  }

  render() {
    return (
      <BaseContainer>
        <Header height={195} top={66} />
        <FormContainer margin={'100px'}>
          <Form>
            <Collapse in={this.state.openSuccess}>
              <Alert severity="success"
                     action={
                       <IconButton
                           aria-label="close"
                           color="inherit"
                           size="small"
                           onClick={() => {
                             this.setState({openSuccess: false});
                           }}
                       >
                         <CloseIcon fontSize="inherit"/>
                       </IconButton>
                     }
              >
                Account successfully created!
              </Alert>
              <br/>
            </Collapse>
            <Collapse in={this.state.openError}>
              <Alert severity="error"
                     action={
                       <IconButton
                           aria-label="close"
                           color="inherit"
                           size="small"
                           onClick={() => {
                             this.setState({openError: false});
                           }}
                       >
                         <CloseIcon fontSize="inherit"/>
                       </IconButton>
                     }
              >
                {this.state.errorCode == 404 ?  'User does not exist!' : (this.state.errorCode ==500 ? 'Internal Server Error': 'Wrong password!')}
              </Alert>
              <br/>
            </Collapse>

            <Label>Username</Label>
            <InputField
              placeholder="Enter here.."
              onChange={e => {
                this.handleInputChange('username', e.target.value);
              }}
              onKeyDown={this.keyPress}
            />
            <Label>Password</Label>
            <PasswordField
              placeholder="Enter here.."
              onChange={e => {
                this.handleInputChange('password', e.target.value);
              }}
              onKeyDown={this.keyPress}
            />
            <ButtonContainer>
              <Button
                disabled={!this.state.username || !this.state.password}
                width="55%"
                onClick={() => {
                  this.login();
                }}
              >
                Login
              </Button>

              <OrSeparation />

              <Button
                  width="55%"
                  onClick={() => {
                    this.goToRegister();
                  }}
              >
                Sign Up
              </Button>
              </ButtonContainer>

          </Form>
        </FormContainer>
      </BaseContainer>
    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login);
