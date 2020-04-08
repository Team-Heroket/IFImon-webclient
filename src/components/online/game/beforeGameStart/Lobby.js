import React from 'react';
import {withRouter} from "react-router-dom";
import {BaseContainer, ButtonContainer, FormContainer} from "../../../../helpers/layout";
import Header from "../../../../views/Header";
import styled from "styled-components";
import {Button, MenuButton, RoundContainer, TransparentButton} from "../../../../views/design/Button";
import {BackIcon} from "../../../../views/design/Icons";
import {api, handleError} from "../../../../helpers/api";
import {Spinner} from "../../../../views/design/Spinner";


const Row = styled.div`
    &::after{
    content: "";
    clear: "";
    display: table "";
    }
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

const Label = styled.label`
  position: relative;
  transform : translate(-50%, 0%);
  width: 400px;
  left: 50%;
  color: white;
  margin-left: 50px;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Label2 = styled.label`
  position: relative;
  transform : translate(-50%, 0%);
  width: 400px;
  left: 50%;
  color: white;
  margin-bottom: 10px;
  
  text-align: center;
  font-weight: 500;
  font-size: 20px;
`;

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


const PokeCodeContainer = styled.div`
  &:hover {
    transform: translateY(${props => (props.disabled ? 0 : 2)}px);
  }
  padding: 6px;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 16px;
  text-align: center;
  color: white;
  width: ${props => props.width || null};
  height: 35px;
  border: 1px solid #FFFFFF;;
  border-radius: 25px;
  margin-top: 10px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? "66%" : "100%")};
  background: rgba(255, 255, 255, 0.2);;
  transition: all 0.3s ease;
  margin: 0 auto;
`;

const Space = styled.div`
  margin-bottom: 45px
`;




class Lobby extends React.Component {

    constructor() {
        super();

        this.state = {
            pokeCode: null,
            users: [1,2,3],
            admin: null,
            amount: 6,
            start: false
        };
    }

    /*
    async componentDidMount() {
        try {
            const response = await api.get('/game/'+this.state.pokeCode);


        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }

     */

    render() {

        return (
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
                        <Label>
                            Your Lobby's PokeCode
                        </Label>

                        <PokeCodeContainer
                            width="50%"
                        >
                            {this.props.match.params.pokeCode}
                        </PokeCodeContainer>
                        <Space/>
                        <Label2>
                            Waiting for Players ({this.state.users.length}/{this.state.amount})
                        </Label2>
                        <CenterContainer>
                            <Spinner animation="grow" />
                        </CenterContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
        );
    }


}
export default withRouter(Lobby);