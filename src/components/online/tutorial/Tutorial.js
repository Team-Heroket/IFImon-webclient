import React from 'react';
import styled from 'styled-components';
import {
    BaseContainer, ButtonContainer,
    FormContainer,
    SimpleColumnContainer, SimpleRowContainer
} from '../../../helpers/layout';
import { withRouter } from 'react-router-dom';
import Header from "../../../views/Header";
import {
    AmountOfBerries,
    BackButton, BerriesIconWithBadge, ClickMeIcon, DrawIcon,
    ForwardIcon, LeaderboardIcon, MiniBerriesIcon,
    NextIcon,
    PossibleWinnerIcon, QuickplayIcon, SettingsIcon, SocialIcon, SoundButton, WinnerIcon
} from "../../../views/design/Icons";
import Grid from "@material-ui/core/Grid";
import Typewriter from 'typewriter-effect';
import {api, handleError} from "../../../helpers/api";
import {TutorialPokemonCard} from "../../../views/design/PokemonCard";
import {ActiveEvolveButton, Button, EvolveButton} from "../../../views/design/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const Title = styled.label`
  position: absolute;
  top: 200px;
 
  color: white;
  
  text-transform: uppercase;
  font-size: 30px;
  font-weight: 500;
  text-align: center;
`;

const Text = styled.label`

  line-height: 35px;
   position: relative;
 
  color: white;
  font-size: 20px;
  font-weight: 300;
  text-align: justify;
`

const GenericButton = styled.button`
background: transparent;
border: 0px;
`

export const PageButton = styled.button`
  
  &:hover {
    ${props => (props.disabled ? '' : 'transform: scale(1.2)')};
    transition: all 0.3s ease;
  }
  &:active {
    ${props => (props.disabled ? '' : props.alignment=='left'? 'transform: translateX(-10px)' : 'transform: translateX(10px)')};
    transition: all 0.3s ease;
  }
  position: relative;
  border: 0px;
  padding: 2px;
  width: ${props => (props.disabled ? "28px" : "66px")};
  height: ${props => (props.disabled ? "50px" : "118px")};
  cursor: "pointer";
  opacity: ${props => (props.disabled ? "50%" : "100%")};
  transition: all 0.5s ease;
  
  background: transparent;
  
  z-index: 6;
