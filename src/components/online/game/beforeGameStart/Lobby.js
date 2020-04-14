import React from 'react';
import {withRouter} from "react-router-dom";
import {BaseContainer, ButtonContainer, FormContainer, PokeCodeContainer, PlayerContainer} from "../../../../helpers/layout";
import Header from "../../../../views/Header";
import styled from "styled-components";
import {Button, MenuButton, RoundContainer, TransparentButton} from "../../../../views/design/Button";
import {BackIcon} from "../../../../views/design/Icons";
import {api, handleError} from "../../../../helpers/api";
import {Spinner} from "../../../../views/design/Spinner";
import {Player, PlayerAdmin, PlayerMe, PlayerMeAndAdmin, PlayerStatCard} from "../../../../views/Player";


const Row = styled.div`
    &::after{
    content: "";
    clear: "";
    display: table "";
    }
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
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const Label = styled.label`
  position: relative;
  transform : translate(-50%, 0%);
  width: 400px;
  left: 50%;
  color: white;
  margin-left: 50px;
  margin-bottom: 10px;
  text-transform: uppercase;
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

const Column = styled.div`
    float: right
    align-items: center
    width = 100%
    
    @media only screen and (min-width: 768px){
    width: 50%;
    }
`





class Lobby extends React.Component {

    recurrentTimer= null;
    totalTimer=null;

    constructor() {
        super();

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
            creationTime: null
        };
    }



    getTimePassed(start) {
        let startmili = parseInt(new Date(start).getTime(),10);
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
                if (resp2.players[i].user.id == localStorage.getItem('id')) {
                    this.setState({user: resp2.players[i].user}) }
            }

            if (resp2.state == "RUNNING") {
                this.goToIntermediary()
            }

            await this.setState({
                admin: resp2.creator.user,
                users: usersList,
                state: resp2.state,
                creationTime: resp2.creationTime.toString()
            })

            this.setState({'creationTime' : this.state.creationTime.substring(0, 10) + 'T' + this.state.creationTime.substring(11)});




        } catch (error) {
            this.goToSocialMode();
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
        }, 30000)
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


    goToIntermediary() {
        this.props.history.push('/intermediary')
    }

    goToGame() {
        this.props.history.push('/game/'+this.props.match.params.pokeCode)
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
                    this.goToIntermediary()
                }, remainingTime)
            }
        }, 100)

    }



    async componentDidMount() {

        this.setState({pokeCode: this.props.match.params.pokeCode});
        this.getAndSetUserInformation();
        this.getUpdate();
        this.setTimerUntilStart();
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
                playerBox=<PlayerMeAndAdmin user={player}/>
            }
            else {
                playerBox=<PlayerMe user={player}/>
            }
        }
        else if (player.username === this.state.admin.username) {
            playerBox=<PlayerAdmin user={player}/>
        }
        else {
            playerBox=<Player user={player}/>
        }

        return playerBox;


    }


    render() {

        return (
            <BaseContainer>
                <Header height={140} top={33} />
                {(!this.state.users || !this.state.admin || !this.state.user || !this.state.creationTime) ? (
                    <Spinner/> ) :
                <div>
                    {console.log("Went in main")}
                <Row>
                    <RoundContainer onClick={() => {
                        this.goBack()
                    }}>
                        <BackIcon/>
                    </RoundContainer>
                </Row>
                <FormContainer>
                    <Form>
                        <Label>
                            Your Lobby's PokeCode
                        </Label>

                        <PokeCodeContainer
                            width="50%"
                        >
                            {this.props.match.params.pokeCode}
                        </PokeCodeContainer>
                        <Space/>
                        <Label2>
                            Waiting for Players ({this.state.users.length}/{this.state.amount})
                        </Label2>

                        <ButtonContainer>
                            {
                                this.state.users.map(player => {
                                    return (

                                        <PlayerContainer onClick={() => {
                                            console.log('Player Clicked:', player);
                                            this.setState({displaySecondaryCard: player.user});
                                            console.log(this.state.displaySecondaryCard);
                                        }}>
                                            {this.displayPlayer(player)}

                                        </PlayerContainer>


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
                </FormContainer>
                </div>
                }
            </BaseContainer>

        );
    }


}
export default withRouter(Lobby);