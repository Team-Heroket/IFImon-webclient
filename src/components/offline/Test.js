import React from 'react';
import styled from 'styled-components';
import {
    AvatarContainer,
    BaseContainer,
    ButtonContainer,
    HorizontalButtonContainer,
    FormContainer,
    GameContainer,
    PlayerContainer,
    Row, SimpleContainer, InnerContainerPokedex
} from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';

import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';
import {
    AvatarButton,
    Button,
    DotButton,
    LogOutButton,
    PokedexGenerationButton,
    RoundContainer
} from '../../views/design/Button';
import Header from "../../views/Header";
import { Alert } from '@material-ui/lab';
import {
    BackButton,
    BackIcon,
    BerriesIconWithBadge,
    EncounteredPokemonSprite,
    LogoPokeball, MuteIcon,
    NewPokemonSprite, SoundButton, VolumeIcon
} from "../../views/design/Icons";
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
import {Spinner} from "../../views/design/Spinner";
import Grid from "@material-ui/core/Grid";
import {Finished} from "../online/game/afterGameStart/subScreens/Finished";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";


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


    constructor() {
        super();
        localStorage.setItem('VolumeMuted', 'false');
        this.state = {
            open: true,
            setOpen: true,
            user: null,
            step: 0,
            generation: this.genPokemon.I
        };

    }

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

    async componentDidMount() {

        try {
            const resp = await api.get('/users/'+localStorage.getItem('id'), { headers: {'Token': localStorage.getItem('token')}});

            let response = resp.data;
            await this.setState({user: response,
                avatarClicked: response.avatarId});

        }
        catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }
    /**
     * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
     * The constructor for a React component is called before it is mounted (rendered).
     * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
     * These fields are then handled in the onChange() methods in the resp. InputFields
     */
    masterState = {
        id:14,
        berries:0,
        mute: (localStorage.getItem('mute') ? (localStorage.getItem('mute')=='true' ? true : false) : false),
        username:"asd",
        amIAdmin: true,
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
                        "WATER",
                        "ROCK"
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
        },
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
                        evolutionNames: [
                            'Omastar1', 'Omastar1'
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
        player_me: {
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
                        evolutionNames: [
                            'Omastar1', 'Omastar1'
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
                    id:2,
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
                    id:3,
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
                    id:4,
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
                    id:4,
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
                    id:5,
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
        chosenCategory:"DEF",
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

    SpritesGenerator () {
        let windowButtons = [];
        let pokemon_list = [];
        let amountDisplayed = 24;
        if(this.masterState.creator.user.statistics.encounteredPokemon.length!=0){
            let start = this.state.generation[0]+this.state.step*(amountDisplayed)+(this.state.step == 0 ? 0 : 1);
            let end = Math.min(this.state.generation[0]+(this.state.step+1)*amountDisplayed+(this.state.step == 0 ? 0 : 1), this.state.generation[1])
            for(let i = start; i<=end ; i++){
                if(this.masterState.creator.user.statistics.encounteredPokemon.includes(i)){
                    pokemon_list.push(
                            <EncounteredPokemonSprite alt="avatar" src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+i+'.png'} size={"92px"} index = {i}/>
                    )
                }
                else{
                    pokemon_list.push(
                        <NewPokemonSprite src={require('../../components/shared/images/pokemonTypesSVG/unknown.svg')} size={"92px"} index = {i}/>
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
                <AvatarContainer height={'500px'} width={'500px'}>
                    <SimpleContainer heigth={500} color={'#FFFFFF'} >
                        Your Pokèdex will start working after your first game!
                    </SimpleContainer>
                </AvatarContainer>
            )
        }
        return(
        <AvatarContainer height={'600px'} width={'500px'} margin={"0px"}>
            {this.generationTabs()}
            <InnerContainerPokedex>
            {pokemon_list}
            </InnerContainerPokedex>
            <HorizontalButtonContainer align={'bottom'}>
            {windowButtons}
            </HorizontalButtonContainer>
        </AvatarContainer>)

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

    goBack() {
        if (window.confirm('Are you sure you want to leave the game?')) this.props.history.push('/menu')
    }

    render() {


        return (
            <GameContainer>
            <Header height={140} top={33}/>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                >
                {localStorage.getItem('VolumeMuted')=='true'?
                    <SoundButton mute={false} action={()=>{
                        this.masterState.mute = true;
                        localStorage.setItem('VolumeMuted', 'false');
                        this.forceUpdate()}} />
                :
                    <SoundButton mute={true} action={() => {

                        this.masterState.mute = false;
                        localStorage.setItem('VolumeMuted', 'true');
                        this.forceUpdate()}} />
                }
                <BackButton action={() => {this.goBack()}}/>
            </Grid>
            <BaseContainer>
                    <Evolve masterState={this.masterState} history={this.props.history}/>
            </BaseContainer>
            </GameContainer>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Test);
