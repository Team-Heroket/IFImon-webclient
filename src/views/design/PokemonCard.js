import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import {PlaceholderIcon} from "./Icons";
import {api, handleError} from "../../helpers/api";

const Statistics = styled.button`
  width: 230px;
  height: 30px;
  
  margin-bottom:2px;
  
  border: ${props => (props.toBeFocused ? "2px solid #000000" : '1px solid '+props.color)};
  background: #FFFFFF;
  border-radius: 10px;
  transition: all 0.3s ease;
  
  display: flex;
  flex-direction:row;
  
  &:hover {
    transform: ${props => (props.disabled ? "" : "translateX(1px)")};
    
    border: ${props => (props.disabled ? "" : "1px solid #FFFFFF")};
    transition: all 0.3s ease;
  }
  
  &:focus{
   border: 2px solid #000000;
   transform: ${props => (props.disabled ? "" : "translateX(-2px)")};
  }
  
  &:disabled{
    opacity: 100%;
    color: #000000
  }
  
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  
  
`;

const StatName = styled.div`

position: relative;
left: 0%;
width: 60%;

font-weight: 700;
  
font-size: 13px;
text-align: left;

`

const PlayerName = styled.div`

position: relative;
text-align: right;
top: 125px;
right: -140px;

  transform: rotate(-90deg);

font-weight: 700;
  
font-size: 50px;
color: rgba(255,255,255,0.66);

`

const StatValue = styled.div`

position: relative;
left: 15%;

width: 25%;

font-weight: 700;
  
font-size: 13px;
text-align: right;

`

const Rectangle = styled.div`

  position: absolute;
  width: 250px;
  height: 245px;
  left: 65px;
  top: 185px;
  background: rgb(255, 255, 255, 33%);
  border-radius: 25px;
  transform: rotate(-2deg);
  z-index: 5;
  

`;

const InternalContainer = styled.div`
  position: absolute;
  width: 212px;
  height: 193px;
  left: 10px;
  top: 15px;
  transform: rotate(+2deg);

`

const PokemonName = styled.div`
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 16px;
  ${props => props.reversed ? '' : 'text-shadow: -1px 0 #3D3D3D, 0 1px #3D3D3D, 1px 0 #3D3D3D, 0 -1px #3D3D3D'};
  color: ${props => props.reversed ? "#3D3D3D": "#FFFFFF"};
`

const PokemonImageContainer = styled.img`
  position: absolute;
  width: 160px;
  height: 160px;
  left: 31px;
  top: 31px;
  z-index: 4;
`

const PokemonGifContainer = styled.img`
  position: absolute;
  width: 90px;
  left: 27%;
  bottom: 23%;
  z-index: 4;
`

const CircleContainer = styled.div`
  position: absolute;
  border-radius:100%;
  width: 227px;
  height: 227px;
  left: 22px;
  top: -7px;

  background: ${props => props.color};
  z-index: 1;
`
const TutorialContainer = styled.div`
  position: relative;
  width: 315px;
  height: 440px;
  background: ${props => props.color};
  border-radius: 25px;
  z-index: 0;
`

const CardContainer = styled.div`
  position: relative;
  width: 315px;
  height: 440px;
  background: ${props => props.color};
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 4px 0px 6px rgba(0, 0, 0, 0.15);
  z-index: 0;
`

const IconContainer = styled.div`
  position: absolute;
  width: 65px;
  height: 65px;
  left: -3px;
  top: 375px;

  background: #FFFFFF;
  border-radius: 0px 25px;
    `

const PokemonType = styled.img` 
    position: relative;
    z-index: 100;  
    width: ${props => props.size ?  props.size: "45px"};
    height: ${props => props.size ?  props.size: "45px"};
    left: 55%;
    top: 55%;
    transform : translate(-55%, -57%);
`;



const PokemonNumber = styled.div`
  position: absolute;
  width: 30px;
  height: 17px;
  right: -6px
  top: 50px;

  font-weight: 500;
  font-size: 10px;

  display: flex;
  align-items: center;
  text-align: right;

  color: #000000;
`

