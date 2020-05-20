import React from 'react';
import styled from 'styled-components';
import {
    BaseContainer,
    ButtonContainer,
    FormContainer, HorizontalButtonContainer,
    InnerContainerPokedex, PokedexContainer, SimpleColumnContainer,
    SimpleContainer
} from '../../../helpers/layout';

import {FocusedPokemonCard} from "../../../views/design/PokemonCard";

import { PopupboxManager, PopupboxContainer } from 'react-popupbox';
import "react-popupbox/dist/react-popupbox.css"

import { api, handleError } from '../../../helpers/api';
import { withRouter } from 'react-router-dom';
import {
    LogOutButton,
    MenuButtonIcon, DotButton, PokedexGenerationButton, PageButton, TransparentButton,
} from '../../../views/design/Button';
import Header from "../../../views/Header";
import {EncounteredPokemonSprite, ForwardIcon, PokemonSprite, NextIcon} from "../../../views/design/Icons";
import {Spinner} from "../../../views/design/Spinner";
import Grid from "@material-ui/core/Grid";
import {RandomPokemonFact} from "./RandomPokemonFact";

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  transition: opacity 0.5s ease, transform 0.5s ease;
`;



class MainMenu extends React.Component {

    genPokemon = {
        I: [1,151],
        II: [152,251],
        III: [252,386],
        IV: [387,493],
        V: [494, 649],
        VI: [650, 721],
        VII: [722, 802]
    }

    /**
     * If a user enters the main menu for the first time the volume settings are set in the localstorage
     * all the needed states are then initialized
     */
    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
        if(!localStorage.getItem('SFXVol')){
            console.log('entered SFXVOL non existing')
            localStorage.setItem('SFXVol', 33);
            localStorage.setItem('MusicVol', 25);
            localStorage.setItem('VolumeMuted', 'false')
        }
        this.state = {
            pokeCode: "asdasas",
            displayPokemon: null,
            amountOfPlayers: 6,
            amountOfNPC: 0,
            user: null,
            step: 0,
            generation: this.genPokemon.I,
            justInitialized: false,
            showGif: false
        };
    }

    /**
     * When a player enters the main menu after registering the main pokemon theme starts to play.
     */
    playTheme(){

        try{
            let sound = document.getElementById('MainTheme');
            console.log('This is the volume '+sound.volume+ ' and is paused '+sound.paused)

            if(localStorage.getItem('VolumeMuted') != 'true' &&( sound.volume != localStorage.getItem('MusicVol')/100 || sound.paused)) {
                sound.play()

                // Set the point in playback that fadeout begins. This is for a 2 second fade out.
                let fadePoint = sound.currentTime + 2;
                sound.volume = 0.1;


                var fadeAudio = setInterval(function () {

                    // Only fade if past the fade out point or not at zero already
                    if ((sound.currentTime >= fadePoint) && (sound.volume != 0.0)) {
                        sound.volume += 0.05;
                    }
                    // When volume at zero stop all the intervalling
                    if (sound.volume >= localStorage.getItem('MusicVol') / 100) {
                        sound.volume = localStorage.getItem('MusicVol') / 100
                        clearInterval(fadeAudio);
                    }
                }, 200);
            }

        }catch (e) {}
    }

    async componentDidUpdate(){
        this.playTheme()
    }

    /**
     * Checks if the user is new and if so it sends him to the tutorial
     */
    async componentDidMount(){

        this.playTheme()
        if (localStorage.getItem('justLoggedIn') == 'true') {
            this.setState({justInitialized: true});
            setTimeout(() => {
                this.setState({justInitialized: false})
            }, 4000)
        }

        localStorage.setItem('justLoggedIn', 'false');
        try {
            const resp = await api.get('/users/'+localStorage.getItem('id'), { headers: {'Token': localStorage.getItem('token')}});

            let response = resp.data;
            if(!response.seenTutorial){
                this.props.history.push('/tutorial')
            }
            await this.setState({user: response,
                avatarClicked: response.avatarId});

        }
        catch (error) {
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

        }
    }

    goToSettings() {
        this.props.history.push('/settings/'+localStorage.getItem('id'))
    }

    goToQuickplay() {
        this.props.history.push('/quickplay')
    }

    goToLeaderBoard() {
        this.props.history.push('/leaderboards')
    }

    goToSocialMode() {
        this.props.history.push('/socialmode')
    }

    goToTutorial() {
        this.props.history.push('/tutorial')
    }

    async logOut(){
        try {
            console.log('tried to logOut')
            document.getElementById('MainTheme').pause()
            document.getElementById('MainTheme').currentTime=0
            const body = JSON.stringify({});
            let token = localStorage.getItem('token');
            localStorage.removeItem('token');
            localStorage.removeItem('id');

            await api.put('/logout', body , { headers: {'Token': token}});
            this.props.history.push('/login')
            // Get the returned user and update a new object.



        } catch (error) {
            if (error.response.status == 401) {
                this.props.history.push('/login')
            }
            else {
                alert(`Something went wrong: \n${handleError(error)}`);
            }

        }
    }

    /**
     * Updates the Pokedex in order to display the next page of pokemon of that generation or the first of the next generation
     */
    nextPage(){
        let temp = this.state.step;
                if(this.state.generation[1]>(this.state.generation[0]+24*(this.state.step+1)+this.state.step)){
                    this.setState({step: temp+1});
                }else{
                    this.setState({step: 0,
                    generation: this.getGeneration(true)});
                }
    };

    /**
     * Updates the Pokedex in order to display the previous page of pokemon of that generation or the first of the previous generation
     */
    previousPage(){
        let temp = this.state.step;
        if(this.state.step > 0){
            this.setState({step: temp-1});
        }else{
            let next = this.getGeneration(false);
            this.setState({
                step: Math.floor((next[1]-next[0])/24),
                generation: next});
        }
    };

    /**
     * Returns the previous or next generation of the current displayed generation depending on the stepSize
     *
     * @param stepSize bool where true indicate the current+1 generation otherwise current-1 generation
     */
    getGeneration(stepSize){
        switch (this.state.generation) {
            case(this.genPokemon.I):
                if(stepSize){
                    return this.genPokemon.II
                }
                else return this.genPokemon.I

            case(this.genPokemon.II):
                if(stepSize){
                    return this.genPokemon.III
                }
                else return this.genPokemon.I

            case(this.genPokemon.III):
                if(stepSize){
                    return this.genPokemon.IV
                }
                else return this.genPokemon.II

            case(this.genPokemon.IV):
                if(stepSize){
                    return this.genPokemon.V
                }
                else return this.genPokemon.III

            case(this.genPokemon.V):
                if(stepSize){
                    return this.genPokemon.VI
                }
                else return this.genPokemon.IV

            case(this.genPokemon.VI):
                if(stepSize){
                    return this.genPokemon.VII
                }
                else return this.genPokemon.V

            case(this.genPokemon.VII):
                if(stepSize){
                    return this.genPokemon.VII
                }
                else return this.genPokemon.VI
        }
    }

    /**
     * Handles the pokedex click events, when a pokemon is clicked a popup box containing the respective card is displayed
     *
     */
    async handleClick(event) {
        console.log('Previous val: '+this.state.displayPokemon);
        console.log("Clicked Pokemon: "+event.currentTarget.id);

        try {
            const resp = await api.get('/cards/'+event.currentTarget.id, { headers: {'Token': localStorage.getItem('token')}});
            let response = resp.data;
            await this.setState({displayPokemon: response});

        }
        catch (e) {
        }
        let content = <SimpleColumnContainer>
            {this.state.displayPokemon ? FocusedPokemonCard(this.state.displayPokemon, true, '0', '', null, this.state.showGif,localStorage.getItem('VolumeMuted')=='true', localStorage.getItem('SFXVol')/100) : <Spinner/>}
            <TransparentButton onClick={()=>{this.updatePopupbox(true)}}> {this.state.showGif? 'Show image' : 'Show GIF'} </TransparentButton>
        </SimpleColumnContainer>

            PopupboxManager.open({
                content,
                config: {
                    titleBar: {
                        enable: true,
                        text: this.state.displayPokemon.name
                    },
                    fadeIn: true,
                    fadeInSpeed: 500,
                    fadeOut: true,
                    fadeOutSpeed: 250
                }
            })

    }

    /**
     * Updates the popup box either in order to display the gif animation of the pokemon or the image.
     *
     * @param showGif bool updates the show animation state and if true it displays the gif animation otherwise the static image
     */
    updatePopupbox(showGif) {
        this.setState({showGif: showGif})
        const content = <SimpleColumnContainer>
            {this.state.displayPokemon ? FocusedPokemonCard(this.state.displayPokemon, true, '0', '', null, showGif,localStorage.getItem('VolumeMuted')=='true', localStorage.getItem('SFXVol')/100) : <Spinner/>}
            <TransparentButton onClick={()=>{this.updatePopupbox(!showGif)}}> {showGif? 'Show image' : 'Show GIF'} </TransparentButton>
        </SimpleColumnContainer>

        PopupboxManager.update({
            content,
            config: {
                titleBar: {
                    enable: true,
                    text: this.state.displayPokemon.name
                },
                fadeIn: true,
                fadeInSpeed: 500,
                fadeOut: true,
                fadeOutSpeed: 250
            }
        })
    }

    /**
     * Returns a container containing all the encountered pokemon's sprite if a pokemon is not encontered then a question mark is displayed
     * it also contains the left/right arrow and buttons
     */
    SpritesGenerator () {
        let windowButtons = [];
        let pokemon_list = [];
        let amountDisplayed = 24;
        if(this.state.user.statistics.encounteredPokemon.length!=0){
            let start = this.state.generation[0]+this.state.step*(amountDisplayed)+(this.state.step);
            let end = Math.min(this.state.generation[0]+(this.state.step+1)*(amountDisplayed)+(this.state.step ), this.state.generation[1])
            for(let i = start; i<=end ; i++){
                if(this.state.user.statistics.encounteredPokemon.includes(i)){
                    pokemon_list.push(
                        <EncounteredPokemonSprite size={"92px"} id={i} onClick={this.handleClick}>
                            <PokemonSprite alt="avatar" src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+i+'.png'} size={"92px"} index = {i}/>
                        </EncounteredPokemonSprite>
                        )
                }
                else{
                    pokemon_list.push(
                        <PokemonSprite src={require('../../shared/images/pokemonTypesSVG/unknown.svg')} size={"92px"} index = {i}/>

                    )

                }
            }
            for(let stepCounter = 0; this.state.generation[0]+(stepCounter)*(amountDisplayed)+stepCounter-1 < this.state.generation[1]; stepCounter++) {
                windowButtons.push(
                    <DotButton width={'9px'} disabled={this.state.step == stepCounter} onClick={() => {
                        this.goToStep(stepCounter)
                    }}/>
                )
            }
        }
        else{
            return(
                <PokedexContainer height={'500px'} width={'500px'}>
                    <SimpleContainer heigth={500} color={'#FFFFFF'} >
                        Your Pokèdex will start working after your first game!
                    </SimpleContainer>
                </PokedexContainer>
            )
        }
        return(
            <PokedexContainer height={'550px'} width={'500px'} margin={"0px"} onScroll={this.handleScroll}>
                {this.generationTabs()}
                <PageButton disabled={this.state.step==0 && this.state.generation == this.genPokemon.I} alignment={'left'} onClick={()=>this.previousPage()}>
                    <NextIcon size={'33%'}/>
                </PageButton>
                <PageButton disabled={this.state.step==3 && this.state.generation == this.genPokemon.VII} alignment={'right'} onClick={()=>this.nextPage()}>
                    <ForwardIcon size={'33%'}/>
                </PageButton>
                <InnerContainerPokedex>
                    {pokemon_list}
                </InnerContainerPokedex>
                <HorizontalButtonContainer align={'bottom'}>
                    {windowButtons}
                </HorizontalButtonContainer>
            </PokedexContainer>)
    }

    /**
     * Returns an empty pokedex with a text informing the user that he has to play before being able to see the pokemons.
     *
     */
    emptyPokedex() {
        return(
            <PokedexContainer height={'550px'} width={'500px'} margin={"0px"}>
                <SimpleContainer heigth={500} color={'#FFFFFF'} >
                    Your Pokèdex will start working after your first game!
                </SimpleContainer>
            </PokedexContainer>
        )
    }

    /**
     * Returns a container which contains the buttons that display the amount of pages in the current generation
     */
    generationTabs() {
        return (<HorizontalButtonContainer align={'top'}>
            {Object.keys(this.genPokemon).map((key,index) => {
                return (
                    <PokedexGenerationButton gen={key} width={500/7} margin={"0px"} disabled={this.state.generation == (this.genPokemon[key])} onClick={() => {
                        this.goToGeneration(this.genPokemon[key])
                    }}>
                        {key}
                    </PokedexGenerationButton>
                );
            })}
        </HorizontalButtonContainer>)

    }

    /**
     * handles the event that a user clickes a generation button
     */
    goToGeneration(newGeneration){
        this.setState({step: 0})
        this.setState({generation: (newGeneration)})
    }

    /**
     * handles the event that a user clickes a page button
     */
    goToStep(newStep) {
        this.setState({step: (newStep)} )
    }

    render() {
        return (
            <BaseContainer>
                {console.log(localStorage.getItem('token'))}
                {console.log(localStorage.getItem('id'))}
                <Header height={140} top={33}/>
                {this.state.justInitialized ?
                    <div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <RandomPokemonFact/>
                        <Spinner/>
                    </div>

                    :

                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        style={{marginTop: '50px'}}
                    >
                        <FormContainer width={'500px'}>
                            <Form>

                                <ButtonContainer>

                                    <MenuButtonIcon type={{text: "social mode"}}
                                                    onClicktoDo={() => {
                                                        this.goToSocialMode()
                                                    }}
                                    />
                                    <MenuButtonIcon type={{text: "quickplay"}}
                                                    onClicktoDo={() => {
                                                        this.goToQuickplay()
                                                    }}
                                    />
                                    <MenuButtonIcon type={{text: "leaderboard"}}
                                                    onClicktoDo={() => {
                                                        this.goToLeaderBoard()
                                                    }}
                                    />
                                    <MenuButtonIcon type={{text: "settings"}}
                                                    onClicktoDo={() => {
                                                        this.goToSettings()
                                                    }}
                                    />
                                    <MenuButtonIcon type={{text: "tutorial"}}
                                                    onClicktoDo={() => {
                                                        this.goToTutorial()
                                                    }}
                                    />

                                    <LogOutButton
                                        width="50%"
                                        onClick={() => {
                                            this.logOut()
                                        }}
                                    >
                                        Log Out
                                    </LogOutButton>
                                </ButtonContainer>

                            </Form>
                        </FormContainer>
                        <div><br/><br/>
                            <PopupboxContainer style={{color: '#FFFFFF', background: 'transparent', justifyContent: 'center', alignContent: 'center', boxShadow: '0px 0px 0px -200px rgba(0,0,0,0)'}}/>
                            {
                                this.state.user ? this.SpritesGenerator() : this.emptyPokedex()
                            }
                        </div>
                    </Grid>
                }

            </BaseContainer>
        );
    }

}

export default withRouter(MainMenu);