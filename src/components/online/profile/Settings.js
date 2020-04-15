import React from 'react';
import styled from 'styled-components';
import {AvatarContainer, BaseContainer, ButtonContainer, FormContainer} from '../../../helpers/layout';
import { api, handleError } from '../../../helpers/api';
import User from '../../shared/models/User';
import { withRouter } from 'react-router-dom';
import {Button, AvatarButton, RoundContainer} from '../../../views/design/Button';
import ReactDOM from "react-dom";
import Header from "../../../views/Header";
import {Player, PlayerStatCard} from "../../../views/Player";
import {BackIcon} from "../../../views/design/Icons";
import {Spinner} from "../../../views/design/Spinner";

const Label = styled.label`
  position: relative;
  transform : translate(-50%, 0%);
  width: 400px;
  left: 15%;
  color: white;
  margin-left: 4px;
  margin-bottom: 50px;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 300;
`;


const Row = styled.div`
    &::after{
    content: "";
    clear: "";
    display: table "";
    }
    
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
  margin-top: 10px;
  padding-left:10px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 16px;
  font-weight: 300;
  
`;

const Column = styled.div`
    float: left
    align-items: center
    width = 100%
    
    @media only screen and (min-width: 768px){
    width: 50%;
    }
`

class Settings extends React.Component {

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            user: null,
            editClicked: false,
            newUsername: null,
            newPassword: null,
            newAvatarId: null,
            avatarClicked: null
        };
    }

    handleClick(event) {
        this.setState({newAvatarId: event.currentTarget.id,
        avatarClicked: event.currentTarget.id});

        console.log("New id: "+event.currentTarget.id);
        console.log("New avatarClicked: "+this.state.avatarClicked);
    }

    createAvatarList() {
        let avatar_list = [];
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
            if(i == this.state.avatarClicked){
                enable = true;
            }
            avatar_list.push(

                <AvatarButton
                    enabled={enable}
                    id = {i}
                    onClick={this.handleClick}
                >
                    <li index = {i}>
                        <img alt="avatar" src={require('../../shared/images/avatarSVG/0'+s+'-avatar.svg')} height={"66px"} width={"66px"} index = {i}/>
                    </li>
                </AvatarButton>
            )
        }

        return avatar_list;
    }

    async componentDidMount() {
        //Checks if id in URL corresponds with our id. If it does, we can see edit button
        let url_id = this.props.match.params.id;

        if (url_id !== localStorage.getItem('id')) {
            this.goToMenu();
        }
        console.log('Token: '+localStorage.getItem('token'))
        console.log('Id in params: '+url_id)
        try {
            const resp = await api.get('/users/'+localStorage.getItem('id'), { headers: {'Token': localStorage.getItem('token')}});

            let response = resp.data;
            console.log('requested data:', resp.data);
            if (response.avatarId ===0) {
                response.avatarId = 1;
            }
            await this.setState({user: response,
            avatarClicked: response.avatarId});


        }
        catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
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
        console.log(response)
        try {

            await api.put('/users/'+localStorage.getItem('id'), response, { headers: {'Token': localStorage.getItem('token')}});
            let reload = this.state.newUsername || this.state.newPassword || this.state.newAvatarId;
            this.state.newUsername=null;
            this.state.newPassword=null;
            this.state.newAvatarId=null;
            this.goToSettings();
            if (reload) {
                window.location.reload()
            }
        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }

    }

    goToSettings() {
        this.props.history.push('/settings/'+localStorage.getItem('id'))
    }



    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    goBack() {
        if (this.state.editClicked === false) {
            this.props.history.push('/menu');
        }
        else {
            this.setState({
                editClicked: false,
                newUsername: null,
                newPassword: null,
                newAvatarId: null,
                avatarClicked: null
            })
            window.location.reload();
        }

    }

    giveAvatarString(id) {
        if (id <10) {
            return '00'+id;
        }
        else {
            return '0'+id
        }
    }


    render() {
        //Shows user information

        return(
                    <BaseContainer>
                        <Header height={140} top={33}/>
                        {!this.state.user ?
                            null
                            :
                            <div>
                            <Row>
                                <RoundContainer onClick={() => {
                                    this.goBack()
                                }}>
                                    <BackIcon/>
                                </RoundContainer>
                            </Row>


                        {this.state.editClicked ? null :
                            <FormContainer>
                            <PlayerStatCard user={this.state.user}/>

                            <Button
                            width="30%"
                            onClick={() => {
                            this.setState({editClicked: true});
                        }}
                            >

                            Edit Profile
                            </Button>
                            </FormContainer>}
                        {this.state.editClicked ?
                            <div>
                            <Column>
                            <Label>Enter new Username</Label>
                                <div></div>
                            <InputField
                            placeholder="Enter here.."
                            onChange={e => {
                            this.handleInputChange('newUsername', e.target.value);
                        }}
                            />
                            <div></div>
                            <Label>Enter new Password</Label>
                                <div></div>
                            <InputField
                            placeholder="Enter here.."
                            onChange={e => {
                            this.handleInputChange('newPassword', e.target.value);
                        }}
                            />
                            <ButtonContainer>
                            <Button
                            width="55%"
                            onClick={() => {
                            this.setState({editClicked: false});
                            this.save();
                        }}
                            >
                            Save
                            </Button>
                            </ButtonContainer>
                            </Column>
                            <Column>
                            <Label>Choose new Avatar</Label>
                            <AvatarContainer>
                            {
                                this.createAvatarList()
                            }
                            </AvatarContainer>
                            </Column>

                            </div>
                            : null
                        }
                            </div>
                        }
                    </BaseContainer>

        );
    }

}
export default withRouter(Settings);