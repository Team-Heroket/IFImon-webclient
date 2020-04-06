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
                avatarId: '2',
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
            avatar_list: [],
            editClicked: false,
            newUsername: null,
            newPassword: null,
            newAvatarId: null
        };
    }

    async componentDidMount() {
        //Checks if id in URL corresponds with our id. If it does, we can see edit button
        let url_id = this.props.match.params;

        if (url_id === localStorage.getItem('id')) {
            this.goToMenu();
        }

        try {
            const resp = await api.get('/users/'+localStorage.getItem('id'), { headers: {'Token': localStorage.getItem('token')}});
            let test = {
                rank: '2',
                avatarId: '2',
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
            let response = resp.data;
            response.avatarId = 1;
            await this.setState({user: response});
            console.log('requested data:', resp.data);
        }
        catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }

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
            if(i == this.state.avatarId){
                enable = true;
            }
            this.state.avatar_list.push(
                <AvatarButton
                    enabled={enable}
                    onClick={() => {
                        this.setState({avatarId: i});
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
        if (this.state.newUsername !== null) {response.username = this.state.newUsername}
        if (this.state.newPassword !== null) {response.password = this.state.newPassword}
        if (this.state.newAvatarId !== null) {response.avatarId = this.state.newAvatarId}

        try {

            await api.put('/users/'+localStorage.getItem('id'), response, { headers: {'Token': localStorage.getItem('token')}});
            this.goToSettings();
        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }

    }



    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    goBack() {
        this.props.history.push('/menu');
    }

    render() {
        //Shows user information

        return(
                    <BaseContainer>

                        <Header height={140} top={33}/>
                        <Row>
                            <RoundContainer onClick={() => {
                                this.goBack()
                            }}>
                                <BackIcon/>
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
                                            this.handleInputChange('newUsername', e.target.value);
                                        }}
                                    />
                                    <h1>Enter new Password</h1>
                                    <InputField
                                        placeholder="Enter here.."
                                        onChange={e => {
                                            this.handleInputChange('newPassword', e.target.value);
                                        }}
                                    />

                                    <h1>Choose new Avatar</h1>
                                    <ul>
                                        {
                                            this.state.avatar_list
                                        }
                                    </ul>
                                    <h1>Current avatar={this.state.avatarId}</h1>
                                    <Button
                                        width="50%"
                                        onClick={() => {

                                            this.setState({
                                                editClicked: false,
                                                username: null,
                                                password: null,
                                                avatarId: null
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