let PokemonFormatter = (element) => {
    switch(element) {
        case('normal'):
            return {mainColor: "#BBBBBB", secondaryColor: "#A9A9A9", inverted: true, icon: require("../../components/shared/images/pokemonTypesSVG/"+element+".svg")};
        case('fire'):
            return {mainColor: "#F88321", secondaryColor: "#FFB047", inverted: false, icon: require("../../components/shared/images/pokemonTypesSVG/"+element+".svg")};
        case('water'):
            return {mainColor: "#70D3E0", secondaryColor: "#93F9EA", inverted: false, icon: require("../../components/shared/images/pokemonTypesSVG/"+element+".svg")};
        case('electric'):
            return {mainColor: "#FFBD2B", secondaryColor: "#FFF45B", inverted: true, icon: require("../../components/shared/images/pokemonTypesSVG/"+element+".svg")};
        case('grass'):
            return {mainColor: "#47C67B", secondaryColor: "#80EDAC", inverted: false, icon: require("../../components/shared/images/pokemonTypesSVG/"+element+".svg")};
        case('ice'):
            return {mainColor: "#BFFFF2", secondaryColor: "#DDFFFF", inverted: true, icon: require("../../components/shared/images/pokemonTypesSVG/"+element+".svg")};
        case('fighting'):
            return {mainColor: "#EC6363", secondaryColor: "#EE8064", inverted: false, icon: require("../../components/shared/images/pokemonTypesSVG/"+element+".svg")};
        case('poison'):
            return {mainColor: "#BD53B5", secondaryColor: "#FF4EF2", inverted: false, icon: require("../../components/shared/images/pokemonTypesSVG/"+element+".svg")};
        case('ground'):
            return {mainColor: "#BF7E68", secondaryColor: "#FF875F", inverted: false, icon: require("../../components/shared/images/pokemonTypesSVG/"+element+".svg")};
        case('flying'):
            return {mainColor: "#ade5ff", secondaryColor: "#eeffff", inverted: true, icon: require("../../components/shared/images/pokemonTypesSVG/"+element+".svg")};
        case('psychic'):
            return {mainColor: "#952BFF", secondaryColor: "#7718B0", inverted: false, icon: require("../../components/shared/images/pokemonTypesSVG/"+element+".svg")};
        case('bug'):
            return {mainColor: "#669A33", secondaryColor: "#7DB334", inverted: false, icon: require("../../components/shared/images/pokemonTypesSVG/"+element+".svg")};
        case('rock'):
            return {mainColor: "#E0E0E0", secondaryColor: "#FFFFFF", inverted: true, icon: require("../../components/shared/images/pokemonTypesSVG/"+element+".svg")};
        case('ghost'):
            return {mainColor: "#473E3E", secondaryColor: "#1d1d1d", inverted: false, icon: require("../../components/shared/images/pokemonTypesSVG/"+element+".svg")};
        case('dragon'):
            return {mainColor: "#E25036", secondaryColor: "#F2936A", inverted: false, icon: require("../../components/shared/images/pokemonTypesSVG/"+element+".svg")};
        case('dark'):
            return {mainColor: "#1C264A", secondaryColor: "#376375", inverted: false, icon: require("../../components/shared/images/pokemonTypesSVG/"+element+".svg")};
        case('steel'):
            return {mainColor: "#C3CACC", secondaryColor: "#e1f0f4", inverted: true, icon: require("../../components/shared/images/pokemonTypesSVG/"+element+".svg")};
        case('fairy'):
            return {mainColor: "#FE4365", secondaryColor: "#FF9F80", inverted: false, icon: require("../../components/shared/images/pokemonTypesSVG/"+element+".svg")};

    }

}

