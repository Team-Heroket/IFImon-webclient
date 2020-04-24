import React from 'react';
import styled from 'styled-components';
import {BaseContainer, ButtonContainer, FormContainer, GameContainer, PlayerContainer, Row} from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import {Button, LogOutButton, RoundContainer} from '../../views/design/Button';
import Header from "../../views/Header";
import {BackIcon, BerriesIconWithBadge} from "../../views/design/Icons";
import {ChooseCategory} from "../online/game/afterGameStart/subScreens/ChooseCategory";
import {Evolve} from "../online/game/afterGameStart/subScreens/Evolve";
import {Clock} from "../online/game/afterGameStart/Clock";
import {PlayerGame} from "../../views/Player";
import {ColorlibConnector, ColorlibStepIcon} from "../../views/design/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import {PlaceholderCard} from "../../views/design/PokemonCard";


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
    /**
     * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
     * The constructor for a React component is called before it is mounted (rendered).
     * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
     * These fields are then handled in the onChange() methods in the resp. InputFields
     */
    constructor() {
        super();
        this.state = {
            berries: 2,
            deck: {
                "id":28,
                "cards":[
                    {
                        "id":154,
                        "pokemonId":56,
                        "categories":{
                            "WEIGHT":280,
                            "CAPTURE_RATING":190,
                            "ATK":80,
                            "SPEED":70,
                            "HP":40,
                            "DEF":35
                        },
                        "name":"Mankey",
                        "spriteURL":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/56.png",
                        "cryURL":null,
                        "elements":[
                            "FIGHTING"
                        ],
                        "evolutionNames":[
                            "primeape",
                            "pinapple"
                        ]
                    },
                    {
                        "id":155,
                        "pokemonId":102,
                        "categories":{
                            "WEIGHT":25,
                            "CAPTURE_RATING":90,
                            "ATK":40,
                            "SPEED":40,
                            "HP":60,
                            "DEF":80
                        },
                        "name":"Exeggcute",
                        "spriteURL":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/102.png",
                        "cryURL":null,
                        "elements":[
                            "PSYCHIC",
                            "GRASS"
                        ],
                        "evolutionNames":[
                            "exeggutor"
                        ]
                    },
                    {
                        "id":156,
                        "pokemonId":52,
                        "categories":{
                            "WEIGHT":42,
                            "CAPTURE_RATING":255,
                            "ATK":45,
                            "SPEED":90,
                            "HP":40,
                            "DEF":35
                        },
                        "name":"Meowth",
                        "spriteURL":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png",
                        "cryURL":null,
                        "elements":[
                            "NORMAL"
                        ],
                        "evolutionNames":[
                            "persian"
                        ]
                    },
                    {
                        "id":157,
                        "pokemonId":77,
                        "categories":{
                            "WEIGHT":300,
                            "CAPTURE_RATING":190,
                            "ATK":85,
                            "SPEED":90,
                            "HP":50,
                            "DEF":55
                        },
                        "name":"Ponyta",
                        "spriteURL":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png",
                        "cryURL":null,
                        "elements":[
                            "FIRE"
                        ],
                        "evolutionNames":[
                            "rapidash"
                        ]
                    },
                    {
                        "id":158,
                        "pokemonId":46,
                        "categories":{
                            "WEIGHT":54,
                            "CAPTURE_RATING":190,
                            "ATK":70,
                            "SPEED":25,
                            "HP":35,
                            "DEF":55
                        },
                        "name":"Paras",
                        "spriteURL":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/46.png",
                        "cryURL":null,
                        "elements":[
                            "GRASS",
                            "BUG"
                        ],
                        "evolutionNames":[
                            "parasect"
                        ]
                    }
                ],
                "empty":false
            },
            players: [
                {
                    "user":{
                        "username":"Tim",
                        "avatarId":1,
                        "statistics":{
                            "id":1,
                            "encounteredPokemon":[
                            ],
                            "gamesWon":0,
                            "gamesPlayed":0,
                            "rating":0,
                            "storyProgress":0
                        },
                        "creationDate":"17.04.2020",
                        "online":true,
                        "id":1
                    },
                    "id":39,
                    "berries":1,
                    "deck":{
                        "id":28,
                        "cards":[
                            {
                                "id":154,
                                "pokemonId":56,
                                "categories":{
                                    "WEIGHT":280,
                                    "CAPTURE_RATING":190,
                                    "ATK":80,
                                    "SPEED":70,
                                    "HP":40,
                                    "DEF":35
                                },
                                "name":"Mankey",
                                "spriteURL":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/56.png",
                                "cryURL":null,
                                "elements":[
                                    "FIGHTING"
                                ],
                                "evolutionNames":[
                                    "primeape"
                                ]
                            },
                            {
                                "id":155,
                                "pokemonId":102,
                                "categories":{
                                    "WEIGHT":25,
                                    "CAPTURE_RATING":90,
                                    "ATK":40,
                                    "SPEED":40,
                                    "HP":60,
                                    "DEF":80
                                },
                                "name":"Exeggcute",
                                "spriteURL":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/102.png",
                                "cryURL":null,
                                "elements":[
                                    "PSYCHIC",
                                    "GRASS"
                                ],
                                "evolutionNames":[
                                    "exeggutor"
                                ]
                            },
                            {
                                "id":156,
                                "pokemonId":52,
                                "categories":{
                                    "WEIGHT":42,
                                    "CAPTURE_RATING":255,
                                    "ATK":45,
                                    "SPEED":90,
                                    "HP":40,
                                    "DEF":35
                                },
                                "name":"Meowth",
                                "spriteURL":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png",
                                "cryURL":null,
                                "elements":[
                                    "NORMAL"
                                ],
                                "evolutionNames":[
                                    "persian"
                                ]
                            },
                            {
                                "id":157,
                                "pokemonId":77,
                                "categories":{
                                    "WEIGHT":300,
                                    "CAPTURE_RATING":190,
                                    "ATK":85,
                                    "SPEED":90,
                                    "HP":50,
                                    "DEF":55
                                },
                                "name":"Ponyta",
                                "spriteURL":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png",
                                "cryURL":null,
                                "elements":[
                                    "FIRE"
                                ],
                                "evolutionNames":[
                                    "rapidash"
                                ]
                            },
                            {
                                "id":158,
                                "pokemonId":46,
                                "categories":{
                                    "WEIGHT":54,
                                    "CAPTURE_RATING":190,
                                    "ATK":70,
                                    "SPEED":25,
                                    "HP":35,
                                    "DEF":55
                                },
                                "name":"Paras",
                                "spriteURL":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/46.png",
                                "cryURL":null,
                                "elements":[
                                    "GRASS",
                                    "BUG"
                                ],
                                "evolutionNames":[
                                    "parasect"
                                ]
                            }
                        ],
                        "empty":false
                    }
                }
            ],

        };
    }


    render() {
        let steps = ['Select category', 'Evolve Pokémon', 'Results'];
        return (
            <GameContainer>
                <Header height={140} top={33} />
                <PlaceholderCard/>
            </GameContainer>
        );
    }

}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Test);
