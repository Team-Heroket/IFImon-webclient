import React from 'react';
import styled from 'styled-components';
import { BaseContainer, ButtonContainer, FormContainer, PlayerContainer } from '../../../helpers/layout';
import { api, handleError } from '../../../helpers/api';
import { withRouter } from 'react-router-dom';
import { Button, LogOutButton, BackButton, RoundContainer} from '../../../views/design/Button';
import Header from "../../../views/Header";
import {PlayerStatCard, Player, PlayerMe} from "../../../views/Player";

import {BackIcon} from "../../../views/design/Icons";
import {Spinner} from "../../../views/design/Spinner";

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



class Leaderboards extends React.Component {

    constructor() {
        super();
        this.state = {
            displaySecondaryCard: null,
            users: null,
            user: null
        };

    }



    async componentDidMount() {
        try {
            const response1 = await api.get('/users', { headers: {'Token': localStorage.getItem('token')}});

            await new Promise(resolve => setTimeout(resolve, 2000));

            const response2 = await api.get('/users/'+localStorage.getItem('id'), { headers: {'Token': localStorage.getItem('token')}});
            await this.setState({user: response2.data,
                users: response1.data});
            // See here to get more data.
            console.log("response me", response2.data);
            console.log("response all", response1.data);
        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
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
                <Row>
                    <RoundContainer onClick = {() => {this.goBack()}}>
                        <BackIcon />
                    </RoundContainer>
                </Row>
                {(!this.state.users || !this.state.user) ? (
                    <FormContainer><Spinner /></FormContainer>
                    ) : (
                    <Row>
                    <Column>
                    <ButtonContainer>
                        {
                            this.state.users.map(player => {
                                return (
                                    <PlayerContainer onClick={() => {
                                        console.log('Player Clicked:', player);
                                        if (this.state.user.username != player.username) {
                                            if (this.state.displaySecondaryCard != null && this.state.displaySecondaryCard.username == player.username) {
                                                this.setState({displaySecondaryCard: null});
                                            }
                                            else {
                                                this.setState({displaySecondaryCard: player});
                                            }
                                        }
                                        else{
                                                this.setState({displaySecondaryCard: null});
                                            }
                                        console.log(this.state.displaySecondaryCard);
                                    }}>
                                        {player.id == localStorage.getItem('id') ?
                                            (<PlayerMe user={player}  />) :
                                            (<Player user={player}  />)
                                        }
                                    </PlayerContainer>

                                );
                            })
                        }

                    </ButtonContainer>
                </Column>
                <Column>
                    <PlayerStatCard user={this.state.user} />
                    {this.state.displaySecondaryCard ? (
                        this.displayPlayerCard()
                    ) : null
                    }
                </Column>
                </Row>

                )
                    }
            </BaseContainer>
        );
    }



}

export default withRouter(Leaderboards);