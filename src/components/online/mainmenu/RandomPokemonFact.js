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

export class RandomPokemonFact extends React.Component {


    fact_1 = {fact: 'Rhydon was the first Pokemon ever created', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/rhydon.gif']}
    fact_2 = {fact: 'Pikachu\'s name is Japanese onomatopoeia for sparkle and squeaking', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/pikachu-alola.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu-belle.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-cosplay.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu-gmax.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-hoenn.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu-kalos.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-libre.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu-original.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-phd.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu-pop-star.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-rockstar.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu.gif']}
    fact_3 = {fact: 'Drowzee is based off of a tapir', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/drowzee.gif']}
    fact_4 = {fact: 'Azurill is the only Pokemon that can change gender', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/azurill.gif']}
    fact_5 = {fact: 'Psychic type Pokemon are weak to bug, ghost, and dark type because they\'re common fears', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/raichu.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/raichu-alola.gif', 'https://play.pokemonshowdown.com/sprites/xyani/mrmime-galar.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/mrmime.gif', 'https://play.pokemonshowdown.com/sprites/xyani/jynx.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/hypno.gif', 'https://play.pokemonshowdown.com/sprites/xyani/kadabra.gif']}
    fact_6 = {fact: 'Rock types could still beat a Pokemon with all 18 types', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/geodude.gif',
        'http://play.pokemonshowdown.com/sprites/ani/geodude-alola.gif', 'http://play.pokemonshowdown.com/sprites/ani/onix.gif',
        'http://play.pokemonshowdown.com/sprites/ani/aerodactyl.gif', 'http://play.pokemonshowdown.com/sprites/ani/aerodactyl-mega.gif',
        'http://play.pokemonshowdown.com/sprites/ani/rhydon.gif']}
    fact_7 = {fact: 'Xatu sees both past and future at the same time', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/xatu.gif']}
    fact_8 = {fact: 'Slowbro is the only Pokemon that can devolve', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/slowbro.gif',
        'http://play.pokemonshowdown.com/sprites/ani/slowbro-mega.gif']}
    fact_9 = {fact: 'Slowpoke is considered a delicacy', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/slowpoke.gif',
        'http://play.pokemonshowdown.com/sprites/ani/slowpoke-galar.gif']}
    fact_10 = {fact: 'Many Pokemon names include numbers', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/articuno.gif',
        'http://play.pokemonshowdown.com/sprites/ani/zapdos.gif', 'http://play.pokemonshowdown.com/sprites/ani/moltres.gif']}
    fact_11 = {fact: 'Cubone wears the skull of his dead mother', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/cubone.gif']}
    fact_12 = {fact: 'Poliwag\'s swirl is based on tadpoles intestines', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/poliwag.gif']}
    fact_13 = {fact: 'Pokemon is short for "Pocket Monster"\n', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/pikachu-alola.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu-belle.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-cosplay.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu-gmax.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-hoenn.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu-kalos.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-libre.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu-original.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-phd.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu-pop-star.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-rockstar.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/pikachu.gif']}
    fact_14 = {fact: 'Yamask is a dead human', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/yamask.gif', 'http://play.pokemonshowdown.com/sprites/ani/yamask-galar.gif']}
    fact_15 = {fact: 'Munna was mentioned in the first game', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/munna.gif']}
    fact_16 = {fact: 'Hitmonchan and Hitmonlee got their names from famous fighters (Jackie Chan and Bruce Lee)', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/hitmonchan.gif',
        'http://play.pokemonshowdown.com/sprites/ani/hitmonlee.gif']}
    fact_17 = {fact: 'Arcanine was intended to be a legendary Pokemon', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/arcanine.gif']}
    fact_18 = {fact: 'Clefairy was almost the face of Pokemon', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/clefairy.gif']}
    fact_19 = {fact: 'Wobuffet\'s main body is a decoy', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/wobbuffet.gif']}
    fact_20 = {fact: 'Smeargle can use almost every move in the game', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/smeargle.gif']}
    fact_21 = {fact: 'Nidoqueen evolves from Nidorina when exposed to a Moon Stone', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/nidoqueen.gif']}
    fact_22 = {fact: 'Gloom is the only Pokémon to evolve into two different Pokémon with two different stones, other than Eevee', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/gloom.gif']}
    fact_23 = {fact: 'Tentacruel is said to have eighty tentacles, however only about ten are often seen', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/tentacruel.gif']}
    fact_24 = {fact: 'Bulbasaur is the only unevolved dual type starter Pokémon', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/bulbasaur.gif']}
    fact_25 = {fact: 'Ivysaur is the only Generation I Pokémon whose name begins with the letter I', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/ivysaur.gif']}
    fact_26 = {fact: 'Venusaur is a combination of the words Venus which refers to the Venus Flytrap plant, and the Greek word saur, meaning lizard', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/venusaur.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/venusaur-mega.gif']}
    fact_27 = {fact: 'Charmander is the tallest Fire-type starter Pokémon at 0.6 m', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/charmander.gif']}
    fact_28 = {fact: 'Charmeleon is capable of learning Leer in Generation I', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/charmeleon.gif']}
    fact_29 = {fact: 'Charizard was voted as the favorite Pokémon by Official Nintendo Magazine readers in February 2012', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/charizard.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/charizard-megay.gif', 'https://play.pokemonshowdown.com/sprites/xyani/charizard-megax.gif', 'https://play.pokemonshowdown.com/sprites/xyani/charizard-gmax.gif']}
    fact_30 = {fact: 'Squirtle is the first Water-type Pokémon in National Pokédex', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/squirtle.gif']}
    fact_31 = {fact: 'Wartortle gets its name from a combination of war/warrior, tortoise, and turtle', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/wartortle.gif']}
    fact_32 = {fact: 'Caterpie was the first Pokémon to be seen evolving in the animé', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/caterpie.gif']}
    fact_33 = {fact: 'Metapod is known as a Cocoon Pokémon', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/metapod.gif']}
    fact_34 = {fact: 'Butterfree has been trained by Trainers Ash, Drew, Ritchie and Solidad', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/butterfree.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/butterfree-gmax.gif']}
    fact_35 = {fact: 'Weedle evolves at level 7, the lowest level required for any Pokémon to evolve by leveling up', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/weedle.gif']}
    fact_36 = {fact: 'Kakuna has been shown evolving more than any other Pokémon in the animé', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/kakuna.gif']}
    fact_37 = {fact: 'Beedrill was originally going to be spelled with only one “L”', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/beedrill.gif']}
    fact_38 = {fact: 'Pidgey is the only Pokémon with a base stat total of 251', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/pidgey.gif']}
    fact_39 = {fact: 'Pidgeotto was caught by Ash in Ash Catches a Pokémon. Since then, it was one of Ash’s main Pokémon', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/pidgeotto.gif']}
    fact_40 = {fact: 'Pidgeot is the only Pokémon with a base stat total of 469', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/pidgeot.gif']}
    fact_41 = {fact: 'Rattata is the first pure Normal-type in National Pokédex order', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/rattata.gif']}
    fact_42 = {fact: 'Raticate was classified as a Rat Pokémon in Pokémon Red and Blue, however, from Generation III onward, it is classified as a mouse', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/raticate.gif']}
    fact_43 = {fact: 'Fearow weighs 38kg', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/fearow.gif']}
    fact_44 = {fact: 'Ekans spells snake backwards, which is also Ekans’ species', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/ekans.gif']}
    fact_45 = {fact: 'Arbok is the last Pokémon to be featured on the Kanto Pokérap', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/arbok.gif']}
    fact_46 = {fact: 'Pikachu is voiced by Ikue Outani', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/pikachu-alola.gif',
            'https://play.pokemonshowdown.com/sprites/xyani/pikachu-belle.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-cosplay.gif',
            'https://play.pokemonshowdown.com/sprites/xyani/pikachu-gmax.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-hoenn.gif',
            'https://play.pokemonshowdown.com/sprites/xyani/pikachu-kalos.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-libre.gif',
            'https://play.pokemonshowdown.com/sprites/xyani/pikachu-original.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-phd.gif',
            'https://play.pokemonshowdown.com/sprites/xyani/pikachu-pop-star.gif', 'https://play.pokemonshowdown.com/sprites/xyani/pikachu-rockstar.gif',
            'https://play.pokemonshowdown.com/sprites/xyani/pikachu.gif']}
    fact_47 = {fact: 'Raichu can be male or female, the difference in appearance is the female has smaller, blunted lightning bolt at the end of its tail', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/raichu.gif']}
    fact_48 = {fact: 'Sandshrew is based on an animal called the pangolin, it’s a mammal that curls up into a ball, has sharp claws, and lives in desert regions', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/sandshrew.gif']}
    fact_49 = {fact: 'Sandslash evolves from Sandshrew from level 22', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/sandslash.gif']}
    fact_50 = {fact: 'Nidoran(♀) can lay eggs which have a chance of hatching into a Nidoran(♂)', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/nidoranm.gif',
        'https://play.pokemonshowdown.com/sprites/xyani/nidoranf.gif']}
    fact_51 = {fact: 'Nidorina are common in the Kanto region, but rare in Sinnoh', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/nidorina.gif']}
    fact_52 = {fact: 'Nidoran(♂)‚ made its first appearance in the animé in ‘Pokémon Fashion Flash‘', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/nidoranm.gif']}
    fact_53 = {fact: 'Nidorino appeared in the very first episode, battling a Gengar in a battle Ash was watching on TV', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/nidorino.gif']}
    fact_54 = {fact: 'Nidoking, along with Nidoqueen are the only two Pokémon with a Poison/Ground type combination', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/nidoking.gif']}
    fact_55 = {fact: 'Clefable is based on a fairy and pixie', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/clefable.gif']}
    fact_56 = {fact: 'Ninetales was misspelled as “Ninetails” in the Pokémon Trading Card Game for the Game Boy Color”', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/ninetales.gif']}
    fact_57 = {fact: 'Jigglypuff is the only character to keep its original voice track through all three Super Smash Bros. games', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/jigglypuff.gif']}
    fact_58 = {fact: 'Zubat does not have eyes', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/zubat.gif']}
    fact_59 = {fact: 'Golbat is the first Pokémon in the National Pokédex to gain a new evolution in a later generation', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/golbat.gif']}
    fact_60 = {fact: 'Eternatus is the tallest Pokémon at a staggering 20 m', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/eternatus.gif']}
    fact_61 = {fact: 'Joltik is the smallest Pokémon at just 0.1 m', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/joltik.gif']}
    fact_62 = {fact: 'Diglett has been shown to have no feet however it is mentioned as being one of the seven mysteries of Pokémon', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/diglett.gif']}
    fact_63 = {fact: 'Deoxys-Speed is the fastest Pokémon at 180', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/deoxys-speed.gif']}
    fact_64 = {fact: 'Mega Mewtwo X has the highest base Attack of any Pokémon. It has a whopping 190 Attack, and is capable of reaching 526 Attack at level 100', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/mewtwo-megax.gif']}
    fact_65 = {fact: 'Oddish has a scientific name, which is Oddium Wanderus. It was first shown in the FireRed Pokédex entry', pokemon: ['http://play.pokemonshowdown.com/sprites/ani/oddish.gif']}
    fact_66 = {fact: 'Vileplume‘s species is Flower Pokémon', pokemon: ['http://play.pokemonshowdown.com/sprites/xyani/vileplume.gif']}
    fact_67 = {fact: 'Paras and its evolved form are the only Pokémon to have a 5x weakness due to the Ability Dry Skin', pokemon: ['http://play.pokemonshowdown.com/sprites/xyani/paras.gif',
        'http://play.pokemonshowdown.com/sprites/xyani/parasect.gif']}
    fact_68 = {fact: 'Parasect has used Sleep Powder in the animé, however it cannot learn this in the games', pokemon: ['http://play.pokemonshowdown.com/sprites/xyani/parasect.gif']}
    fact_69 = {fact: 'Venonat has red eyes and nose, however the shiny Venonat’s eyes and nose are blue', pokemon: ['http://play.pokemonshowdown.com/sprites/xyani/venonat.gif']}
    fact_70 = {fact: 'Venomoth shares the same species name with Dustox. They are both known as Poison Moth Pokémon', pokemon: ['http://play.pokemonshowdown.com/sprites/xyani/venomoth.gif']}
    fact_71 = {fact: 'Dugtrio is the fastest Ground-type Pokémon at a speed of 120', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/dugtrio.gif']}
    fact_72 = {fact: 'Meowth is the first Pokémon in the animé to talk', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/meowth.gif']}
    fact_73 = {fact: 'Persian‘s level-up moves are all Normal-type or Dark-type, except the move Power Gem', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/persian.gif']}
    fact_74 = {fact: 'Psyduck is the only Pokémon to learn Psychic by breeding', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/psyduck.gif']}
    fact_75 = {fact: 'Golduck is one of the few Pokémon that is obtainable in every game, including expansion games and remakes', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/golduck.gif']}
    fact_76 = {fact: 'Mankey is the first Fighting-type Pokémon in National Pokédex order', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/mankey.gif']}
    fact_77 = {fact: 'Primeape‘s like to eat bananas', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/primeape.gif']}
    fact_78 = {fact: 'Growlithe is a Puppy Pokémon, the only other Pokémon that has this species name is Lillipup', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/growlithe.gif']}
    fact_79 = {fact: 'Arcanine is said to be capable of running over 6,200 miles in a single day and night', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/arcanine.gif']}
    fact_80 = {fact: 'Poliwag has the same cry as Ditto in the games', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/poliwag.gif']}
    fact_81 = {fact: 'Poliwhirl is the first Pokémon in National Pokédex order to evolve by trading while holding an item', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/poliwhirl.gif']}
    fact_82 = {fact: 'Poliwrath is a combination the word polliwog, which is a tadpole, and wrath, meaning anger', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/poliwrath.gif']}
    fact_83 = {fact: 'Abra has the highest Special Attack of all unevolved Pokémon', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/abra.gif']}
    fact_84 = {fact: 'Kadabra is based on a magician and also a spoon-bender', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/kadabra.gif']}
    fact_85 = {fact: 'Alakazam‘s have a shorter moustache if they are female', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/alakazam.gif']}
    fact_86 = {fact: 'Machop can learn Strength, which is the only HM move it can learn', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/machop.gif']}
    fact_87 = {fact: 'Machoke weighs 70.5 kg', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/machoke.gif']}
    fact_88 = {fact: 'Machamp is one of the four Pokémon having a total of four arms', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/machamp.gif']}
    fact_89 = {fact: 'Bellsprout eat insects and takes in nutrients from the soil', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/bellsprout.gif']}
    fact_90 = {fact: 'Weepinbell first appeared in the animé called The School of Hard Knocks', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/weepinbell.gif']}
    fact_91 = {fact: 'Victreebel and its pre-evolutions are based on carnivorous pitcher plants', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/victreebel.gif']}
    fact_92 = {fact: 'Tentacool is weak against Ground, Electric and Psychic type moves', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/tentacool.gif']}
    fact_93 = {fact: 'Tentacruel is said to have eighty tentacles, however only about ten are often seen', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/tentacruel.gif']}
    fact_94 = {fact: 'Geodude are often shown to be floating, however it cannot have the Levitate Ability, and it can’t learn Magnet Rise', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/geodude.gif']}
    fact_95 = {fact: 'Graveler‘s diet mainly consists of moss-covered rocks', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/graveler.gif']}
    fact_96 = {fact: 'Golem are able to withdraw their head, arms, and legs into their shell and roll at high speeds', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/golem.gif']}
    fact_97 = {fact: 'Ponyta in shiny form has blue flames', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/ponyta.gif']}
    fact_98 = {fact: 'Rapidash has no flames for a split second, in the first movie', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/rapidash.gif']}
    fact_99 = {fact: 'Shuckle looks like a worm in a shell, but this Pokemon can dish out the most damage out of any Pokemon in existence. At level 100, Shuckle candeal 481,266,000 damage in just one single attack', pokemon: ['https://play.pokemonshowdown.com/sprites/xyani/shuckle.gif']}
    fact_100 = {fact: 'You know Professor Oak from the tutorial. However, there\'s also Professor Birch, Professor Elm, Professor Rowan and Professor Aragari. They\'re all named after trees. In fact, all of the Pokemon professors have tree names', pokemon: ['https://2.bp.blogspot.com/-TzUdpXmoTm8/WZ4zH1537DI/AAAAAAAJhx0/tunyYHsS1ugZazpFS3n_WXdoV3X0gABhACLcBGAs/s1600/AS002997_19.gif']}

    constructor() {
        super();
        this.state = {
            pokemonFacts: [
                this.fact_1, this.fact_2, this.fact_3, this.fact_4, this.fact_5, this.fact_6, this.fact_7, this.fact_8, this.fact_9, this.fact_10,
                this.fact_11, this.fact_12, this.fact_13, this.fact_14, this.fact_15, this.fact_16, this.fact_17, this.fact_18, this.fact_19, this.fact_20,
                this.fact_21, this.fact_22, this.fact_23, this.fact_24, this.fact_25, this.fact_26, this.fact_27, this.fact_28, this.fact_29, this.fact_30,
                this.fact_31, this.fact_32, this.fact_33, this.fact_34, this.fact_35, this.fact_36, this.fact_37, this.fact_38, this.fact_39, this.fact_40,
                this.fact_41, this.fact_42, this.fact_43, this.fact_44, this.fact_45, this.fact_46, this.fact_47, this.fact_48, this.fact_49, this.fact_50,
                this.fact_51, this.fact_52, this.fact_53, this.fact_54, this.fact_55, this.fact_56, this.fact_57, this.fact_58, this.fact_59, this.fact_60,
                this.fact_61, this.fact_62, this.fact_63, this.fact_64, this.fact_65, this.fact_66, this.fact_67, this.fact_68, this.fact_69, this.fact_70,
                this.fact_71, this.fact_72, this.fact_73, this.fact_74, this.fact_75, this.fact_76, this.fact_77, this.fact_78, this.fact_79, this.fact_70,
                this.fact_81, this.fact_82, this.fact_83, this.fact_84, this.fact_85, this.fact_86, this.fact_87, this.fact_88, this.fact_89, this.fact_80,
                this.fact_91, this.fact_92, this.fact_93, this.fact_94, this.fact_95, this.fact_96, this.fact_97, this.fact_98, this.fact_99, this.fact_100,
            ],
            factIndex: null,
            chosenFact: null,
            chosenPokemon: null
        };
    }

    componentDidMount() {
        let randomIndex = Math.floor(Math.random() * Math.floor(this.state.pokemonFacts.length));
        let random_fact = this.state.pokemonFacts[randomIndex];
        let fact_0 = random_fact.fact;
        let new_randomIndex = Math.floor(Math.random() * Math.floor(random_fact.pokemon.length));
        let pokemon_0 = random_fact.pokemon[new_randomIndex];

        this.setState({factIndex: randomIndex,chosenFact: fact_0, chosenPokemon: pokemon_0})
    }

    randomFactWithPokemon() {

        return (<div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <LabelTop>
                    Pokémon Fact #{this.state.factIndex+1}
                </LabelTop>
            </div>
            <ButtonContainer>
                <PokemonGifContainer src={this.state.chosenPokemon.toString()} />

            </ButtonContainer>



            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <LabelBottom>
                    {this.state.chosenFact.toString()}
                </LabelBottom>
            </div>
            </div>)
    }


    render() {
        return (

            <div>
                {!this.state.chosenFact ? <Spinner/> : <div>
                    {this.randomFactWithPokemon()}
                </div>}

            </div>
        );
    }


}
