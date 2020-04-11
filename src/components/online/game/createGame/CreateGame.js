import React from 'react';
import {withRouter} from "react-router-dom";
import {BaseContainer, ButtonContainer, FormContainer, PokeCodeContainer, PlayerContainer, SimpleContainer} from "../../../../helpers/layout";
import Header from "../../../../views/Header";
import styled from "styled-components";
import {
    ButtonRow,
    KickContainer,
    LogOutButton,
    MenuButton,
    RoundContainer,
    TextRoundContainer
} from "../../../../views/design/Button";
import {BackIcon, KickIcon} from "../../../../views/design/Icons";
import {api, handleError} from "../../../../helpers/api";
import {Player, PlayerAdmin, PlayerMe, PlayerMeAndAdmin} from "../../../../views/Player";
import {Spinner} from "../../../../views/design/Spinner";
import {CenterContainer} from "../beforeGameStart/Lobby";

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: auto;
  font-size: 16px;
  font-weight: 700;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const Label = styled.label`
  position: relative;
  transform : translate(-50%, 0%);
  width: 400px;
  left: 50%;
  color: white;
  margin-left: 4px;
  margin-bottom: 10px;
`;

const ErrorMessage = styled.label`
  position: relative;
  transform : translate(-50%, 0%);
  width: 400px;
  color: #FF0000
  left: 50%;
  margin-left: 4px;
  margin-bottom: 10px;
`;

const Row = styled.div`
    &::after{
    content: "";
    clear: "";
    display: table "";
    }
    `;

const Column = styled.div`
    float: ${props => props.floate};
    align-items: center;
    width = ${props => props.width}%;
    white-space: normal !important
}
    }
`

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  position: relative;
  transform : translate(-50%, 0%);
  height: 35px;
  width: ${props => props.width || "400px"};
  left: 50%;
  text-align: center;
  border: none;
  border-radius: 25px;
  margin-bottom: 10px;
  padding-left:10px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  
