import React from 'react';
import styled from 'styled-components';
import { BaseContainer, ButtonContainer, FormContainer } from '../../../helpers/layout';
import { api, handleError } from '../../../helpers/api';
import { withRouter } from 'react-router-dom';
import { Button, LogOutButton, BackButton, RoundContainer} from '../../../views/design/Button';
import Header from "../../../views/Header";
import {PlayerStatCard, Player} from "../../../views/Player";

import {BackIcon} from "../../../views/design/Icons";
import {Spinner} from "../../../views/design/Spinner";

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;

const Row = styled.div`
    &::after{
    content: "";
    clear: "";
    display: table "";
    }
    `;

const Column = styled.div`
    float: left
    align-items: center
    width = 100%
    
    @media only screen and (min-width: 768px){
    width: 50%;
    }
`



class Leaderboard extends React.Component {

    user = {
        "username": "Tim",
        "avatarId": 1,
        "statistics": {
            "id": 1,
            "encounteredPokemon": 272,
            "gamesWon": 0,
            "gamesPlayed": 0,
            "rating": 0,
            "storyProgress": 0
        },
        "creationDate": "05.04.2020",
        "online": false,
        "id": 1
    };

    constructor() {
        super();
        this.state = {
            displaySecondaryCard: null,
            users: null,
        };

    }

    async componentDidMount() {
        try {
            const response = await api.get('/users', { headers: {'Token': localStorage.getItem('token')}});

            await new Promise(resolve => setTimeout(resolve, 2000));

            this.setState({ users: response.data });

            // See here to get more data.
            console.log("response", response.data);

        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    goBack() {
        this.props.history.push('/menu')
    }


    displayPlayerCard() {
        return <PlayerStatCard user={this.state.displaySecondaryCard} />
    }

    render() {
        return (
            <BaseContainer>
                <Header height={140} top={33}/>
                {!this.state.users ? (
                    <Spinner />
                    ) : (<div>
                    <Row>
                        <RoundContainer onClick = {() => {this.goBack()}}>
                            <BackIcon />
                        </RoundContainer>
                    </Row>
                    <Row>
                    <Column>
                    <ButtonContainer>
                        {
                            this.state.users.map(player => {
                                return (
                                    <PlayerContainer onClick={() => {
                                        console.log('Player Clicked:', player);
                                        this.setState({displaySecondaryCard: player});
                                        console.log(this.state.displaySecondaryCard);
                                    }}>
                                        <Player user={player}  />
                                    </PlayerContainer>

                                );
                            })
                        }

                    </ButtonContainer>
                </Column>
                <Column>
                    <PlayerStatCard user={this.user} />
                    {this.state.displaySecondaryCard ? (
                        this.displayPlayerCard()
                    ) : null
                    }
                </Column>
                </Row>
                    </div>
                )
                    }
            </BaseContainer>
        );
    }



}

export default withRouter(Leaderboard);