export let FocusedPokemonCard = (pokemon, disabled, toFocus, Trainer, parentMethod = ()=>{}, Winner, mute, volume=0, pokeCode='0') => {
    let formattedPokemon = {}
    let purge = [" ", "-"]
    let gifName = pokemon.name.toLowerCase()
    for(let i =0; i<purge.length; ++i){
        gifName = gifName.replace(purge[i], '')
    }

    async function makeTurn(category) {
        console.log('Went in here with pokeCoce: '+pokeCode)
        if (pokeCode != '0') {
            try {
                console.log("Made Turn with "+ category);
                const requestBody = JSON.stringify({
                    category: category
                });
                await api.put('/games/' + pokeCode + '/categories', requestBody, {headers: {'Token': localStorage.getItem('token')}});
            } catch (error) {
                if (error.response.status != 403) {
                    alert(`Something went wrong: \n${handleError(error)}`);
                }

            }
        }
    }
    let formattedPokemon2 = {}
    formattedPokemon = PokemonFormatter((pokemon.elements[0]).toLowerCase());
    if(pokemon.elements.length>1) {
        formattedPokemon2 = PokemonFormatter((pokemon.elements[1]).toLowerCase())
    }
        return (
            <CardContainer color={formattedPokemon.mainColor}>

                <PlayerName>{Trainer}</PlayerName>
                <CircleContainer color={pokemon.elements.length>1? formattedPokemon2.secondaryColor : formattedPokemon.secondaryColor}>
                    {Winner ?
                        <PokemonGifContainer

                            src={'https://play.pokemonshowdown.com/sprites/xyani/' + gifName + '.gif'}/>
                        :
                        <PokemonImageContainer src={pokemon.spriteURL}/>}
                </CircleContainer>
                <Rectangle>
                    <InternalContainer>
                        <PokemonName reversed={formattedPokemon.inverted}>
                            {pokemon.name}
                        </PokemonName>
                        <Statistics toBeFocused={toFocus == 'ATK'} color={formattedPokemon.mainColor}
                                    disabled={disabled} onClick={() => {
                            localStorage.setItem('SelectedCat', 'ATK');
                            makeTurn('ATK')
                            parentMethod()
                        }}>
                            <StatName>Attack</StatName>
                            <StatValue>{pokemon.categories.ATK}</StatValue>
                        </Statistics>
                        <Statistics toBeFocused={toFocus == 'DEF'} color={formattedPokemon.mainColor}
                                    disabled={disabled} onClick={() => {
                            makeTurn('DEF')
                            localStorage.setItem('SelectedCat', 'DEF');
                            parentMethod()
                        }}>
                            <StatName>Defense</StatName>
                            <StatValue>{pokemon.categories.DEF}</StatValue>
                        </Statistics>
                        <Statistics toBeFocused={toFocus == 'SPEED'} color={formattedPokemon.mainColor}
                                    disabled={disabled} onClick={() => {
                            makeTurn('SPEED')
                            localStorage.setItem("SelectedCat", 'SPEED');
                            parentMethod()
                        }}>
                            <StatName>Speed</StatName>
                            <StatValue>{pokemon.categories.SPEED}</StatValue>
                        </Statistics>
                        <Statistics toBeFocused={toFocus == 'CAPTURE_RATING'} color={formattedPokemon.mainColor}
                                    disabled={disabled} onClick={() => {
                            makeTurn('CAPTURE_RATING')
                            localStorage.setItem("SelectedCat", 'CAPTURE_RATING');
                            parentMethod()
                        }}>
                            <StatName>Spawn Rate</StatName>
                            <StatValue>{pokemon.categories.CAPTURE_RATING}</StatValue>
                        </Statistics>
                        <Statistics toBeFocused={toFocus == 'HP'} color={formattedPokemon.mainColor} disabled={disabled}
                                    onClick={() => {
                                        makeTurn('HP')
                                        localStorage.setItem("SelectedCat", 'HP');
                                        parentMethod()
                                    }}>
                            <StatName>Health</StatName>
                            <StatValue>{pokemon.categories.HP}</StatValue>
                        </Statistics>
                        <Statistics toBeFocused={toFocus == 'WEIGHT'} color={formattedPokemon.mainColor}
                                    disabled={disabled || localStorage.getItem("SelectedCat")!=0} onClick={() => {
                            makeTurn('WEIGHT')
                            localStorage.setItem("SelectedCat", 'WEIGHT');
                            parentMethod()
                        }}>
                            <StatName>Weight</StatName>
                            <StatValue>{pokemon.categories.WEIGHT.valueOf() / 10} kg</StatValue>
                        </Statistics>
                    </InternalContainer>
                </Rectangle>
                {pokemon.elements.length>1 ?
                    <IconContainer>
                        <PokemonType src={formattedPokemon.icon} size={'30px'} style={{top: '40%', left: '33%'}}/>
                        <PokemonType src={formattedPokemon2.icon} size={'30px'}style={{top: '60%', left: '33%'}}/>
                        <PokemonNumber>
                            #{pokemon.pokemonId}
                        </PokemonNumber>

                    </IconContainer>
                    :
                    <IconContainer>

                        <PokemonType src={formattedPokemon.icon}/>
                        <PokemonNumber>
                            #{pokemon.pokemonId}
                        </PokemonNumber>

                    </IconContainer>
                }
                {mute ? console.log('Mute: ' + mute) : (
                    <div style={{width: '0px', height: '0px', margin: '0px', fontSize: '0'}}>
                        <audio src={pokemon.cryURL} id="SFXaudio"/>
                        {
                            setTimeout(() => {
                                try {
                                    document.getElementById("SFXaudio").volume = volume;
                                    document.getElementById("SFXaudio").play();
                                    localStorage.setItem('playedSound', 'true');
                                } catch {
                                }
                            }, 500)}
                    </div>)
                }
            </CardContainer>
        );

};