`;



class CreateGame extends React.Component {

    constructor() {
        super();
        this.state = {
            pokeCode: null,
            amountOfPlayers: 0,
            amountOfNPC: 0,
            regexp: /^[1-6\b]$/,
            message: '',

            users: null,
            admin: null,
            user: null,
            selectedUser: false,
            timestamp: new Date(),
            state: null,
            amIAdmin: true,
        };

        this.requestPokeCode();

    }

    async requestPokeCode() {
        try {
            console.log('requesting new game')
            const requestBody = JSON.stringify({
                gameName: 'lol',
                mode: "SOCIAL"
            });
            const request = await api.post('/games/', requestBody, {headers: {'Token': localStorage.getItem('token')}});
            console.log(request.data)
            this.setState({pokeCode: (request.data).token})

            setInterval('', 1000);

            this.getAndSetUserInformation();
            this.getUpdate();

        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    async componentDidMount() {
        this.setTimerUntilStart();
    }

    async getAndSetUserInformation() {
        try {

            console.log("tried right now");


            const response1 = await api.get('/users/' + localStorage.getItem('id'), {headers: {'Token': localStorage.getItem('token')}});
            let resp1 = response1.data;

            const response2 = await api.get('/games/' + this.state.pokeCode, {headers: {'Token': localStorage.getItem('token')}});
            const resp2 = response2.data;
            let usersList = [];
            for (let i = 0; i < resp2.players.length; i++) {
                usersList.push(resp2.players[i].user)
            }
            let amIAdmin1 = false;
            if (resp1.username == resp2.creator.user.username) {
                amIAdmin1 = true;
            }

            this.setState({
                admin: resp2.creator.user,
                users: usersList,
                user: resp1,
                state: resp2.state,
                amIAdmin: amIAdmin1
            })

            if (this.state.amountOfNPC+this.state.users.length > 6) {
                this.setState({message: "New user entered - amount of NPCs is now "+ (6-this.state.users.length)})
                this.setState({amountOfNPC: 6-this.state.users.length})
            }
            else{
                if(this.state.message){this.state.message = ''}
            }

        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }

    async getUpdate() {
        this.recurrentTimer = setInterval(() => {
            try {
                console.log("tried after 30 seconds");

                this.getAndSetUserInformation()


            } catch (error) {
                alert(`Something went wrong: \n${handleError(error)}`);
            }
        }, 10000)
    }

    async startGame() {
        try {

            const requestBody = JSON.stringify({
                username: this.state.npcs
            });
            await api.put('/games/' + this.props.match.params.pokeCode, requestBody, {headers: {'Token': localStorage.getItem('token')}});
            this.goToIntermediary();

        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }

    async kick(player) {
        try {

            const requestBody = JSON.stringify({
                action: "LEAVE",
                id: player.id
            });
            await api.put('/games/' + this.state.pokeCode + "/users", requestBody, {headers: {'Token': localStorage.getItem('token')}});
            this.goToIntermediary();

        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }

    }

    getTimePassed(start) {
        let startmili = parseInt(new Date(start).getTime(), 10);
        let nowmili = parseInt(new Date().getTime(), 10)
        console.log(startmili);
        console.log(nowmili);
        let remainingTime = nowmili - startmili;
        return remainingTime;
    }

    async leaveGame() {
        try {
            const requestBody = JSON.stringify({
                id: this.state.user.id,
                action: "LEAVE"
            });
            await api.put('/games/' + this.state.pokeCode.toString() + '/players', requestBody, {headers: {'Token': localStorage.getItem('token')}});
        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }

    goToGame() {
        this.props.history.push('/game/' + this.state.pokeCode)
    }

    componentDidUpdate() {
        if (this.state.users && this.state.user) {
            let kicked = true;
            for (let i = 0; i < this.state.users.length; i++) {
                if (this.state.users[i].username == this.state.user.username) {
                    kicked = false;
                    break;
                }
            }
            if (kicked) {
                this.goToSocialMode();
            } else if (this.state.state == "RUNNING") {
                this.goToGame();
            }
        }

    }

    componentWillUnmount() {
        clearInterval(this.recurrentTimer);
        this.recurrentTimer = null;
        clearTimeout(this.totalTimer);
        this.totalTimer = null;
    }

    async setTimerUntilStart() {
        let timePassed = this.getTimePassed(this.state.timestamp);
        console.log("Time passed: " + timePassed)
        if (timePassed > 240000) {
            this.goToSocialMode();
        } else {
            let remainingTime = 240000 - timePassed;
            this.totalTimer = setTimeout(() => {
                if (this.state.amIAdmin) {
                    this.startGame()
                }
                this.goToIntermediary()
            }, remainingTime)
        }
    }

    handleNPCEvent(value) {
        if (this.state.regexp.test(this.state.amountOfNPC + value) && (this.state.amountOfNPC + value + this.state.users.length <= 6)) {

            this.setState({message: ''})
            this.setState({amountOfNPC: this.state.amountOfNPC + value});

        } else {
            if (this.state.amountOfNPC+this.state.users.length >= 5) {
                this.setState({message: 'Maximum amount of players is 6'})
                this.setState({amountOfNPC: 6-this.state.users.length})
            } else {
                this.setState({amountOfNPC: 0})
            }
        }
    }


    goBack() {

        this.leaveGame();
        this.props.history.push('/socialmode');
    }

    displayPlayer(player) {
        let playerBox = null;
        if (player.username === this.state.user.username) {
            if (player.username === this.state.admin.username) {
                playerBox = <PlayerMeAndAdmin user={player}/>
            } else {
                playerBox = <PlayerMe user={player}/>
            }
        } else if (player.username === this.state.admin.username) {
            playerBox = <PlayerAdmin user={player}/>
        } else {
            playerBox = <Player user={player}/>
        }

        return playerBox;


    }

    fallbackCopyTextToClipboard(text) {
        let textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            let successful = document.execCommand('copy');
            let msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
    }

    copyTextToClipboard(text) {
        if (!navigator.clipboard) {
            this.fallbackCopyTextToClipboard(text);
            return;
        }
        navigator.clipboard.writeText(text).then(function() {
            console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    async createGame() {
        this.props.history.push('/createGame');
    }

    render() {

        function SelectAll(id) {
            document.getElementById(id).focus();
            document.getElementById(id).select();
            document.execCommand('copy');
        }

        return (
            <BaseContainer>
                <Header height={140} top={33}/>
                <RoundContainer onClick={() => {
                    this.goBack()
                }}>
                    <BackIcon/>
                </RoundContainer>
                <FormContainer>
                    {(!this.state.users || !this.state.admin) ? (
                        <Spinner/>) : <Form>
                        <ErrorMessage> {this.state.message ? (
                            this.state.message
                        ) : <br/>
                        } </ErrorMessage>
                        <Label>Your Lobby's PokeCode</Label>
                        <PokeCodeContainer
                            onClick={this.copyTextToClipboard(this.state.pokeCode.toString())}
                            width="55%"
                        >
                            {this.state.pokeCode}

                        </PokeCodeContainer>

                        <br/>
                        <Label>Amount of NPCs: </Label>
                        <SimpleContainer width={"55%"} defFloat={"center"}>
                                <Column width={"15%"} floate={"left"}>
                                    <TextRoundContainer onClick={() => this.handleNPCEvent(-1)}>
                                        -
                                    </TextRoundContainer>
                                </Column>
                                <Column width={"250px"} floate={"center"}>
                                    <InputField
                                        width={"250px"}
                                        value={this.state.amountOfNPC}/>
                                </Column>
                                <Column width={'15%'} floate={"right"}>
                                    <TextRoundContainer onClick={() => this.handleNPCEvent(1)}>
                                        +
                                    </TextRoundContainer>
                                </Column>
                        </SimpleContainer>
                        <br/>
                        <Label>Waiting for Players ({this.state.users.length}/{this.state.amount})</Label>
                        <ButtonContainer>
                            {
                                this.state.users.map(player => {
                                    return (
                                        <ButtonRow>
                                        <PlayerContainer onClick={() => {
                                            console.log('Player Clicked:', player);
                                            this.setState({selectedUser: player.user});
                                            console.log(this.state.selectedUser);
                                        }}>
                                            {this.displayPlayer(player)}
                                        </PlayerContainer>
                                            { (player.id == localStorage.getItem('id')) ? <SimpleContainer width={"40px"}/> :
                                                <KickContainer onClick={()=> this.kick(player)}>
                                                    <KickIcon/>
                                                </KickContainer>
                                            }
                                        </ButtonRow>
                                    );
                                })
                            }

                        </ButtonContainer>

                        <CenterContainer>

                            <Spinner/>
                            {this.state.amIAdmin ?
                                <MenuButton
                                    width="55%"
                                    onClick={() => {
                                        this.startGame();
                                    }}>
                                    Start
                                </MenuButton>
                                : null}
                            <LogOutButton
                                width="55%"
                                onClick={() => {
                                    this.goBack();
                                }}>
                                Leave Lobby
                            </LogOutButton>
                        </CenterContainer>
                    </Form>
                    }
                </FormContainer>
            </BaseContainer>
        );
    }
}

export default withRouter(CreateGame);