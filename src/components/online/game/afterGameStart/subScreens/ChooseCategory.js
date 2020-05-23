/**
    This component is displayed from 0 to 15 seconds

    If TurnPlayer is me, I get to be able to choose a category and call the put request
    If TurnPlayer is not me, I just get to see my card and not hte others.

    Next screen displayed is "Evolve"
 */


import React from "react";
import {
    PlayerContainer, SimpleColumnContainer
} from "../../../../../helpers/layout";
import {PlayerGame} from "../../../../../views/Player";
import {LogOutButton} from "../../../../../views/design/Button";
import {FocusedPokemonCard, PlaceholderCard} from "../../../../../views/design/PokemonCard";

import Grid from '@material-ui/core/Grid';

import {ColorlibConnector, ColorlibStepIcon} from "../../../../../views/design/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import {BerriesIconWithBadge} from "../../../../../views/design/Icons";
import {FlippedCard} from "./FlippedCard";
import {Alert} from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";
import styled from "styled-components";
import posed from 'react-pose';

let category;
category = {
    HP: "HP",
    WEIGHT: "WEIGHT",
    CAPTURERATE: "CAPTURE_RATING",
    ATTACKPOINTS: "ATK",
    DEFENSEPOINTS: "DEF",
    SPEED: "SPEED"
}
let clock;
clock = {
    GAMESTART: "gamestart",
    NEWROUND: "newround",
    PERIOD: "period"
}

const AlertContainer = styled.div`
  width: 100%;
  alignItems: center;
`;

const Box = posed.div({
    hoverable: true,
    pressable: true,
    init: {
        scale: 1,
        boxShadow: '0px 0px 0px rgba(0,0,0,0)'
    },
    hover: {
        scale: 1.05,
        boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
    },
    press: {
        scale: 1.05,
        boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
    },
    hidden: { opacity: 0, y: -1000, transition: { duration: 500 }},
    visible: { opacity: 1, y: 0, transition: { duration: 500 }},

});

export class ChooseCategory extends React.Component {

    constructor() {
        super();
        this.state = {
            visible: false
        };
    }



    stepper = null;
    /**
     * Assigns the stepper to the variable stepper
     */
    componentDidMount() {
        let steps = ['Category selection', 'Evolve Pokémon', 'Results'];

        if(this.props.masterState.amITurnPlayer){
            steps[0] = 'Select category';
        }else{
            steps[0] = this.props.masterState.turnPlayer.user.username + ' is choosing';
        }

        this.stepper = <Stepper alternativeLabel activeStep={0} connector={<ColorlibConnector />} style={{ backgroundColor: "transparent" }} style={{padding: '0px', margin: '0px', marginTop: '25px', marginBottom: '25px', background: 'transparent', width: '280px'}}>
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>

        this.setState({visible: true})
    }

    /**
     * Returns the left-hand side of the screen with all the players, the stepper and the berries
     */
    showLeaderboard() {

        return (<SimpleColumnContainer width={'280px'} sideMargin={'0px'} style={{marginLeft: '10px'}}>
                <Collapse in={this.props.masterState.openWarning}>
                    <AlertContainer>
                        <Alert severity="warning"
                               action={
                                   <IconButton
                                       aria-label="close"
                                       color="inherit"
                                       size="small"
                                       width={'50%'}

                                   >
                                       <CloseIcon fontSize="inherit"/>
                                   </IconButton>
                               }
                        >
                            Warning: Choose a Category or you will be kicked for being AFK!
                        </Alert>
                    </AlertContainer>
                    <br/>
                </Collapse>
                {this.props.masterState.players.map(player => {
                    return (
                        <PlayerContainer>
                            {player.user.id == localStorage.getItem('id') ?
                                (<PlayerGame player={player} addOn = "(Me)"/>) :
                                (<PlayerGame player={player} addOn = ""/>)
                            }
                        </PlayerContainer>

                    );
                })}

            {this.stepper}


                {BerriesIconWithBadge(this.props.masterState.berries)}
                <LogOutButton
                    width = "50%"
                    disabled={this.props.masterState.amITurnPlayer}
                    onClick={() => { if (window.confirm('Are you sure you want to leave the game?')) this.props.history.push('/menu') }} > Give Up
                </LogOutButton>

            </SimpleColumnContainer>
        );
    }
    render() {
        return (
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                style={{marginTop: '50px'}}
            >
                {this.showLeaderboard()}
                {localStorage.getItem('SelectedCat')==0 ?
                    <FlippedCard front = {FocusedPokemonCard(this.props.masterState.deck.cards[0], !this.props.masterState.amITurnPlayer, '0', 'Your Card', this.props.parentMethod, false, true, 0, this.props.masterState.pokeCode.toString()) }/>
                    :
                    <FlippedCard front = {FocusedPokemonCard(this.props.masterState.deck.cards[0], !this.props.masterState.amITurnPlayer, localStorage.getItem('SelectedCat'), 'Your Card', this.props.parentMethod, false, true, 0, this.props.masterState.pokeCode.toString())}/>
                }
                <Box className="box" pose={this.state.visible ? 'visible' : 'hidden'}>{PlaceholderCard()}</Box>


            </Grid>
        );
    }

}