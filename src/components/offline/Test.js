import React from 'react';
import styled from 'styled-components';
import {BaseContainer, ButtonContainer, FormContainer, GameContainer, PlayerContainer, Row} from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import {Button, LogOutButton, RoundContainer} from '../../views/design/Button';
import Header from "../../views/Header";
import {BackIcon, BerriesIconWithBadge, LogoPokeball} from "../../views/design/Icons";
import {ChooseCategory} from "../online/game/afterGameStart/subScreens/ChooseCategory";
import {Evolve} from "../online/game/afterGameStart/subScreens/Evolve";
import {Clock} from "../online/game/afterGameStart/Clock";
import {PlayerGame} from "../../views/Player";
import {ColorlibConnector, ColorlibStepIcon} from "../../views/design/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import {FocusedPokemonCard, PlaceholderCard} from "../../views/design/PokemonCard";
import Badge from "@material-ui/core/Badge";
import Confetti from "../shared/Confetti";
import {Spectator} from "../online/game/afterGameStart/subScreens/Spectator";
import {Result} from "../online/game/afterGameStart/subScreens/Result";


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

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  position: relative;
  transform : translate(-50%, 0%);
  height: 35px;
  width: 400px;
  left: 50%;
  border: none;
  border-radius: 25px;
  margin-bottom: 20px;
  padding-left:10px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  
`;

const PasswordField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  position: relative;
  transform : translate(-50%, 0%);
  height: 35px;
  width: 400px;
  left: 50%;
  border: none;
  border-radius: 25px;
  margin-bottom: 20px;
  padding-left:10px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 16px;
  font-weight: 300;
  -Webkit-text-security: disc;
  text-security: disc;
`;

