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
import posed from 'react-pose';


const BoxBlowUp = posed.div({
    hoverable: true,
    pressable: true,
    init: {
        scale: 1,

    },
    hover: {
        scale: 1.05,

    },
    press: {
        scale: 1.05,
    }
});

const Box = posed.div({
    hidden: { opacity: 0, scale: 0.8, transition: { duration: 300 }},
    visible: { opacity: 1, scale: 1, transition: { duration: 300 }},
});

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
            user: null,
            cardVisible: false,
            visible: false
        };

    }



    async componentDidMount() {
        try {
            const response1 = await api.get('/users', { headers: {'Token': localStorage.getItem('token')}});

            await new Promise(resolve => setTimeout(resolve, 2000));

            const response2 = await api.get('/users/'+localStorage.getItem('id'), { headers: {'Token': localStorage.getItem('token')}});
            await this.setState({user: response2.data,
                users: response1.data, visible: true});
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
        return <Box className="box" pose={this.state.cardVisibility ? 'visible' : 'hidden'}>
                <PlayerStatCard user={this.state.displaySecondaryCard} />
            </Box>
    }

    cardVisibility(newCard) {
        if (newCard != null) {
            this.setState({displaySecondaryCard: newCard})
            setTimeout(()=> {this.setState({cardVisibility: true})}, 100);
        }
        else {
            setTimeout(()=> {this.setState({cardVisibility: false})}, 100);
            setTimeout(()=> {this.setState({displaySecondaryCard: null})}, 400);

        }

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
                                                this.cardVisibility(null);
                                            }
                                            else {
                                                this.cardVisibility(player);
                                                //this.setState({displaySecondaryCard: player}, this.cardVisibility);
                                            }
                                        }
                                        else{
                                            this.cardVisibility(null);
                                                //this.setState({displaySecondaryCard: null}, this.cardVisibility);
                                            }
                                        console.log(this.state.displaySecondaryCard);
                                    }}>
                                        {player.id == localStorage.getItem('id') ?
                                            (<BoxBlowUp className="box"><PlayerMe user={player}  /></BoxBlowUp>) :
                                            (<BoxBlowUp className="box"><Player user={player}  /></BoxBlowUp>)
                                        }
                                    </PlayerContainer>

                                );
                            })
                        }

                    </ButtonContainer>
                </Column>
                <Column>
                    <Box className="box" pose={this.state.visible ? 'visible' : 'hidden'}>
                        <PlayerStatCard user={this.state.user} />
                    </Box>

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