import React from 'react';
import styled from 'styled-components';
import { BaseContainer, ButtonContainer, FormContainer } from '../../../helpers/layout';
import { api, handleError } from '../../../helpers/api';
import { withRouter } from 'react-router-dom';
import { Button, LogOutButton, BackButton, RoundContainer} from '../../../views/design/Button';
import Header from "../../../views/Header";
import {Player, PlayerStatCard} from "../../../views/Player";
import {BackIcon} from "../../../views/design/Icons";

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

function list(userlist) {
    return (
        <ul>{
            userlist.map(item => {
                return (
                    <PlayerContainer key={item.rank}>
                        <Player user={item} />
                    </PlayerContainer>
                );
            })
        }
        </ul>
    );

}

class Leaderboard extends React.Component {


     userlist = [
        {
            rank: '1',
            id: 'Id2',
            username: 'Player1',
            gamesWon: '77',
            year: 1988,
            statistics: {
                gamesWon: 88,
                gamesLost: 12,
                gamesPlayed:100,
            },
        },
        {
            rank: '2',
            id: 'Id231',
            username: 'Player2',
            gamesWon: '55',
            year: 1988,
            statistics: {
                gamesWon: 33,
                gamesLost: 32,
                gamesPlayed:65,
            },
        },
    ];

    componentWillMount() {
        try {
            //this.userlist = api.get('/users');


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
                <Row>
                    <RoundContainer onClick = {() => {this.goBack()}}>
                        <BackIcon />
                    </RoundContainer>
                </Row>
                <Row>
                <Column>
                    <FormContainer>
                        {list(this.userlist)}
                    </FormContainer>
                </Column>
                <Column>
                    <PlayerStatCard/>
                </Column>
                </Row>
            </BaseContainer>
        );
    }



}

export default withRouter(Leaderboard);