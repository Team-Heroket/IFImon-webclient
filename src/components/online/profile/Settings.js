import React from 'react';
import styled from 'styled-components';
import {
    AvatarContainer,
    BaseContainer,
    ButtonContainer,
    FormContainer,
    SimpleColumnContainer
} from '../../../helpers/layout';
import { api, handleError } from '../../../helpers/api';
import { withRouter } from 'react-router-dom';
import {Button, AvatarButton} from '../../../views/design/Button';
import Header from "../../../views/Header";
import { PlayerStatCard} from "../../../views/Player";
import {BackButton,  SoundButton} from "../../../views/design/Icons";
import Slider from '@material-ui/core/Slider';
import VolumeDownRoundedIcon from '@material-ui/icons/VolumeDownRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import Grid from "@material-ui/core/Grid";
import UIFx from 'uifx';
import pokeCry from '../../shared/pikachu.mp3';
import music from '../../shared/musicSample.mp3';

const Label = styled.label`
  position: relative;
  left: 10px;
  
  color: white;
  width: ${props => props.width ? props.width : '400px'};
  margin-left: 4px;
  margin-bottom: 5px;
  text-transform: ${props => props.transform ? null : 'uppercase'};
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
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            user: null,
            editClicked: false,
            newUsername: null,
            newPassword: null,
            passwordRepeat: null,
            newAvatarId: null,
            avatarClicked: null,
            mute: localStorage.getItem('VolumeMuted') ? localStorage.getItem('VolumeMuted') : 'false',
            SFXVol :  (localStorage.getItem('SFXVol') ?  localStorage.getItem('SFXVol') : 50),
            MusicVol :  (localStorage.getItem('MusicVol') ?  localStorage.getItem('MusicVol') : 50),
            runningSample: false,
            saveClicked: false
        };
    }

    checkPassword() {
        if (this.state.newPassword) {
            if (this.state.newPassword.length < 8) {
                return "Password must be at least 8 characters long";
            }

            else if (!this.hasUpperCase(this.state.newPassword)) {
                return "Password must contain at least one capital letter"
            }
            else if (!this.hasLowerCase(this.state.newPassword)) {
                return "Password must contain at least one lower case letter"
            }
            else if (!this.hasNumber(this.state.newPassword)) {
                return "Password must contain at least one number"
            }
            else {
                return null;
            }
        }

    }
    hasUpperCase(word) {
        let hasUpper = false
        console.log("word length is: "+word.length)
        let i=0;
        while (i<word.length) {
            let character = word.charAt(i);
            if (!isNaN(character * 1)){
            }else{
                if (character == character.toUpperCase()) {
                    hasUpper = true;
                    return hasUpper;
                }
            }
            i++;
        }
        return hasUpper;
    }

    hasLowerCase(word) {
        let hasLower = false
        let i=0;
        while (i<word.length) {
            let character = word.charAt(i);
            if (!isNaN(character * 1)){

            }else{
                if (character == character.toLowerCase()) {
                    hasLower = true;
                    return hasLower;
                }
            }
            i++;
        }
        return false;
    }

    hasNumber(word) {
        let hasLower = false
        let i=0;
        while (i<word.length) {
            let character = word.charAt(i);
            if (!isNaN(character * 1)){
                hasLower = true;
                return hasLower
            }
            i++;
        }
        return false;
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
            if (error.response.status == 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('id');
                this.props.history.push('/login')
            }
            else {
                alert(`Something went wrong: \n${handleError(error)}`);
            }
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

            this.setState({
                newUsername: null,
                newPassword: null,
                newAvatarId: null
            })
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

    handleChange(key, newValue) {

        if(key=='SFXVol'){
            localStorage.setItem('SFXVol', newValue);
            if(!this.state.runningSample){
                this.setState({runningSample: true});
                const beep = new UIFx(pokeCry);
                beep.setVolume(newValue/100).play();
                setTimeout(() => {
                    this.setState({runningSample: false})}, 500)}
        }else{
            localStorage.setItem('MusicVol', newValue);
            if(!this.state.runningSample){
                this.setState({runningSample: true});
                const beep = new UIFx(music);
                beep.setVolume(newValue/100).play();
                setTimeout(() => {
                    this.setState({runningSample: false})}, 1000)}
        }
        this.setState({ [key]: newValue });

    };

    render() {
        //Shows user information
        return(
            <BaseContainer>
                <Header height={140} top={33}/>
                <BackButton action={() => {this.goBack()}}/>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <FormContainer margin={'5em'} >
                        {!this.state.user ? null :
                            <div>
                            {this.state.editClicked ? null :
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <SimpleColumnContainer width={'400px'}>
                                        <SimpleColumnContainer width={'300px'}>
                                            <Label transform={true} width={'100%'}>
                                                Sound Effects Volume
                                            </Label>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <VolumeDownRoundedIcon style={{ color: "white" }}/>
                                            </Grid>
                                            <Grid item xs>
                                                {this.state.mute == 'true'? <Slider disabled value={this.state.SFXVol} onChange={(e,val)=> {this.handleChange('SFXVol', val)}} aria-labelledby="continuous-slider" /> :
                                                    <Slider value={this.state.SFXVol} onChange={(e,val)=> {this.handleChange('SFXVol', val)}} aria-labelledby="continuous-slider" />}
                                            </Grid>
                                            <Grid item>
                                                <VolumeUpRoundedIcon style={{ color: "white" }}/>
                                            </Grid>
                                        </Grid>
                                        </SimpleColumnContainer>
                                        <br/>
                                        <SimpleColumnContainer width={'300px'}>
                                            <Label transform={true} width={'100%'}>
                                                Background Music
                                            </Label>
                                            <Grid container spacing={2}>
                                                <Grid item>
                                                    <VolumeDownRoundedIcon style={{ color: "white" }}/>
                                                </Grid>
                                                <Grid item xs>
                                                    {this.state.mute == 'true' ? <Slider disabled value={this.state.MusicVol} onChange={(e,val) => {
                                                            this.handleChange('MusicVol', val)}} aria-labelledby="continuous-slider" /> :
                                                        <Slider value={this.state.MusicVol} onChange={(e, val) => {
                                                            this.handleChange('MusicVol', val)
                                                        }} aria-labelledby="continuous-slider"/>
                                                    }
                                                </Grid>
                                                <Grid item>
                                                    <VolumeUpRoundedIcon style={{ color: "white" }}/>
                                                </Grid>
                                            </Grid>
                                        </SimpleColumnContainer>
                                        <br/>
                                        { this.state.mute=='true' ?
                                            <SoundButton mute={true} action={()=>{
                                                localStorage.setItem('VolumeMuted', 'false');
                                                this.setState({mute: 'false'});
                                                this.forceUpdate();
                                            }} />
                                            :
                                            <SoundButton mute={false} action={() => {
                                                localStorage.setItem('VolumeMuted', 'true');
                                                this.setState({mute: 'true'});
                                                this.forceUpdate()}} />
                                        }
                                    </SimpleColumnContainer>
                                    <SimpleColumnContainer>
                                        <PlayerStatCard user={this.state.user}/>
                                        <Button width="30%"
                                                onClick={() => {this.setState({editClicked: true});}}
                                        >
                                            Edit Profile
                                        </Button>
                                    </SimpleColumnContainer>
                                </Grid>
                            }
                            {this.state.editClicked ?
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                >
                                <SimpleColumnContainer>
                                    <Label>Enter new Username</Label>
                                    <InputField
                                    placeholder="Enter here.."
                                    onChange={e => {
                                        this.handleInputChange('newUsername', e.target.value);
                                    }}
                                    />
                                    <Label>Enter New Password</Label>
                                    <PasswordField
                                        placeholder="Enter here.."
                                        onChange={e => {
                                            this.handleInputChange('newPassword', e.target.value);
                                        }}
                                        style={this.checkPassword() ? ({'margin-bottom': '5px'}) : ({'margin-bottom': '20px'})}
                                        onKeyDown={this.keyPress}
                                    />

                                    <Label
                                        style={{'font-size': '13px', color: 'red', 'font-weight': '400'}}
                                    >
                                        {this.state.newPassword ? this.checkPassword(): null}
                                    </Label>

                                    <Label>Enter New Password Again</Label>
                                    <PasswordField
                                        placeholder="Enter here.."

                                        style = {this.state.newPassword ? ((this.state.newPassword == this.state.passwordRepeat) ? ({background: 'rgba(27, 253, 78, 0.3)'}) : ({background: 'rgba(255, 0, 0, 0.3)'}))
                                            : ({background: 'rgba(255, 255, 255, 0.2)'})}
                                        onChange={e => {
                                            this.handleInputChange('passwordRepeat', e.target.value);
                                        }}
                                        onKeyDown={this.keyPress}
                                    />
                                    <ButtonContainer>
                                    <Button
                                    width="150px"
                                    disabled = {!((this.state.newPassword && this.state.newPassword==this.state.passwordRepeat && !this.checkPassword()) || (!this.state.newPassword && (this.state.newUsername || this.state.newAvatarId)))}
                                    onClick={() => {
                                    this.setState({editClicked: false});
                                    this.save();
                                }}
                                    >
                                    Save
                                    </Button>
                                    </ButtonContainer>
                                </SimpleColumnContainer>
                                <SimpleColumnContainer>
                                    <Label>Choose new Avatar</Label>
                                    <AvatarContainer>
                                    {
                                        this.createAvatarList()
                                    }
                                    </AvatarContainer>
                                </SimpleColumnContainer>
                            </Grid>
                            : null
                        }
                            </div>
                        }
                    </FormContainer>
                </Grid>
            </BaseContainer>

        );
    }

}
export default withRouter(Settings);