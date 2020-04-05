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

    userlist =[
        {
            "username": "Tim",
            "avatarId": 0,
            "statistics": {
                "id": 1,
                "encounteredPokemon": [],
                "gamesWon": 0,
                "gamesPlayed": 0,
                "rating": 0,
                "storyProgress": 0
            },
            "creationDate": "05.04.2020",
            "online": true,
            "id": 1
        },
{
    "username": "Lol",
    "avatarId": 0,
    "statistics": {
        "id": 2,
        "encounteredPokemon": [],
        "gamesWon": 0,
        "gamesPlayed": 0,
        "rating": 0,
        "storyProgress": 0
    },
    "creationDate": "05.04.2020",
    "online": false,
    "id": 2
},
{
    "username": "123",
    "avatarId": 0,
    "statistics": {
    "id": 3,
        "encounteredPokemon": [],
        "gamesWon": 0,
        "gamesPlayed": 0,
        "rating": 0,
        "storyProgress": 0
},
    "creationDate": "05.04.2020",
    "online": true,
    "id": 3
}];

    constructor() {
        super();
        this.state = {
            users: 'Lol',
        };

    }

    async componentDidMount() {
        try {
            const response = api.get('/users', { headers: {'Token': localStorage.getItem('token')}});

            await new Promise(resolve => setTimeout(resolve, 2000));



            //this.setState({ users: response.data });

            // See here to get more data.
            console.log(response);

            console.log(this.state.users);

        } catch (error) {


            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    goBack() {
        this.props.history.push('/menu')
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
                            this.userlist.map(item => {
                                return (
                                    <PlayerContainer>
                                        <Player user={item} />
                                    </PlayerContainer>
                                );
                            })
                        }

                    </ButtonContainer>
                </Column>
                <Column>
                    <PlayerStatCard user={this.user} />
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