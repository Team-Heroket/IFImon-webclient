import React from 'react';
import styled from 'styled-components';
import { BaseContainer, ButtonContainer, FormContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
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

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class Login extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
      password: null,
      username: null
    };
  }
  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end
   * and its token is stored in the localStorage.
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


      localStorage.setItem('token', data.Token);
      localStorage.setItem('id', data.id)

      // Login successfully worked --> navigate to the route /game in the GameRouter
      this.props.history.push(`/menu`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }

  async goToRegister() {
    this.props.history.push('/register');
  }

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   * @param key (the key of the state for identifying the field that needs to be updated)
   * @param value (the value that gets assigned to the identified state key)
   */
  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState( {[key]: value} );
  }

  render() {
    return (
      <BaseContainer>
        <Header height={195} top={66} />
        <FormContainer>
          <Form>
            <Label>Username</Label>
            <InputField
              placeholder="Enter here.."
              onChange={e => {
                this.handleInputChange('username', e.target.value);
              }}
            />
            <Label>Password</Label>
            <InputField
              placeholder="Enter here.."
              onChange={e => {
                this.handleInputChange('password', e.target.value);
              }}
            />
            <ButtonContainer>
              <Button
                disabled={!this.state.username || !this.state.password}
                width="50%"
                onClick={() => {
                  this.login();
                }}
              >
                Login
              </Button>
              <Button
                  width="50%"
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