export let TutorialPokemonCard = (pokemon, toFocus, Trainer, parentMethod = ()=>{}, mute) =>{
    try{
        toFocus = localStorage.getItem('SelectedCat')
    }catch (e) {

    }
    let formattedPokemon2 = {}
    let formattedPokemon = PokemonFormatter((pokemon.elements[0]).toLowerCase());
    if(pokemon.elements.length>1) {
        formattedPokemon2 = PokemonFormatter((pokemon.elements[1]).toLowerCase())
    }
    return (
        <TutorialContainer>
             <ReactTooltip place="right" type="dark" effect="solid" multiline={true}/>
        <CardContainer color={formattedPokemon.mainColor}>

            <PlayerName
                data-tip='Here the player`s name is visible'>
                {Trainer}</PlayerName>
            <CircleContainer color={pokemon.elements.length>1? formattedPokemon2.secondaryColor : formattedPokemon.secondaryColor}
                             data-tip='This is your Pokèmon`s sprite'>
                    <PokemonImageContainer src={pokemon.spriteURL}/>
            </CircleContainer>
            <Rectangle>
                <InternalContainer>
                    <PokemonName reversed={formattedPokemon.inverted} data-tip="This is the Pokemon's name ">
                        {pokemon.name}
                    </PokemonName>

                    <Statistics toBeFocused={toFocus == 'ATK'} color={formattedPokemon.mainColor}
                                disabled={false} onClick={() => {
                        localStorage.setItem('SelectedCat', 'ATK');
                        parentMethod();
                                }}

                                data-tip='Attack ranges from 0 to 150 with some exceptions <br /> Evolving usually increases this value'>
                        <StatName>Attack</StatName>
                        <StatValue>{pokemon.categories.ATK}</StatValue>
                    </Statistics>
                    <Statistics toBeFocused={toFocus == 'DEF'} color={formattedPokemon.mainColor}
                                disabled={false} onClick={() => {
                        localStorage.setItem('SelectedCat', 'DEF');
                        parentMethod();
                    }}
                                data-tip='Defense ranges from 0 to 150 with some exceptions <br /> Evolving usually increases this value'>
                        <StatName>Defense</StatName>
                        <StatValue>{pokemon.categories.DEF}</StatValue>
                    </Statistics>
                    <Statistics toBeFocused={toFocus == 'SPEED'} color={formattedPokemon.mainColor}
                                disabled={false} onClick={() => {
                        localStorage.setItem("SelectedCat", 'SPEED');
                        parentMethod();
                    }}
                                data-tip='Speed ranges from 0 to 150 with some exceptions <br /> Evolving usually increases this value'>
                        <StatName>Speed</StatName>
                        <StatValue>{pokemon.categories.SPEED}</StatValue>
                    </Statistics>
                    <Statistics toBeFocused={toFocus == 'CAPTURE_RATING'} color={formattedPokemon.mainColor}
                                disabled={false} onClick={() => {
                        localStorage.setItem("SelectedCat", 'CAPTURE_RATING');
                        parentMethod();
                    }}
                                data-tip='Spawn Rate ranges from 0 to 255 <br /> Evolving usually decreases this value'>
                        <StatName>Spawn Rate</StatName>
                        <StatValue>{pokemon.categories.CAPTURE_RATING}</StatValue>
                    </Statistics>
                    <Statistics toBeFocused={toFocus == 'HP'} color={formattedPokemon.mainColor} disabled={false}
                                onClick={() => {
                                    localStorage.setItem("SelectedCat", 'HP');
                                    parentMethod();
                                }}
                                data-tip='Health ranges from 0 to 150 with some exceptions <br /> Evolving usually increases this value'>
                        <StatName>Health</StatName>
                        <StatValue>{pokemon.categories.HP}</StatValue>
                    </Statistics>
                    <Statistics toBeFocused={toFocus == 'WEIGHT'} color={formattedPokemon.mainColor}
                                disabled={false} onClick={() => {
                        localStorage.setItem("SelectedCat", 'WEIGHT');
                        parentMethod();
                    }}
                                data-tip='Weight ranges from 0 to 500kg with some exceptions <br /> Evolving usually increases this value'>
                        <StatName>Weight</StatName>
                        <StatValue>{pokemon.categories.WEIGHT.valueOf() / 10} kg</StatValue>
                    </Statistics>
                </InternalContainer>
            </Rectangle>
            {pokemon.elements.length>1 ?
                <IconContainer
                    data-tip='This is the Pokemon`s type <br /> there are 18 types and Pokemon can have up to 2 types<br /> Evolving usually doesnt change this value'>
                    <PokemonType src={formattedPokemon.icon} size={'30px'} style={{top: '40%', left: '33%'}}/>
                    <PokemonType src={formattedPokemon2.icon} size={'30px'}style={{top: '60%', left: '33%'}}/>
                    <PokemonNumber>
                        #{pokemon.pokemonId}
                    </PokemonNumber>

                </IconContainer>
                :
                <IconContainer
                    data-tip='This is the Pokemon`s type <br /> There are 18 types and Pokemon can have up to 2 types<br /> Evolving usually doesnt change this value <br /> Each Pokemon has a unique id which starts with a #' >

                    <PokemonType src={formattedPokemon.icon}/>
                    <PokemonNumber>
                        #{pokemon.pokemonId}
                    </PokemonNumber>

                </IconContainer>
            }
            {mute ? null :
                <div style={{width: '0px', height: '0px', margin: '0px', fontSize: '0'}}>
                    <audio src={pokemon.cryURL} id="SFXaudio"/>
                    {
                        setTimeout(() => {
                            try {
                                console.log(pokemon.cryURL)
                                document.getElementById("SFXaudio").volume = 0.33;
                                document.getElementById("SFXaudio").play();
                                localStorage.setItem('playedSound', 'true');
                            } catch {
                            }
                        }, 750)}
                </div>
            }
        </CardContainer>
        </TutorialContainer>
    );
}

const PokeballContainer = styled.div`
position: absolute;
left:6%;
top: 23%;
`

export let PlaceholderCard = () => {
    return (
        <CardContainer color={"linear-gradient(198.22deg, #F53E28 0.61%, rgba(255, 255, 255, 0) 189.48%), #FCE93A"}>
            <PokeballContainer>
                <PlaceholderIcon/>
            </PokeballContainer>
        </CardContainer>
    );
};