`


class Tutorial extends React.Component {
    constructor() {
        super();
        this.state ={
            page: 0,
            pokemonCard: [{"pokemonId":4,"categories":{"SPEED":65,"ATK":52,"HP":39,"CAPTURE_RATING":45,"WEIGHT":85,"DEF":43},"name":"Charmander","spriteURL":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png","cryURL":"https://play.pokemonshowdown.com/audio/cries/charmander.mp3","elements":["FIRE"],"evolutionNames":["Charmeleon","Charizard"]}],
            mute: localStorage.getItem('VolumeMuted'),
            mutePage3: false,
            berries: 2,
            evolveTo: 0,
            categoryClicked: false
        }
        localStorage.setItem('SelectedCat', '')
        localStorage.setItem("evolveTo", 0)
        this.loadCard()
    }

    async loadCard(){
        try {
            let pokemonList = []
            const resp = await api.get('/cards/'+4, { headers: {'Token': localStorage.getItem('token')}});
            pokemonList.push(resp.data)

            const resp2 = await api.get('/cards/'+5, { headers: {'Token': localStorage.getItem('token')}});
            pokemonList.push(resp2.data)

            const resp3 = await api.get('/cards/'+6, { headers: {'Token': localStorage.getItem('token')}});
            pokemonList.push(resp3.data)

            await this.setState({pokemonCard: pokemonList})

        }
        catch (e) {
        }
    }

    iconExplainer(icon, explainer){
        return(
            <SimpleRowContainer align='left' style={{marginBottom: '10px'}}>
                <AmountOfBerries width={'50px'} style={{ marginBottom: '50px', marginLeft: '0px',paddingLeft: '10px',marginRight: '10px', background: 'radial-gradient(174.31% 329.79% at -6.61% -61.9%, #00D1FF 0%, rgba(255, 255, 255, 0) 100%), #5259FF', zIndex: '200'}}   data-tip='Hover above the card to see more info!'> {
                    icon} </AmountOfBerries>
                <Text style={{transform: 'translate(0,-50%)', width: '350px',  lineHeight: '20px' }}> {explainer} </Text>
            </SimpleRowContainer>

        )
    }

    evolveButtons() {
        let evolutions = [];

        for (let i=0; i< this.state.pokemonCard[0].evolutionNames.length; i++) {
            evolutions.push(
                this.state.evolveTo==i+1 ?
                    <ActiveEvolveButton
                        id = {i}
                        onClick={() => {
                            this.setState({evolveTo: 0, mute: true});
                            this.forceUpdate()}}
                        disabled={false}
                    >
                        {this.state.pokemonCard[0].evolutionNames[i]} Cost: {i+1}
                    </ActiveEvolveButton>
                    :
                    <EvolveButton
                        id = {i}
                        onClick={() => {
                            this.setState({evolveTo: i+1, mute: true});
                            this.forceUpdate()}}
                        disabled={false}
                    >
                        {this.state.pokemonCard[0].evolutionNames[i]} Cost: {i+1}
                    </EvolveButton>
            )
        }

        return evolutions;
    }

    async goToMainMenu(){

        try {

            await api.put('/users/'+localStorage.getItem('id'), {seenTutorial: true}, { headers: {'Token': localStorage.getItem('token')}});

        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }

        this.props.history.push('/menu/')
    }

    render() {
        return (
            <BaseContainer>
                <Header height={140} top={33}/>
                <img src="./tutorial-assets/fyP9UYG.gif" alt="tut-pic-1" width="10%" style={{position: 'absolute', left: '5%', bottom: '10%'}}/>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                >
                    <BackButton action={() => {this.goToMainMenu()}}/>
                    { this.state.mute ?
                        <SoundButton mute={true} action={()=>{
                            localStorage.setItem('VolumeMuted', 'false');
                            this.setState({mute: false});
                            document.getElementById("MainTheme").volume = localStorage.getItem('MusicVol')/100;
                        }} />
                        :
                        <SoundButton mute={false} action={() => {
                            localStorage.setItem('VolumeMuted', 'true');
                            this.setState({mute: true});
                            document.getElementById("MainTheme").volume = 0}} />
                    }
                </Grid>
            <br/>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    style={{height: '600px'}}
                >
                    <PageButton disabled={this.state.page==0} alignment={'left'} onClick={()=> this.setState({page: this.state.page-1})}>
                        <NextIcon size={this.state.page ==0 ? '0px':'33%'}/>
                    </PageButton>
                        {this.state.page == 0 ?
                            <FormContainer width={'75%'} color={'#FFFFFF'}>
                                <Title style={{position: 'relative', top: '-100px'}}>
                                    <Typewriter
                                        options={{delay: '66'}}
                                        onInit={(typewriter) => {
                                            typewriter.typeString('Hello there ' + localStorage.getItem('username') + '!')
                                                .pauseFor(1500)
                                                .typeString('<br/> Welcome to the world of POKéMON!')
                                                .start();
                                        }}
                                    /></Title>

                                <Text style={{textAlign: 'center'}}>
                                    <Typewriter
                                        options={{delay: '60'}}
                                        onInit={(typewriter) => {
                                            typewriter.pauseFor(5000)
                                                .typeString('My name is OAK! People call me the Pokémon Prof! ')
                                                .pauseFor(500)
                                                .typeString('<br/> This world is inhabited by creatures called Pokémon!')
                                                .pauseFor(500)
                                                .typeString('<br/> For some people, Pokémon are pets. Others use them for fights.')
                                                .pauseFor(500)
                                                .typeString('<br/> Myself...')
                                                .pauseFor(500)
                                                .typeString('I study Pokémon as a profession.')
                                                .pauseFor(500)
                                                .typeString('<br/> <br/>Follow me through the next steps and you will learn how to interact with them!')
                                                .start();
                                        }}
                                    />
                                </Text>
                            </FormContainer>: null}
                        {this.state.page == 1 ?
                            <FormContainer width={'75%'} color={'#FFFFFF'}>
                                <Title>Pokémon Top Trumps Tutorial <br/> Basic rules </Title>
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="center"
                                > <Text style={{width: '60%'}}> Pokémon Top Trumps is a card game, you can play with up to 5 friends and/or bots.
                                    <br/>
                                    <br/> Every card represents a Pokémon with unique values to the stats: Attack, Defense, Speed, Capture rate, HP and Weight.
                                    <br/> When the game starts, every player is dealt between 2 to 6 random cards and an amount of berries(<MiniBerriesIcon/>) equal to the number of players participating in the game.
                                    <br/>
                                    <br/> The creator of the lobby starts as the first turn player.
                                    <br/> The turn player has 14 seconds to choose a category which he thinks has the highest value.
                                    <br/>
                                    <br/>
                                    {this.state.categoryClicked ? <Text style={{width: '60%'}}>Choose a category to continue!</Text> :
                                        <Text style={{width: '60%'}}><Text style={{fontWeight: '700'}}>Choose a category</Text> to continue!</Text>
                                    }
                                </Text>
                                    <SimpleColumnContainer align='left' style={{paddingTop: '50px'}}>
                                        <AmountOfBerries width={'50px'} style={{ marginBottom: '-45px', marginLeft: '-5px', paddingLeft: '10px', background: 'radial-gradient(174.31% 329.79% at -6.61% -61.9%, #00D1FF 0%, rgba(255, 255, 255, 0) 100%), #5259FF', zIndex: '200'}}   data-tip='Hover above the card to see more info!'> <ClickMeIcon/> </AmountOfBerries>
                                        <GenericButton
                                        onClick = {()=>this.setState({categoryClicked: true})}
                                        >
                                            {TutorialPokemonCard(this.state.pokemonCard[0], '0', localStorage.getItem('username'), () => {this.forceUpdate(); this.setState({'mute': true})}, this.state.mute)}
                                        </GenericButton>
                                    </SimpleColumnContainer>
                                </Grid>
                            </FormContainer> : null}
                        {this.state.page == 2 ?
                            <FormContainer width={'75%'} color={'#FFFFFF'} >
                                <Title style={{marginBottom: '25px'}}>Pokémon Top Trumps Tutorial <br/> Evolution rules </Title>
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="center"
                                > <Text style={{width: '40%'}}>
                                    <br/> To evolve your card, you can select one of the buttons displayed on the right. Each Button displays the Evolution name and it's cost.
                                    <br/> You currently have 2 berries, but fear not, At the start of each game you will receive as many as the number of players in the game. Once those are used up there are no new ones handed out!
                                    <br/> You have 10 seconds to decide whether to evolve or not, but be aware; once you click you cannot undo your evolution!
                                    <br/> After the time is up you will see the result page with you evolved Pokemon.
                                    <br/>
                                    {this.state.evolveTo != 0 ? <Text style={{width: '60%'}}>Evolve your Pokémon to continue!</Text> :
                                        <Text style={{width: '60%'}}><Text style={{fontWeight: '700'}}>Evolve your Pokémon</Text> to continue!</Text>
                                    }

                                </Text>
                                    <SimpleColumnContainer align='left' style={{paddingTop: '50px'}}>
                                        {BerriesIconWithBadge(this.state.berries)}

                                        <ButtonContainer>
                                            {this.state.evolveTo != 0 ? <div><ButtonContainer><CheckCircleIcon/></ButtonContainer>
                                                <ButtonContainer>Evolution submitted!</ButtonContainer></div> : <ButtonContainer>
                                                Do you want to evolve?
                                                <br/>
                                                {this.evolveButtons()}
                                            </ButtonContainer>}

                                        </ButtonContainer>

                                    </SimpleColumnContainer>
                                    <SimpleColumnContainer align='left' style={{paddingTop: '50px'}}>
                                        {TutorialPokemonCard(this.state.pokemonCard[0], '0', localStorage.getItem('username'), () => {this.forceUpdate(); this.setState({'mute': true})}, this.state.mute)}
                                    </SimpleColumnContainer>
                                </Grid>
                            </FormContainer> : null}
                        {this.state.page == 3 ?
                            <FormContainer width={'75%'} color={'#FFFFFF'} >
                                <Title style={{marginBottom: '25px'}}>Pokémon Top Trumps Tutorial <br/> Results </Title>
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="center"
                                > <Text style={{width: '30%'}}>
                                    <br/> You have evolved {this.state.pokemonCard[0].name} into {this.state.pokemonCard[this.state.evolveTo].name} and your berries count is now {this.state.berries- this.state.evolveTo} <MiniBerriesIcon/>
                                    <br/> As you can see by evolving your card some statistics have other values.
                                </Text>
                                    <SimpleColumnContainer align='left' style={{paddingTop: '50px'}}>
                                        {TutorialPokemonCard(this.state.pokemonCard[0], '0', localStorage.getItem('username'), () => {this.forceUpdate(); this.setState({'mutePage3': true})}, true)}
                                    </SimpleColumnContainer>
                                    <SimpleColumnContainer align='left' style={{paddingTop: '50px'}}>
                                        {TutorialPokemonCard(this.state.pokemonCard[0+this.state.evolveTo], '0', localStorage.getItem('username'), () => {this.forceUpdate(); this.setState({'mutePage3': true})}, this.state.mutePage3)}
                                    </SimpleColumnContainer>
                                </Grid>
                        </FormContainer> : null}
                        {this.state.page == 4 ?
                            <FormContainer width={'75%'} color={'#FFFFFF'} style={{marginTop: '0px'}}>
                                <Title>Pokémon Top Trumps Tutorial <br/> User Interface  </Title>
                                <Grid
                                    container
                                    direction="column"
                                    justify="space-between"
                                    alignItems="center"
                                >
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="flex-start"
                                >
                                    <div><Grid
                                        container
                                        direction="column"
                                        justify="space-around"
                                        alignItems="center"
                                    >
                                        <Text style={{marginBottom: '50px'}}>IN GAME ICONS</Text>
                                        {this.iconExplainer(<PossibleWinnerIcon/>, 'This icon is displayed above the probable winning card during the evolve phase of the game. This card would win if no one evolves their card')}
                                        {this.iconExplainer(<DrawIcon/>, 'This icon is displayed above a winning card during the Results phase of the game.')}
                                        {this.iconExplainer(<WinnerIcon/>, 'This icon is displayed above the winning card during the Result phase of the game.')}
                                        {this.iconExplainer(<MiniBerriesIcon width={25} transform={'translate(-20%, 0%)'}/>, 'Berries are the in game currency used to evolve Pokèmon cards.')}

                                    </Grid></div>
                                <br/>
                                    <div><Grid
                                        container
                                        direction="column"
                                        justify="space-around"
                                        alignItems="center"
                                    >

                                        <Text style={{marginBottom: '50px'}}>MENU ICONS</Text>
                                        {this.iconExplainer(<SocialIcon margin={5} width={'33px'} transform={'translate(-50px, 0%)'}/>, 'In Social mode you are able to create or join existing games')}
                                        {this.iconExplainer(<QuickplayIcon margin={5} width={'33px'} transform={'translate(-50px, 0%)'}/>, 'Quickplay generates a game with 4 players and 5 cards')}
                                        {this.iconExplainer(<LeaderboardIcon margin={5} width={'33px'} transform={'translate(-50px, 0%)'}/>, 'On the leaderboard you can compare your Stats against all other players')}
                                        {this.iconExplainer(<SettingsIcon margin={5} width={'33px'} transform={'translate(-50px, 0%)'}/>, 'In setting you can change your username, password and avatar. You can also change music and SFX volume')}

                                    </Grid></div>
                                </Grid>
                                    <Button
                                        width="25%"
                                        onClick={() => {
                                            this.goToMainMenu();
                                        }}
                                    >
                                        Go to main menu
                                    </Button>
                                </Grid>
                            </FormContainer> : null}

                    <PageButton disabled={this.state.page == 4 || (this.state.page == 2 && this.state.evolveTo == 0) || (this.state.page == 1 && localStorage.getItem('SelectedCat')=='')} alignment={'right'} onClick={()=> this.setState({page: this.state.page+1})}>
                        <ForwardIcon size={this.state.page ==4 ? '0px':'33%'}/>
                    </PageButton>
                </Grid>
            </BaseContainer>
        );
    }



}

export default withRouter(Tutorial);