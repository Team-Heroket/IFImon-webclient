import React from 'react';
import styled from 'styled-components';
import { BaseContainer, ButtonContainer, FormContainer, PlayerContainer } from '../../../helpers/layout';
import { api, handleError } from '../../../helpers/api';
import { withRouter } from 'react-router-dom';
import Header from "../../../views/Header";
import {PlayerStatCard, Player, PlayerMe} from "../../../views/Player";

import {BackButton, SoundButton} from "../../../views/design/Icons";
import {Spinner} from "../../../views/design/Spinner";
import Grid from "@material-ui/core/Grid";

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
            if (error.response) {
                if (error.response.status == 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('id');
                    this.props.history.push('/login')
                }
                else {
                    alert(`Something went wrong: \n${handleError(error)}`);
                }
            }
            else {
                this.props.history.push('/error')
            }
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
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                >
                    <BackButton
                        action={() => {this.goBack()}}/>
                    {localStorage.getItem('VolumeMuted')=='true'?
                        <SoundButton mute={true} action={()=>{
                            localStorage.setItem('VolumeMuted', 'false');
                            document.getElementById('MainTheme').play();
                            this.forceUpdate()}} />
                        :
                        <SoundButton mute={false} action={() => {
                            localStorage.setItem('VolumeMuted', 'true');
                            document.getElementById('MainTheme').pause();
                            this.forceUpdate()}} />
                    }
                </Grid>
                {(!this.state.users || !this.state.user) ? (
                    <FormContainer margin={'150px'}><Spinner /></FormContainer>
                    ) : (
                    <FormContainer margin={'50px'}>
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
                    </FormContainer>

                )
                    }
            </BaseContainer>
        );
    }



}

export default withRouter(Leaderboards);