const Label = styled.label`
  position: relative;
  transform : translate(-50%, 0%);
  width: 400px;
  left: 50%;
  color: white;
  margin-left: 4px;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */



class Test extends React.Component {

    doSomethingBeforeUnload = () => {
    }

    // Setup the `beforeunload` event listener
    setupBeforeUnloadListener = () => {
        window.addEventListener("beforeunload", (ev) => {
            return this.doSomethingBeforeUnload()
        });
    };

    componentDidMount() {
        // Activate the event listener
        window.addEventListener('beforeunload', (event) => {
            event.returnValue = `Are you sure you want to leave?`;
        });
    }
    /**
     * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
     * The constructor for a React component is called before it is mounted (rendered).
     * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
     * These fields are then handled in the onChange() methods in the resp. InputFields
     */
    masterState = {
        id:14,
        gameName:"lol",
        token:"Kricketot",
        creator:{
            user:{
                username:"asd",
                avatarId:1,
                statistics:{
                    encounteredPokemon:[
                        1,
                        4,
                        25,
                        27,
                        29,
                        32,
                        37,
                        46,
                        48,
                        54,
                        58,
                        63,
                        72,
                        74,
                        77,
                        79,
                        81,
                        83,
                        86,
                        90,
                        95,
                        100,
                        102,
                        106,
                        107,
                        111,
                        113,
                        116,
                        123,
                        129,
                        132,
                        138,
                        140,
                        145
                    ],
                    gamesWon:1,
                    gamesPlayed:1,
                    rating:2,
                    storyProgress:0
                },
                creationDate:"26.04.2020",
                online:true,
                id:1,
                npc:false
            },
            id:43,
            berries:1,
            deck:{
                id:37,
                cards:[
                    {
                        id:424,
                        pokemonId:139,
                        categories:{
                            "SPEED":55,
                            "HP":70,
                            "DEF":125,
                            "ATK":60,
                            "WEIGHT":350,
                            "CAPTURE_RATING":45
                        },
                        name:"Omastar1",
                        spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                        cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                        elements:[
                            "WATER",
                            "ROCK"
                        ],
                        evolutionNames:[

                        ]
                    },
                    {
                        id:424,
                        pokemonId:139,
                        categories:{
                            "SPEED":55,
                            "HP":70,
                            "DEF":125,
                            "ATK":60,
                            "WEIGHT":350,
                            "CAPTURE_RATING":45
                        },
                        name:"Omastar2",
                        spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                        cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                        elements:[
                            "WATER",
                            "ROCK"
                        ],
                        evolutionNames:[

                        ]
                    },
                    {
                        id:424,
                        pokemonId:139,
                        categories:{
                            "SPEED":55,
                            "HP":70,
                            "DEF":125,
                            "ATK":60,
                            "WEIGHT":350,
                            "CAPTURE_RATING":45
                        },
                        name:"Omastar3",
                        spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                        cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                        elements:[
                            "WATER",
                            "ROCK"
                        ],
                        evolutionNames:[

                        ]
                    },
                    {
                        id:424,
                        pokemonId:139,
                        categories:{
                            "SPEED":55,
                            "HP":70,
                            "DEF":125,
                            "ATK":60,
                            "WEIGHT":350,
                            "CAPTURE_RATING":45
                        },
                        name:"Omastar4",
                        spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                        cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                        elements:[
                            "WATER",
                            "ROCK"
                        ],
                        evolutionNames:[

                        ]
                    },
                    {
                        id:424,
                        pokemonId:139,
                        categories:{
                            "SPEED":55,
                            "HP":70,
                            "DEF":125,
                            "ATK":60,
                            "WEIGHT":350,
                            "CAPTURE_RATING":45
                        },
                        name:"Omastar5",
                        spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                        cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                        elements:[
                            "WATER",
                            "ROCK"
                        ],
                        evolutionNames:[

                        ]
                    }
                ],
                empty:false
            }
        },
        players:[
            {
                user:{
                    username:"Tim1",
                    avatarId:1,
                    statistics:{
                        encounteredPokemon:[
                            1,
                            4,
                            25,
                            27,
                            29,
                            32,
                            37,
                            46,
                            48,
                            54,
                            58,
                            63,
                            72,
                            74,
                            77,
                            79,
                            81,
                            83,
                            86,
                            90,
                            95,
                            100,
                            102,
                            106,
                            107,
                            111,
                            113,
                            116,
                            123,
                            129,
                            132,
                            138,
                            140,
                            145
                        ],
                        gamesWon:1,
                        gamesPlayed:1,
                        rating:2,
                        storyProgress:0
                    },
                    creationDate:"26.04.2020",
                    online:true,
                    id:1,
                    npc:false
                },
                id:43,
                berries:1,
                deck:{
                    id:37,
                    cards:[
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar1",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        },
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar2",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        },
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar3",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        },
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar4",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        },
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar5",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        }
                    ],
                    empty:false
                }
            },
            {
                user:{
                    username:"Tim2",
                    avatarId:1,
                    statistics:{
                        encounteredPokemon:[
                            1,
                            4,
                            25,
                            27,
                            29,
                            32,
                            37,
                            46,
                            48,
                            54,
                            58,
                            63,
                            72,
                            74,
                            77,
                            79,
                            81,
                            83,
                            86,
                            90,
                            95,
                            100,
                            102,
                            106,
                            107,
                            111,
                            113,
                            116,
                            123,
                            129,
                            132,
                            138,
                            140,
                            145
                        ],
                        gamesWon:1,
                        gamesPlayed:1,
                        rating:2,
                        storyProgress:0
                    },
                    creationDate:"26.04.2020",
                    online:true,
                    id:1,
                    npc:false
                },
                id:43,
                berries:1,
                deck:{
                    id:37,
                    cards:[
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar1",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        },
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar2",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        },
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar3",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        },
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar4",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        },
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar5",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        }
                    ],
                    empty:false
                }
            },
            {
                user:{
                    username:"Tim3",
                    avatarId:1,
                    statistics:{
                        encounteredPokemon:[
                            1,
                            4,
                            25,
                            27,
                            29,
                            32,
                            37,
                            46,
                            48,
                            54,
                            58,
                            63,
                            72,
                            74,
                            77,
                            79,
                            81,
                            83,
                            86,
                            90,
                            95,
                            100,
                            102,
                            106,
                            107,
                            111,
                            113,
                            116,
                            123,
                            129,
                            132,
                            138,
                            140,
                            145
                        ],
                        gamesWon:1,
                        gamesPlayed:1,
                        rating:2,
                        storyProgress:0
                    },
                    creationDate:"26.04.2020",
                    online:true,
                    id:1,
                    npc:false
                },
                id:43,
                berries:1,
                deck:{
                    id:37,
                    cards:[
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar1",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        },
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar2",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        },
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar3",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        },
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar4",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        },
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar5",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        }
                    ],
                    empty:false
                }
            }
        ],
        winners:[
            {
                user:{
                    username:"Tim3",
                    avatarId:1,
                    statistics:{
                        encounteredPokemon:[
                            1,
                            4,
                            25,
                            27,
                            29,
                            32,
                            37,
                            46,
                            48,
                            54,
                            58,
                            63,
                            72,
                            74,
                            77,
                            79,
                            81,
                            83,
                            86,
                            90,
                            95,
                            100,
                            102,
                            106,
                            107,
                            111,
                            113,
                            116,
                            123,
                            129,
                            132,
                            138,
                            140,
                            145
                        ],
                        gamesWon:1,
                        gamesPlayed:1,
                        rating:2,
                        storyProgress:0
                    },
                    creationDate:"26.04.2020",
                    online:true,
                    id:1,
                    npc:false
                },
                id:43,
                berries:1,
                deck:{
                    id:37,
                    cards:[
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar1",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        },
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar2",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        },
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar3",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        },
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar4",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        },
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar5",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        }
                    ],
                    empty:false
                }
            },
            {
                user:{
                    username:"Tim2",
                    avatarId:1,
                    statistics:{
                        encounteredPokemon:[
                            1,
                            4,
                            25,
                            27,
                            29,
                            32,
                            37,
                            46,
                            48,
                            54,
                            58,
                            63,
                            72,
                            74,
                            77,
                            79,
                            81,
                            83,
                            86,
                            90,
                            95,
                            100,
                            102,
                            106,
                            107,
                            111,
                            113,
                            116,
                            123,
                            129,
                            132,
                            138,
                            140,
                            145
                        ],
                        gamesWon:1,
                        gamesPlayed:1,
                        rating:2,
                        storyProgress:0
                    },
                    creationDate:"26.04.2020",
                    online:true,
                    id:1,
                    npc:false
                },
                id:43,
                berries:1,
                deck:{
                    id:37,
                    cards:[
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar1",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        },
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar2",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        },
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar3",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        },
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar4",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        },
                        {
                            id:424,
                            pokemonId:139,
                            categories:{
                                "SPEED":55,
                                "HP":70,
                                "DEF":125,
                                "ATK":60,
                                "WEIGHT":350,
                                "CAPTURE_RATING":45
                            },
                            name:"Omastar5",
                            spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                            cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                            elements:[
                                "WATER",
                                "ROCK"
                            ],
                            evolutionNames:[

                            ]
                        }
                    ],
                    empty:false
                }
            }
        ],
        mode:"SOCIAL",
        category:"DEF",
        state:"RUNNING",
        creationTime:"1587916419782",
        startTime:"1587916794381",
        turnPlayer:{
            user:{
                username:"Tim2",
                avatarId:1,
                statistics:{
                    encounteredPokemon:[
                        1,
                        4,
                        25,
                        27,
                        29,
                        32,
                        37,
                        46,
                        48,
                        54,
                        58,
                        63,
                        72,
                        74,
                        77,
                        79,
                        81,
                        83,
                        86,
                        90,
                        95,
                        100,
                        102,
                        106,
                        107,
                        111,
                        113,
                        116,
                        123,
                        129,
                        132,
                        138,
                        140,
                        145
                    ],
                    gamesWon:1,
                    gamesPlayed:1,
                    rating:2,
                    storyProgress:0
                },
                creationDate:"26.04.2020",
                online:true,
                id:1,
                npc:false
            },
            id:43,
            berries:1,
            deck:{
                id:37,
                cards:[
                    {
                        id:424,
                        pokemonId:139,
                        categories:{
                            "SPEED":55,
                            "HP":70,
                            "DEF":125,
                            "ATK":60,
                            "WEIGHT":350,
                            "CAPTURE_RATING":45
                        },
                        name:"Omastar1",
                        spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                        cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                        elements:[
                            "WATER",
                            "ROCK"
                        ],
                        evolutionNames:[

                        ]
                    },
                    {
                        id:424,
                        pokemonId:139,
                        categories:{
                            "SPEED":55,
                            "HP":70,
                            "DEF":125,
                            "ATK":60,
                            "WEIGHT":350,
                            "CAPTURE_RATING":45
                        },
                        name:"Omastar2",
                        spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                        cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                        elements:[
                            "WATER",
                            "ROCK"
                        ],
                        evolutionNames:[

                        ]
                    },
                    {
                        id:424,
                        pokemonId:139,
                        categories:{
                            "SPEED":55,
                            "HP":70,
                            "DEF":125,
                            "ATK":60,
                            "WEIGHT":350,
                            "CAPTURE_RATING":45
                        },
                        name:"Omastar3",
                        spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                        cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                        elements:[
                            "WATER",
                            "ROCK"
                        ],
                        evolutionNames:[

                        ]
                    },
                    {
                        id:424,
                        pokemonId:139,
                        categories:{
                            "SPEED":55,
                            "HP":70,
                            "DEF":125,
                            "ATK":60,
                            "WEIGHT":350,
                            "CAPTURE_RATING":45
                        },
                        name:"Omastar4",
                        spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                        cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                        elements:[
                            "WATER",
                            "ROCK"
                        ],
                        evolutionNames:[

                        ]
                    },
                    {
                        id:424,
                        pokemonId:139,
                        categories:{
                            "SPEED":55,
                            "HP":70,
                            "DEF":125,
                            "ATK":60,
                            "WEIGHT":350,
                            "CAPTURE_RATING":45
                        },
                        name:"Omastar5",
                        spriteURL:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png",
                        cryURL:"https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
                        elements:[
                            "WATER",
                            "ROCK"
                        ],
                        evolutionNames:[

                        ]
                    }
                ],
                empty:false
            }
        }
    }

    constructor() {
        super();
    }



    render() {
        let steps = ['Select category', 'Evolve Pokémon', 'Results'];
        return (
            <GameContainer>
                <Spectator masterState={this.masterState} history={this.props.history}/>

            </GameContainer>
        );
    }

}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Test);
