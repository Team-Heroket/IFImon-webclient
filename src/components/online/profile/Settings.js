import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../../helpers/layout';
import { api, handleError } from '../../../helpers/api';
import User from '../../shared/models/User';
import { withRouter } from 'react-router-dom';
import {Button, AvatarButton, RoundContainer} from '../../../views/design/Button';
import ReactDOM from "react-dom";
import Header from "../../../views/Header";
import {Player, PlayerStatCard} from "../../../views/Player";
import {BackIcon} from "../../../views/design/Icons";

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

const Row = styled.div`
    &::after{
    content: "";
    clear: "";
    display: table "";
    }
    `;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

class Settings extends React.Component {

    constructor() {
        super();

        this.state = {
            user: {
                rank: '2',
                avatarid: '2',
                username: 'Player2',
                gamesWon: '55',
                year: 1988,
                statistics: {
                    gamesWon: 33,
                    gamesLost: 32,
                    gamesPlayed: 65,
                    pokemonDiscovered: 225,
                }
            },
            avatar_list: []
        };
    }



    async componentDidMount() {
        //Checks if id in URL corresponds with our id. If it does, we can see edit button
        let url_id = this.props.match.params;

        if (url_id === localStorage.getItem('id')) {
            this.goToMenu();
        }


        //const response = api.get('/users/'+url_id
        let response = {
            rank: '2',
            avatarid: '2',
            username: 'Player2',
            gamesWon: '55',
            year: 1988,
            statistics: {
                gamesWon: 33,
                gamesLost: 32,
                gamesPlayed: 65,
                pokemonDiscovered: 225,
            }
        }
        this.setState({user: response})


        //sets fetched data to state that will be displayed
        /*
        this.setState({
            username: response.username,
            avatarid: response.avatarid,
            rank: response.statistics.rating,
            gamesPlayed: response.statistics.gamesPlayed,
            gamesWon: response.statistics.gamesWon,
            gamesLost: response.statistics.gamesLost,
            winToLoseRatio: response.statistics.winToLoseRatio
        })
        */


        for (let i=1; i<61; i++) {
            let s;
            let enable;
            enable = false;
            s = '';
            if(i<10){
                s='0'+i;
            }
            else{
                s=i.toString();
            }
            if(i == this.state.avatarid){
                enable = true;
            }
            this.state.avatar_list.push(
                <AvatarButton
                    enabled={enable}
                    onClick={() => {
                        this.setState({'avatarid': i});
                    }}
                >
                    <li>
                        <img alt="avatar" src={require('../../shared/images/avatarSVG/0'+s+'-avatar.svg')} height={"66px"} width={"66px"}/>
                    </li>
                </AvatarButton>
            )
        }
    }

    goToMenu() {
        this.props.history.push('/menu');
    }

    async save() {
        let response = {};
        if (this.state.username !== null) {response.username = this.state.username}
        if (this.state.password !== null) {response.password = this.state.password}
        if (this.state.avatarid !== null) {response.avatarid = this.state.avatarid}

        try {
            const requestBody = JSON.stringify(response);
            await api.put('/users/'+this.props.match.params, requestBody);
            this.goToSettings();
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }

    }



    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    render() {
        //Shows user information
        //"Edit Profile" Button is invisible to users that look at a profile that is not theirs

        return(
            <BaseContainer>
            <Header height={140} top={33} />
                <Row>
                    <RoundContainer onClick = {() => {this.goBack()}}>
                        <BackIcon />
                    </RoundContainer>
                </Row>
                <Row>
                {this.state.editClicked ? null :
                    <div>
                        <PlayerStatCard user={this.state.user}/>
                        <Button
                            width="50%"
                            onClick={() => {
                                this.setState({editClicked: true});
                            }}
                        >

                            Edit Profile
                        </Button>
                    </div>}
                {this.state.editClicked ?
                    <div>
                        <h1>Enter new Username</h1>
                        <InputField
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange('username', e.target.value);
                            }}
                        />
                        <h1>Enter new Password</h1>
                        <InputField
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange('username', e.target.value);
                            }}
                        />

                        <h1>Choose new Avatar</h1>
                        <ul>
                            {
                                this.state.avatar_list
                            }
                        </ul>
                        <h1>Current avatar={this.state.avatarid}</h1>
                        <Button
                            width="50%"
                            onClick={() => {

                                this.setState({editClicked: false,
                                    username: null,
                                    password: null,
                                    avatarid: null
                                });
                            }}
                        >
                            Go to Settings
                        </Button>
                        <Button
                            width="50%"
                            onClick={() => {
                                this.setState({editClicked: false});
                                this.save();
                            }}
                        >
                            Save
                        </Button>
                    </div>
                    : null
                }

                </Row>
            </BaseContainer>
        );
    }
}
export default withRouter(Settings);