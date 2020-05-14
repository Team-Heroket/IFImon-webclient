import React from 'react';
import {withRouter} from "react-router-dom";
import {
    BaseContainer,
    ButtonContainer,
    FormContainer,
    PokeCodeContainer,
    PlayerContainer,
    SimpleContainer
} from "../../../../helpers/layout";
import Header from "../../../../views/Header";
import styled from "styled-components";
import {ButtonRow, MenuButton} from "../../../../views/design/Button";
import {BackButton, SoundButton} from "../../../../views/design/Icons";
import {api, handleError} from "../../../../helpers/api";
import {Spinner} from "../../../../views/design/Spinner";
import {Player, PlayerAdmin, PlayerMe, PlayerMeAndAdmin, PlayerStatCard} from "../../../../views/Player";
import Grid from "@material-ui/core/Grid";
import {Alert} from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";
import {PopupboxContainer, PopupboxManager} from "react-popupbox";



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


const Label2 = styled.label`
  position: relative;
  transform : translate(-50%, 0%);
  width: 400px;
  left: 50%;
  color: white;
  margin-bottom: 10px;
  
  text-align: center;
  font-weight: 500;
  font-size: 20px;
`;

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  align-items: center;
  justify-content: center;
`;


const Space = styled.div`
  margin-bottom: 45px
