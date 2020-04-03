import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../../helpers/layout';
import { api, handleError } from '../../../helpers/api';
import User from '../../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../../views/design/Button';
import ReactDOM from "react-dom";
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
            avatarid: null,
            id: null,
            rank: null,
            gamesPlayed: null,
            gamesWon: null,
            gamesLost: null,
            winToLoseRatio: null,
            showEdit: false
        };
    }

    async componentDidMount() {
        //Checks if id in URL corresponds with our id. If it does, we can see edit button
        let url_id = this.props.match.params;
        if (url_id=== localStorage.getItem('id')) {
            this.setState({showEdit: true})
        }

        //Fetches data of user with the id from backend
        this.setState({id: url_id})
        const response = api.get('/users/'+this.state.id)
        const newUser = new User(response.data);
        //sets fetched data to state that will be displayed
        this.setState({
            username: newUser.username,
            avatarid: newUser.avatarid,
            rank: newUser.rank,
            gamesPlayed: newUser.gamesPlayed,
            gamesWon: newUser.gamesWon,
            gamesLost: newUser.gamesLost,
            winToLoseRatio: newUser.winToLoseRatio
        })
    }

    goToEdit() {
        this.props.history.push('/edit/'+this.state.id);
    }

    render() {

        //Shows user information
        //"Edit Profile" Button is invisible to users that look at a profile that is not theirs

        return(
            <div>
                {/*
                 <img alt="avatar" src={require('../../shared/images/avatar/'+this.state.avatarid+'.png')}/>
                 For now only commented, since we don't have pictures in directory
                 */}
                <h1>Username: {this.state.username}</h1>
                <h1>Rank: {this.state.rank}</h1>
                <h1>Games played: {this.state.gamesPlayed}</h1>
                <h1>Games won: {this.state.gamesWon}</h1>
                <h1>Games lost: {this.state.gamesLost}</h1>
                <h1>Win to lose ratio: {this.state.winToLoseRatio}</h1>
                {this.state.showEdit ? <Button
                    width="50%"
                    onClick={() => {
                         this.goToEdit();
                    }}
                >
                    Edit Profile
                </Button> : null}
            </div>
        );
    }
}
export default withRouter(Settings);