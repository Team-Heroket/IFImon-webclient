import React from 'react';
import styled from 'styled-components';
import {
    BaseContainer,
    ButtonContainer,
    FormContainer, HorizontalButtonContainer,
    InnerContainerPokedex, PokedexContainer,
    SimpleContainer
} from '../../../helpers/layout';
import { api, handleError } from '../../../helpers/api';
import { withRouter } from 'react-router-dom';
import {
    LogOutButton,
    MenuButtonIcon, DotButton, PokedexGenerationButton, PageButton,
} from '../../../views/design/Button';
import Header from "../../../views/Header";
import {EncounteredPokemonSprite, ForwardIcon, NewPokemonSprite, NextIcon} from "../../../views/design/Icons";
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
        VII: [722, 809],
        VIII: [810,894]
    }

    constructor() {
        super();
        if(!localStorage.getItem('SFXVol')){
            console.log('entered SFXVOL non existing')
            localStorage.setItem('SFXVol', 33);
            localStorage.setItem('MusicVol', 25);
            localStorage.setItem('VolumeMuted', 'false')
        }
        this.state = {
            pokeCode: "asdasas",
            amountOfPlayers: 6,
            amountOfNPC: 0,
            user: null,
            step: 0,
            generation: this.genPokemon.I,
            justInitialized: false
        };
    }

    async componentDidMount(){
        if (localStorage.getItem('justLoggedIn') == 'true') {
            this.setState({justInitialized: true});
            setTimeout(() => {
                this.setState({justInitialized: false})
            }, 3000)
        }

        localStorage.setItem('justLoggedIn', 'false');
        try {
            const resp = await api.get('/users/'+localStorage.getItem('id'), { headers: {'Token': localStorage.getItem('token')}});

            let response = resp.data;
            await this.setState({user: response,
                avatarClicked: response.avatarId});

        }
        catch (error) {
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

    nextPage(){
        let temp = this.state.step;
                if(this.state.generation[1]>(this.state.generation[0]+24*(this.state.step+1)+1)){
                    this.setState({step: temp+1});
                }else{
                    this.setState({step: 0,
                    generation: this.getGeneration(true)});
                }
    };

    previousPage(){
        let temp = this.state.step;
        if(this.state.step > 0){
            this.setState({step: temp-1});
        }else{
            let next = this.getGeneration(false);
            this.setState({
                step: Math.ceil((next[1]-next[0])/25),
                generation: next});
        }
    };

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
                    return this.genPokemon.VIII
                }
                else return this.genPokemon.VI

            case(this.genPokemon.VIII):
                if(stepSize){
                    return this.genPokemon.VIII
                }
                else return this.genPokemon.VII


        }
    }

    SpritesGenerator () {
        let windowButtons = [];
        let pokemon_list = [];
        let amountDisplayed = 24;
        if(this.state.user.statistics.encounteredPokemon.length!=0){
            let start = this.state.generation[0]+this.state.step*(amountDisplayed)+(this.state.step == 0 ? 0 : 1);
            let end = Math.min(this.state.generation[0]+(this.state.step+1)*amountDisplayed+(this.state.step == 0 ? 0 : 1), this.state.generation[1])
            for(let i = start; i<=end ; i++){
                if(this.state.user.statistics.encounteredPokemon.includes(i)){
                    pokemon_list.push(
                        <EncounteredPokemonSprite alt="avatar" src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+i+'.png'} size={"92px"} index = {i}/>
                    )
                }
                else{
                    pokemon_list.push(
                        <NewPokemonSprite src={require('../../shared/images/pokemonTypesSVG/unknown.svg')} size={"92px"} index = {i}/>
                    )

                }
            }
            for(let stepCounter = 0; this.state.generation[0]+(stepCounter)*amountDisplayed+(stepCounter == 0 ? 0 : 1) < this.state.generation[1]; stepCounter++) {
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
                <PageButton disabled={this.state.step==3 && this.state.generation == this.genPokemon.VIII} alignment={'right'} onClick={()=>this.nextPage()}>
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

    generationTabs() {
        return (<HorizontalButtonContainer align={'top'}>
            {Object.keys(this.genPokemon).map((key,index) => {
                return (
                    <PokedexGenerationButton gen={key} width={500/8} margin={"0px"} disabled={this.state.generation == (this.genPokemon[key])} onClick={() => {
                        this.goToGeneration(this.genPokemon[key])
                    }}>
                        {key}
                    </PokedexGenerationButton>
                );
            })}
        </HorizontalButtonContainer>)

    }

    goToGeneration(newGeneration){
        this.setState({step: 0})
        this.setState({generation: (newGeneration)})
    }

    goToStep(newStep) {
        this.setState({step: (newStep)} )
    }

    render() {
        return (
            <BaseContainer>
                {console.log(localStorage.getItem('token'))}
                {console.log(localStorage.getItem('id'))}
                <Header height={140} top={33}/>
                {this.state.justInitialized ? <RandomPokemonFact/>
                    :

                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
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
                            {
                                this.state.user ? this.SpritesGenerator() : <Spinner/>
                            }
                        </div>
                    </Grid>
                }

            </BaseContainer>
        );
    }
}

export default withRouter(MainMenu);