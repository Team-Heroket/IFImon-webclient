import React from 'react';
import {withRouter} from "react-router-dom";
import {BaseContainer, ButtonContainer, FormContainer} from "../../../../helpers/layout";
import Header from "../../../../views/Header";
import styled from "styled-components";
import {Button, MenuButton, RoundContainer, TransparentButton} from "../../../../views/design/Button";
import {BackIcon} from "../../../../views/design/Icons";
import {api, handleError} from "../../../../helpers/api";

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
  text-align: center;
  border: none;
  border-radius: 25px;
  margin-bottom: 10px;
  padding-left:10px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  
`;



const Line = styled.div`
  width: 400px;
  color: white;
  text-align: center;
  border-bottom: 1px solid #000;
  line-height: 0.01em;
  margin: 10px 0 20px;
  backgroundColour: white;
  background: white;
  padding: 0 10px;
`;





class SocialMode extends React.Component {
    constructor() {
        super();
        this.state = {
            pokeCode: null
        };
    }


    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    goBack() {
        this.setState({pokeCode: null});
        this.props.history.push('/menu');
    }

    async join() {
        //IMPORTANT: Ask backend team if they can also accept id
        //IMPOORTANT: May need token-authorization. This is not added yet
        // '/lobby/pokeCode' is not implemented yet neither as a component nor in the AppRouter
        try {
            const requestBody = JSON.stringify({
                action: 0,
                id: localStorage.getItem('id')
            });
            await api.put('/game/'+this.state.pokeCode+'/users', requestBody);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            this.props.history.push(`/lobby/`+this.state.pokeCode);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    render() {

        return(
            <BaseContainer>
                <Header height={140} top={33} />
                <Row>
                    <RoundContainer onClick={() => {
                        this.goBack()
                    }}>
                        <BackIcon/>
                    </RoundContainer>
                </Row>
                <FormContainer>
                   <Form>
                       <InputField
                           placeholder="Enter PokeCode"
                           onChange={e => {
                               this.handleInputChange('pokeCode', e.target.value);
                           }}/>
                       <ButtonContainer>
                           <Button
                               disabled={!this.state.pokeCode}
                               width="400px"
                               onClick={() => {
                                   this.join();
                               }}
                           >
                               Join
                           </Button>
                           <Line>OR</Line>
                           <TransparentButton
                               width = "400px"
                           >
                               New Game
                           </TransparentButton>
                       </ButtonContainer>
                   </Form>
                </FormContainer>
            </BaseContainer>

        );
    }
}

export default withRouter(SocialMode);