`;






class Lobby extends React.Component {

    recurrentTimer= null;
    totalTimer=null;

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            pokeCode: null,
            users: null,
            admin: null,
            user: null,
            amount: 6,
            displaySecondaryCard: false,
            timestamp: new Date(),
            //timestamp: "2020-04-09 21:09:00",
            npcs: 0,
            state: null,
            creationTime: null,
            displayPlayer: null,
            bots: false
        };
    }



    getTimePassed(start) {
        let startmili = parseInt(start,10);
        console.log("startmili: "+ startmili)
        let nowmili = parseInt(new Date().getTime(), 10)
        console.log(startmili);
        console.log(nowmili);
        let remainingTime = nowmili-startmili;
        return remainingTime;
    }



    async getAndSetUserInformation() {
        try {

            console.log("tried right now");

            const response2 = await api.get('/games/'+this.props.match.params.pokeCode.toString(), { headers: {'Token': localStorage.getItem('token')}});
            const resp2 = response2.data;
            let usersList = [];

            for (let i=0; i<resp2.players.length; i++) {
                usersList.push(resp2.players[i].user)
                if (resp2.players[i].user.npc == true) {
                    this.setState({bots: true})
                }
                if (resp2.players[i].user.id == localStorage.getItem('id')) {
                    this.setState({user: resp2.players[i].user}) }
            }

            if (resp2.state == "RUNNING") {
                this.goToGame()
            }

            await this.setState({
                admin: resp2.creator.user,
                users: usersList,
                state: resp2.state,
                creationTime: resp2.creationTime
            })

            this.setState({'creationTime' : this.state.creationTime}, this.setTimerUntilStart);




        } catch (error) {
            localStorage.setItem('info', 'You were kicked from the lobby!')
            this.goToSocialMode();
        }
    }

    async getUpdate() {
        this.recurrentTimer = setInterval(() => {
            try {
                console.log("tried after 30 seconds");

                this.getAndSetUserInformation();


            } catch (error) {
                alert(`Something went wrong: \n${handleError(error)}`);
            }
        }, 10000)
    }

    async leaveGame() {
        try {
            const requestBody = JSON.stringify({
                id: this.state.user.id,
                action: "LEAVE"
            });
            console.log(requestBody);
            console.log(this.state.pokeCode)
            await api.put('/games/'+this.state.pokeCode+'/players', requestBody,{ headers: {'Token': localStorage.getItem('token')}});
        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }
    }

    goToSocialMode() {
        this.props.history.push('/socialmode');
    }


    goToGame() {
        this.props.history.push('/game/'+this.state.pokeCode)
    }


    async setTimerUntilStart() {
        console.log("CreationTime: "+this.state.creationTime)
        setTimeout(() => {
            let timePassed = this.getTimePassed(this.state.creationTime);
            console.log("Time passed: "+timePassed)
            if (timePassed > 240000) {
                this.goToSocialMode();
            }
            else {
                let remainingTime = 240000-timePassed;
                console.log("Remaining Time: "+ remainingTime)
                this.totalTimer = setTimeout(() => {
                    this.goToGame()
                }, remainingTime)
            }
        }, 100)

    }



    async componentDidMount() {

        this.setState({pokeCode: this.props.match.params.pokeCode});

        this.getAndSetUserInformation();
        setTimeout(() => {
            if (this.state.admin.id == localStorage.getItem('id')) {
                this.setState({openSuccess: true});
                setTimeout(() => {
                    this.setState({openSuccess: false});
                }, 5000);
            }
        },100)


        this.getUpdate();


    }

    componentDidUpdate() {
        if (this.state.users && this.state.user) {
            let kicked = true;
            for (let i=0; i<this.state.users.length; i++) {
                if (this.state.users[i].username == this.state.user.username) {
                    kicked = false;
                    break;
                }
            }
            if (kicked) {
                this.goToSocialMode();
            }
            else if (this.state.state == "RUNNING") {
                this.goToGame();
            }
        }

    }


    componentWillUnmount() {
        clearInterval(this.recurrentTimer);
        this.recurrentTimer=null;
        clearTimeout(this.totalTimer);
        this.totalTimer=null;
    }



    goBack() {
        this.leaveGame();
        this.props.history.push('/socialmode');
    }

    displayPlayer(player) {
        let playerBox = null;
        if (player.username === this.state.user.username) {
            if (player.username === this.state.admin.username) {
                playerBox=<PlayerMeAndAdmin user={player} lobby={true}/>
            }
            else {
                playerBox=<PlayerMe user={player}/>
            }
        }
        else if (player.username === this.state.admin.username) {
            playerBox=<PlayerAdmin user={player} lobby={true}/>
        }
        else {
            playerBox=<Player user={player}/>
        }

        return playerBox;


    }

    async handleClick(event) {
        try {
            const resp = await api.get('/users/'+event.currentTarget.id, { headers: {'Token': localStorage.getItem('token')}});
            let response = resp.data;
            await this.setState({displayPlayer: response});
        }
        catch (e) {
        }

        const content = <SimpleContainer>
            {this.state.displayPlayer ? <PlayerStatCard user={this.state.displayPlayer} /> : <Spinner/>}
        </SimpleContainer>

        PopupboxManager.open({
            content,
            config: {

                fadeIn: true,
                fadeInSpeed: 500,
                onClosed: this.setState({'displayPlayer': null})
            }
        })
    }


    render() {

        return (
            <BaseContainer>
                <Header height={140} top={33} />


                {(!this.state.users || !this.state.admin || !this.state.user || !this.state.creationTime) ? (
                    <Spinner/> ) :
                <div>
                    {console.log("Went in main")}
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="flex-start"
                    >
                        <BackButton
                            action={() => {this.goBack()}}/>
                        {localStorage.getItem('VolumeMuted')=='true'?
                            <SoundButton mute={true} action={()=>{
                                localStorage.setItem('VolumeMuted', 'false');
                                this.forceUpdate()}} />
                            :
                            <SoundButton mute={false} action={() => {
                                localStorage.setItem('VolumeMuted', 'true');
                                this.forceUpdate()}} />
                        }
                    </Grid>
                <FormContainer>
                    <Form>
                        <CenterContainer >
                            <Collapse in={this.state.openSuccess}>
                                <Alert severity="success"
                                       action={
                                           <IconButton
                                               aria-label="close"
                                               color="inherit"
                                               size="small"
                                               onClick={() => {
                                                   this.setState({openSuccess: false});
                                               }}
                                           >
                                               <CloseIcon fontSize="inherit"/>
                                           </IconButton>
                                       }
                                >
                                    Game successfully initialized! Please wait for it to start
                                </Alert>
                                <br/>
                            </Collapse>
                        </CenterContainer>

                        <Label2>
                            Your Lobby's PokeCode
                        </Label2>

                        <PokeCodeContainer
                            width="50%"
                        >
                            {this.props.match.params.pokeCode}
                        </PokeCodeContainer>
                        <Space/>
                        {this.state.admin.id == localStorage.getItem('id') ? <Label2>Waiting for Game to start</Label2> :
                            <Label2>
                                Waiting for Players ({this.state.users.length}/{this.state.amount})
                            </Label2>}
                        <ButtonContainer>
                            {
                                this.state.users.map(player => {
                                    return (
                                        <ButtonRow id={player.id} onClick={this.handleClick}>
                                            <PlayerContainer onClick={() => {

                                            }}>
                                                {this.displayPlayer(player)}

                                            </PlayerContainer>
                                        </ButtonRow>

                                    );
                                })
                            }
                        </ButtonContainer>

                        <CenterContainer>

                            <Spinner/>

                            <MenuButton
                                width = "50%"

                                onClick={() => {
                                    this.leaveGame();
                                    this.goToSocialMode();
                                }}>
                                Leave
                            </MenuButton>

                        </CenterContainer>

                    </Form>
                    <PopupboxContainer style={{color: '#FFFFFF', background: 'transparent', justifyContent: 'center', alignContent: 'center', boxShadow: '0px 0px 0px -200px rgba(0,0,0,0)'}}/>
                </FormContainer>

                </div>
                }
            </BaseContainer>

        );
    }


}
export default withRouter(Lobby);