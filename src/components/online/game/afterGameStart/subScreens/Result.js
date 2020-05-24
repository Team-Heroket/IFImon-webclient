/**
 This component is displayed from 30 to 35 seconds

 I get the end result of that round (who won, etc.)

 After the 35 second mark a 5 second clock is displayed (in the Game component)
 */

import React from "react";
import {ButtonContainer, PlayerContainer, SimpleColumnContainer} from "../../../../../helpers/layout";
import {PlayerGame, PlayersCard} from "../../../../../views/Player";
import {LogOutButton} from "../../../../../views/design/Button";
import {AmountOfBerries, BerriesIconWithBadge, DrawIcon, WinnerIcon} from "../../../../../views/design/Icons";
import {FocusedPokemonCard} from "../../../../../views/design/PokemonCard";
import Grid from "@material-ui/core/Grid";
import {ColorlibConnector, ColorlibStepIcon} from "../../../../../views/design/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Badge from "@material-ui/core/Badge";
import {FlippedCardResult} from "./FlippedCardResult";
import {FlippedCardResultOur} from "./FlippedCardResultOur";
import posed from 'react-pose';
import {Spinner} from "../../../../../views/design/Spinner";


const Box = posed.div({
    hidden: { opacity: 0, scale: 0.8, transition: { duration: 500 }},
    visible: { opacity: 1, scale: 1, transition: { duration: 500 }},
});


export class Result extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            visibleSecond: false
        }
    }

    componentDidMount() {
        this.setState({visible: true})

        setTimeout(() => {
            this.setState({visible: false, visibleSecond: true})
        }, 11000)
    }

    showCards() {
        return(<ButtonContainer>
            {
                this.props.masterState.players.map(player => {
                    if(this.props.masterState.winners.length>1){
                        let printed = false;
                        for (let c = 0; c < this.props.masterState.winners.length; c++) {
                            if (this.props.masterState.winners[c].user.username == player.user.username) {
                                printed = true;
                                return (
                                    <Badge color={"primary"} badgeContent={"Draw"}>
                                        <PlayerContainer>
                                            <PlayersCard player={player} addOn = {this.props.masterState.chosenCategory}/>
                                        </PlayerContainer>
                                    </Badge>
                                )
                            }
                        }
                        if(!printed){
                            return (
                                <PlayerContainer>
                                    <PlayersCard player={player} addOn = {this.props.masterState.chosenCategory}/>
                                </PlayerContainer>
                            );
                        }
                    }else{
                    if(this.props.masterState.winners[0].user.id === player.user.id){
                        return (
                            <Badge color={"secondary"} badgeContent={'Winner'}>
                            <PlayerContainer>
                                <PlayersCard player={player} addOn = {this.props.masterState.chosenCategory}/>
                            </PlayerContainer>
                            </Badge>
                        )
                    }
                    else{
                        if (!player.deck.empty) {
                            return(
                                <PlayerContainer>
                                    <PlayersCard player={player} addOn = {this.props.masterState.chosenCategory}/>
                                </PlayerContainer>
                            )
                        }

                    }}


                })
            }
        </ButtonContainer>);
    }

    showLeaderboard() {
        let steps = ['Category selection', 'Evolve Pokémon', 'Results'];

        if(this.props.masterState.amITurnPlayer){
            steps[0] = 'Select category';
        }
        return (<SimpleColumnContainer width={'280px'} sideMargin={'0px'} style={{marginLeft: '10px'}}>
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

                <Stepper alternativeLabel activeStep={2} connector={<ColorlibConnector />} style={{ backgroundColor: "transparent" }} style={{padding: '0px', margin: '0px', marginTop: '25px', marginBottom: '25px', background: 'transparent', width: '280px'}}>
                    {steps.map((label) => (
                        <Step key={label} >
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>


                {BerriesIconWithBadge(this.props.masterState.berries)}
                <LogOutButton
                    width = "50%"
                    disabled={this.props.masterState.amITurnPlayer}
                    onClick={() => { if (window.confirm('Are you sure you want to leave the game?')) this.props.history.push('/menu') }} > Give Up
                </LogOutButton>

            </SimpleColumnContainer>
        );
    }


    myCards() {
        if (this.props.masterState.winners.length == 1) {
            if (this.props.masterState.winners[0].user.id == localStorage.getItem('id')) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }


    draw() {
        if (this.props.masterState.winners.length == 1) {
            return false;
        }
        else {
            return true;
        }
    }

    render() {
        let winnersUsername = this.props.masterState.winners[0].user.username == this.props.masterState.player_me.user.username ? 'Your Card' : this.props.masterState.winners[0].user.username;
        return (
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                style={{marginTop: '50px'}}
            >
                {this.showLeaderboard()}
                <FlippedCardResultOur our = {this.draw() || this.myCards()}  front = {
                    FocusedPokemonCard(this.props.masterState.deck.cards[0], true, this.props.masterState.chosenCategory, 'Your Card', null ,false, true)
                }/>
                <div>
                    <Box className="box" pose={this.state.visibleSecond ? 'visible' : 'hidden'}>
                        
                        <Spinner/>
                    </Box>
                    <Box className="box" pose={this.state.visible ? 'visible' : 'hidden'}>{this.showCards()}</Box>
                </div>


                <FlippedCardResult our = {this.myCards()} front = {
                    <SimpleColumnContainer align='left'>
                        <AmountOfBerries width={'50px'} style={{
                            marginBottom: '-45px',
                            marginLeft: '-5px',
                            paddingLeft: '10px',
                            background: this.props.masterState.winners.length >1 ?'radial-gradient(174.31% 329.79% at -6.61% -61.9%, #00D1FF 0%, rgba(255, 255, 255, 0) 100%), #5259FF': 'linear-gradient(227.89deg, #F53E28 1.67%, rgba(255, 255, 255, 0) 322.73%), #FCE93A',
                            zIndex: '100'}} >
                            {this.props.masterState.winners.length >1 ? <DrawIcon/> : <WinnerIcon/> }
                        </AmountOfBerries>
                        {FocusedPokemonCard((this.props.masterState.winners[0]).deck.cards[0], true, this.props.masterState.chosenCategory, winnersUsername, null ,true, localStorage.getItem('playedSound')=='true' ? true : this.props.masterState.mute , localStorage.getItem('SFXVol')/100) }
                    </SimpleColumnContainer>
                }/>


            </Grid>

        );
    }

};