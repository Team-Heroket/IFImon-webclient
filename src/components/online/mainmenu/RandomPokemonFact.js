import React from "react";
import styled from "styled-components";
import {ButtonContainer} from "../../../helpers/layout";
import {Spinner} from "../../../views/design/Spinner";


const PokemonGifContainer = styled.img`
  width: 90px;
  left: 27%;
  bottom: 23%;
`

const LabelBottom = styled.label`
  position: relative;
  width: 400px;
 
  color: white;
  
  margin-bottom: 50px;
  font-size: 20px;
  font-weight: 300;
  text-align: center;
`;

const LabelTop = styled.label`
  position: relative;
  width: 400px;
 
  color: white;
  
  margin-bottom: 50px;
  font-size: 30px;
  font-weight: 300;
  text-align: center;
`;
const Space = styled.div`
  margin-bottom: 80px
  width: 100%
`;

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


export let RandomPokemonFact = () =>{

    let fact_1 = {fact: 'Rhydon was the first Pokemon ever created', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/rhydon.gif']}
    let fact_2 = {fact: 'Pikachu\'s name is Japanese onomatopoeia for sparkle and squeaking', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/pikachu-alola.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu-belle.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-cosplay.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu-gmax.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-hoenn.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu-kalos.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-libre.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu-original.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-phd.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu-pop-star.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-rockstar.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu.gif']}
    let fact_3 = {fact: 'Drowzee is based off of a tapir', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/drowzee.gif']}
    let fact_4 = {fact: 'Azurill is the only Pokemon that can change gender', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/azurill.gif']}
    let fact_5 = {fact: 'Psychic type Pokemon are weak to bug, ghost, and dark type because they\'re common fears', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/raichu.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/raichu-alola.gif', 'https://play.pokemonshowdown.com/sprites/xyani/mrmime-galar.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/mrmime.gif', 'https://play.pokemonshowdown.com/sprites/xyani/jynx.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/hypno.gif', 'https://play.pokemonshowdown.com/sprites/xyani/kadabra.gif']}
    let fact_6 = {fact: 'Rock types could still beat a Pokemon with all 18 types', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/geodude.gif',
        'http://play.pokemonshowdown.com/sprites/ani/geodude-alola.gif', 'http://play.pokemonshowdown.com/sprites/ani/onix.gif',
        'http://play.pokemonshowdown.com/sprites/ani/aerodactyl.gif', 'http://play.pokemonshowdown.com/sprites/ani/aerodactyl-mega.gif',
        'http://play.pokemonshowdown.com/sprites/ani/rhydon.gif']}
    let fact_7 = {fact: 'Xatu sees both past and future at the same time', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/xatu.gif']}
    let fact_8 = {fact: 'Slowbro is the only Pokemon that can devolve', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/slowbro.gif',
        'http://play.pokemonshowdown.com/sprites/ani/slowbro-mega.gif']}
    let fact_9 = {fact: 'Slowpoke is considered a delicacy', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/slowpoke.gif',
        'http://play.pokemonshowdown.com/sprites/ani/slowpoke-galar.gif']}
    let fact_10 = {fact: 'Many Pokemon names include numbers', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/articuno.gif',
        'http://play.pokemonshowdown.com/sprites/ani/zapdos.gif', 'http://play.pokemonshowdown.com/sprites/ani/moltres.gif']}
    let fact_11 = {fact: 'Cubone wears the skull of his dead mother', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/cubone.gif']}
    let fact_12 = {fact: 'Poliwag\'s swirl is based on tadpoles intestines', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/poliwag.gif']}
    let fact_13 = {fact: 'Pokemon is short for "Pocket Monster"\n', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/pikachu-alola.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu-belle.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-cosplay.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu-gmax.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-hoenn.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu-kalos.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-libre.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu-original.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-phd.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu-pop-star.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-rockstar.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu.gif']}
    let fact_14 = {fact: 'Yamask is a dead human', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/yamask.gif', 'http://play.pokemonshowdown.com/sprites/ani/yamask-galar.gif']}
    let fact_15 = {fact: 'Munna was mentioned in the first game', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/munna.gif']}
    let fact_16 = {fact: 'Hitmonchan and Hitmonlee got their names from famous fighters (Jackie Chan and Bruce Lee)', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/hitmonchan.gif',
        'http://play.pokemonshowdown.com/sprites/ani/hitmonlee.gif']}
    let fact_17 = {fact: 'Arcanine was intended to be a legendary Pokemon', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/arcanine.gif']}
    let fact_18 = {fact: 'Clefairy was almost the face of Pokemon', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/clefairy.gif']}
    let fact_19 = {fact: 'Wobuffet\'s main body is a decoy', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/wobbuffet.gif']}
    let fact_20 = {fact: 'Smeargle can use almost every move in the game', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/smeargle.gif']}

    let pokemonFacts = [
        fact_1, fact_2, fact_3, fact_4, fact_5, fact_6, fact_7, fact_8, fact_9, fact_10, fact_11, fact_12, fact_13, fact_14, fact_15, fact_16, fact_17, fact_18, fact_19, fact_20
    ]

    function randomFactWithPokemon() {
        let randomIndex = Math.floor(Math.random() * Math.floor(20));
        let random_fact = pokemonFacts[randomIndex];
        let fact_0 = random_fact.fact;
        let new_randomIndex = Math.floor(Math.random() * Math.floor(random_fact.pokemon.length));
        let pokemon_0 = random_fact.pokemon[new_randomIndex];


        return (<div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <LabelTop>
                    Pokemon Fact #{randomIndex+1}
                </LabelTop>
            </div>
            <ButtonContainer>
                <PokemonGifContainer src={pokemon_0.toString()} />

            </ButtonContainer>



            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <LabelBottom>
                    {fact_0.toString()}
                </LabelBottom>
            </div>
            <Spinner/>
            </div>)
    }


    return (
        <div>

            <Space/>
            <Space/>
            <Space/>
            <Space/>
            <Space/>
            <Space/>
            <Space/>
            <Space/>
            <Space/>
            <Space/>
            <Space/>
            <Space/>
            <Space/>
            <Space/>
            {randomFactWithPokemon()}
        </div>
    )


}
