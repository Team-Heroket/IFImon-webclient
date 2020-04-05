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


    componentWillMount() {
        try {
            this.userlist = api.get('/users', { headers: {'Token': localStorage.getItem('token')}});


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
                    <PlayerStatCard user={this.user}/>
                </Column>
                </Row>
            </BaseContainer>
        );
    }



}

export default withRouter(Leaderboard);