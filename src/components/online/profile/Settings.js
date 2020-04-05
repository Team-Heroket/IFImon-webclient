import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../../helpers/layout';
import { api, handleError } from '../../../helpers/api';
import User from '../../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button, AvatarButton } from '../../../views/design/Button';
import ReactDOM from "react-dom";
import Header from "../../../views/Header";
const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
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
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class Settings extends React.Component {
    constructor() {
        super();

        this.state = {
            username: null,
            avatarid: 3,
            id: null,
            rank: null,
            gamesPlayed: null,
            gamesWon: null,
            gamesLost: null,
            winToLoseRatio: null,
            editClicked: false,
            avatar_list: []
        };
    }



    async componentDidMount() {
        //Checks if id in URL corresponds with our id. If it does, we can see edit button
        let url_id = this.props.match.params;

        if (url_id === localStorage.getItem('id')) {
            this.goToMenu();
        }

        this.setState({id: url_id})

        const response = api.get('/users/'+this.state.id)
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
                        this.setState({avatarid: i});
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
                {this.state.editClicked ? null :
                    <div>
                        <h1>Username: {this.state.username}</h1>
                        <h1>Rank: {this.state.rank}</h1>
                        <h1>Games played: {this.state.gamesPlayed}</h1>
                        <h1>Games won: {this.state.gamesWon}</h1>
                        <h1>Games lost: {this.state.gamesLost}</h1>
                        <h1>Win to lose ratio: {this.state.winToLoseRatio}</h1>
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
                        <input
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange('username', e.target.value);
                            }}
                        />
                        <h1>Enter new Password</h1>
                        <input
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


            </BaseContainer>
        );
    }
}
export default withRouter(Settings);