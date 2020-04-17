import React from "react";
import styled from "styled-components";
import {LeaderboardIcon, QuickplayIcon, SettingsIcon, SocialIcon} from "./Icons";

const Statistics = styled.button`
  width: 230px;
  height: 30px;
  
  margin-bottom:2px;
  
  border: 1px solid ${props => props.color};
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

const StatValue = styled.div`

position: relative;
left: 20%;

width: 20%;

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

const CardContainer = styled.div`
  position: relative;
  width: 315px;
  height: 440px;
  background: ${props => props.color};
  border-radius: 25px;
  overflow: hidden;
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
    width: 45px;
    height: 45px;
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

let PokemonFormatter = ({pokemon}) => {
    let result = {}
    let element = (pokemon.elements[0]).toLowerCase()
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

    };

}
export let PokemonCard = (pokemon, disabled) => {
    let formattedPokemon = {}
    formattedPokemon = PokemonFormatter({pokemon});
    return (
        <CardContainer color={formattedPokemon.mainColor}>
            <CircleContainer color={formattedPokemon.secondaryColor}>
                <PokemonImageContainer src={pokemon.spriteURL} />
            </CircleContainer>
            <Rectangle>
                <InternalContainer>
                    <PokemonName reversed={formattedPokemon.inverted}>
                        {pokemon.name}
                    </PokemonName>
                    <Statistics color={formattedPokemon.mainColor} disabled={disabled} onClick={() => localStorage.setItem('SelectedCat','ATK')}>
                        <StatName>Attack</StatName>
                        <StatValue>{pokemon.categories.ATK}</StatValue>
                    </Statistics>
                    <Statistics color={formattedPokemon.mainColor} disabled={disabled} onClick={() => localStorage.setItem('SelectedCat','DEF')}>
                        <StatName>Defense</StatName>
                        <StatValue>{pokemon.categories.DEF}</StatValue>
                    </Statistics>
                    <Statistics color={formattedPokemon.mainColor} disabled={disabled} onClick={() => localStorage.setItem("SelectedCat",'SPEED')}>
                        <StatName>Speed</StatName>
                        <StatValue>{pokemon.categories.SPEED}</StatValue>
                    </Statistics>
                    <Statistics color={formattedPokemon.mainColor} disabled={disabled} onClick={() => localStorage.setItem("SelectedCat",'CAPTURE_RATING')}>
                        <StatName>Capture rate</StatName>
                        <StatValue>{pokemon.categories.CAPTURE_RATING}</StatValue>
                    </Statistics>
                    <Statistics color={formattedPokemon.mainColor} disabled={disabled} onClick={() => localStorage.setItem("SelectedCat",'HP')}>
                        <StatName>HP</StatName>
                        <StatValue>{pokemon.categories.HP}</StatValue>
                    </Statistics>
                    <Statistics color={formattedPokemon.mainColor} disabled={disabled} onClick={() => localStorage.setItem("SelectedCat",'WEIGHT')}>
                        <StatName>Weight</StatName>
                        <StatValue>{pokemon.categories.WEIGHT} kg</StatValue>
                    </Statistics>
                </InternalContainer>
            </Rectangle>
            <IconContainer>
                <PokemonType src={formattedPokemon.icon}/>
                <PokemonNumber>
                    #{pokemon.pokemonId}
                </PokemonNumber>

            </IconContainer>
        </CardContainer>

    );
};
