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
    TextRoundContainer
} from "../../../../views/design/Button";
import {BackButton, KickIcon, SoundButton} from "../../../../views/design/Icons";
import {api, handleError} from "../../../../helpers/api";
import {Player, PlayerAdmin, PlayerMe, PlayerMeAndAdmin} from "../../../../views/Player";
import {Spinner} from "../../../../views/design/Spinner";
import {CenterContainer} from "./Lobby";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import withStyles from "@material-ui/core/styles/withStyles";

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


const PrettoSlider = withStyles({
    root: {
        color: '#FFFFFF',
        height: 8,
    },
    thumb: {
        height: 15,
        width: 15,
        backgroundColor: '#FFFFFF',
        border: '2px solid currentColor',
        marginTop: -5,
        marginLeft: -7,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    mark: {
        backgroundColor: 'white',
        height: 15,
        width: 1,
        marginTop: -5,
    },
    markActive: {
        opacity: 1,
        backgroundColor: 'currentColor',
    },
    active: {},
    valueLabel: {
        color: 'white',

        '& *': {
            background: 'white',
            color: 'green',
        },
    },

    track: {
        height: 5,
        borderRadius: 4,
    },
    rail: {
        height: 5,
        borderRadius: 4,
    },

})(Slider);

const marks = [
    {
        value: 1,
        label: '1',
    },
    {
        value: 2,
        label: '2',
    },
    {
        value: 3,
        label: '3',
    },
    {
        value: 4,
        label: '4',
    },
    {
        value: 5,
        label: '5',
    },
    {
        value: 6,
        label: '6',
    },
    {
        value: 7,
        label: '7',
    },
];




class CreateGame extends React.Component {

    constructor() {
        super();
        this.state = {
            pokeCode: null,
            amountOfPlayers: 6,
            amountOfCards: 5,
            amountOfNPC: 0,
            regexp: /^[1-6\b]$/,
            regexpCards: /^[2-6\b]$/,
            message: '',
            users: null,
            admin: null,
            user: null,
            selectedUser: false,
            timestamp: new Date(),
            state: null,
            amIAdmin: true,
            creationTime: null,
            startingGame: false,
            generation: 1
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
        console.log("Creation Time Check: "+ this.state.creationTime)
        this.setTimerUntilStart()

    }

    async getAndSetUserInformation() {
        try {

            console.log("tried right now");


            const response1 = await api.get('/users/' + localStorage.getItem('id'), {headers: {'Token': localStorage.getItem('token')}});
            let resp1 = response1.data;

            const response2 = await api.get('/games/' + this.state.pokeCode.toString(), {headers: {'Token': localStorage.getItem('token')}});
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
                amIAdmin: amIAdmin1,
                creationTime: resp2.creationTime
            })
            console.log("creationTime in here: "+ resp2.creationTime)
            this.setState({'creationTime' : this.state.creationTime});


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
        console.log("entred startGame")
        console.log("Amount of NPC's: "+this.state.amountOfNPC)
        try {

            const requestBody = JSON.stringify({
                npc: this.state.amountOfNPC,
                card: this.state.amountOfCards,
                generation: this.state.generation
            });
            this.setState({startingGame: true})
            await api.put('/games/' + this.state.pokeCode.toString(), requestBody, {headers: {'Token': localStorage.getItem('token')}});
            this.goToGame();

        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }

    goToGame() {
        this.props.history.push('/game/'+this.state.pokeCode)
    }

    async kick(player) {
        try {

            const requestBody = JSON.stringify({
                action: "KICK",
                id: player.id
            });
            await api.put('/games/' + this.state.pokeCode.toString() + "/players", requestBody, {headers: {'Token': localStorage.getItem('token')}});
            this.getAndSetUserInformation();

        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }

    }

    goToSocialMode() {
        this.props.history.push('/socialmode')
    }

    getTimePassed(start) {
        let startmili = parseInt(start, 10);
        let nowmili = parseInt(new Date().getTime(), 10)
        console.log('startMil', startmili);
        console.log('nowMili', nowmili);
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

        setTimeout(() => {


            console.log('state.creation time', this.state.creationTime);
            let timePassed = this.getTimePassed(this.state.creationTime);
            console.log("Time passed: " + timePassed)
            if (timePassed > 240000) {
                this.goToSocialMode();
            } else {
                let remainingTime = 240000 - timePassed;
                console.log("Remaining Time: "+ remainingTime)
                this.totalTimer = setTimeout(() => {
                    if (this.state.amIAdmin) {
                        this.startGame()
                    }
                    this.goToGame()
                }, remainingTime)

            }
        }, 1000)
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

    handleCardsEvent(value) {
        if (this.state.regexpCards.test(this.state.amountOfCards + value) && (this.state.amountOfCards + value <= 6)) {
            this.setState({amountOfCards: this.state.amountOfCards + value});

        } else {
            if (this.state.amountOfCards >= 6) {
                this.setState({amountOfCards: 6})
            } else {
                this.setState({amountOfCards: 2})
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
                playerBox = <PlayerMeAndAdmin user={player} style={{width: '330px'}}/>
            } else {
                playerBox = <PlayerMe user={player}/>
            }
        } else if (player.username === this.state.admin.username) {
            playerBox = <PlayerAdmin user={player} style={{width: '330px'}}/>
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
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                >
                    <BackButton action={() => {this.goBack()}}/>
                    {localStorage.getItem('VolumeMuted')=='true'?
                        <SoundButton mute={false} action={()=>{
                            localStorage.setItem('VolumeMuted', 'false');
                            this.forceUpdate()}} />
                        :
                        <SoundButton mute={true} action={() => {
                            localStorage.setItem('VolumeMuted', 'true');
                            this.forceUpdate()}} />
                    }
                </Grid>

                    {(!this.state.users || !this.state.admin || this.state.startingGame) ? (
                        <Spinner/>) : <div>
                        <ErrorMessage> {this.state.message ? (
                            this.state.message
                        ) : <br/>
                        } </ErrorMessage>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                        <FormContainer width={'500px'}>
                        <Label>Your Lobby's PokeCode</Label>
                        <PokeCodeContainer
                            onClick={this.copyTextToClipboard(this.state.pokeCode.toString())}
                            width="330px"
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
                        <Label>Amount of Cards: </Label>
                        <SimpleContainer width={"55%"} defFloat={"center"}>
                            <Column width={"15%"} floate={"left"}>
                                <TextRoundContainer onClick={() => this.handleCardsEvent(-1)}>
                                    -
                                </TextRoundContainer>
                            </Column>
                            <Column width={"250px"} floate={"center"}>
                                <InputField
                                    width={"250px"}
                                    value={this.state.amountOfCards}/>
                            </Column>
                            <Column width={'15%'} floate={"right"}>
                                <TextRoundContainer onClick={() => this.handleCardsEvent(1)}>
                                    +
                                </TextRoundContainer>
                            </Column>


                        </SimpleContainer>
                        <br/>
                        <Label>Generation(s): </Label>
                        <SimpleContainer width={"320px"} defFloat={"center"}>
                            <PrettoSlider
                                color = "white"
                                aria-labelledby="discrete-slider-small-steps"
                                marks = {marks}
                                min={1}
                                max={7}
                                valueLabelDisplay="auto"
                                defaultValue={1}
                                aria-labelledby="discrete-slider-restrict"
                                onChange={(e,val)=> {this.setState({generation: val})}}
                            />
                        </SimpleContainer>
                            </FormContainer>



                        <FormContainer width={'500px'}>
                        <Label>Waiting for Players ({this.state.users.length}/{this.state.amountOfPlayers})</Label>
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
                                            { (player.id == localStorage.getItem('id')) ? null :
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
                                    width="330px"
                                    disabled={this.state.users.length + this.state.amountOfNPC < 2}
                                    onClick={() => {
                                        this.startGame();
                                    }}>
                                    Start
                                </MenuButton>
                                : null}
                            <LogOutButton
                                width="100%"
                                onClick={() => {
                                    this.goBack();
                                }}>
                                Leave Lobby
                            </LogOutButton>
                        </CenterContainer>
                        </FormContainer>
                        </Grid>
                    </div>
                    }

            </BaseContainer>
        );

    }

}

export default withRouter(CreateGame);