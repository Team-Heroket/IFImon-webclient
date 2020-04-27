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
    align-items: center
    width = 100%
    align: center
`

const Text = styled.p`
    color: white;
    font-size: 1.5em;
`



class Tutorial extends React.Component {

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
                    
                        <Text>Welcome to the Pokémon Top Trumps Tutorial where we explain the game and its rules:</Text>
                        <Text>Pokémon Top Trumps is a card game, you can play with up to 5 friends or bots.
                        Every card represents a Pokémon with unique values to the stats: HP, ATK, DEF, SPEED, WEIGHT and CAPTURE RATING.
                        When the game starts, every player is dealt 5 random cards and berries of the amount of players participating in the game.
                        The creator of the lobby starts as the first turn player.</Text>
                        <a href="./tutorial-assets/tut-pic-1.png"><img src="./tutorial-assets/tut-pic-1.png" alt="tut-pic-1" width="50%"></img></a>
                        <a href="./tutorial-assets/tut-pic-1.png"><img src="./tutorial-assets/tut-pic-2.png" alt="tut-pic-2" width="50%"></img></a>
                        <Text>The turn player choses a category to battle in on a timer.</Text>
                        <a href="./tutorial-assets/tut-pic-1.png"><img src="./tutorial-assets/tut-pic-3.png" alt="tut-pic-3" width="50%"></img></a>
                        <a href="./tutorial-assets/tut-pic-1.png"><img src="./tutorial-assets/tut-pic-4.png" alt="tut-pic-4" width="50%"></img></a>
                        <Text>Everyone gets to see which category was chosen and has the chance to use one (or multiple) precious berry(s) to evolve their card.
                        Watch out for the timers on the left!</Text>
                        <a href="./tutorial-assets/tut-pic-1.png"><img src="./tutorial-assets/tut-pic-5.png" alt="tut-pic-5" width="50%"></img></a>
                        <a href="./tutorial-assets/tut-pic-1.png"><img src="./tutorial-assets/tut-pic-6.png" alt="tut-pic-6" width="50%"></img></a>
                        <Text>The player with the highest value in the chosen category wins the round and adds all played cards to the bottom of his deck.
                        This winner is the new turn player and a new round is started.
                        In case of a draw, all players get to keep their card and add it to the bottom of the deck. A rematch now starts with the current turn player staying the same.</Text>
                        <Text>The game is finished as soon as one player has all the cards of the other players.</Text>
                    
                    </Column>

                </Row>

            </BaseContainer>
        );
    }



}

export default withRouter(Tutorial);