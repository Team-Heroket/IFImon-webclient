import React from 'react';
import {withRouter} from "react-router-dom";
import {BaseContainer, ButtonContainer, FormContainer} from "../../../../helpers/layout";
import Header from "../../../../views/Header";
import styled from "styled-components";
import {Button, TransparentButton} from "../../../../views/design/Button";
import {BackButton, OrSeparation, SoundButton} from "../../../../views/design/Icons";
import {api, handleError} from "../../../../helpers/api";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import {Alert} from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {CenterContainer} from "./Lobby";

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






class SocialMode extends React.Component {
    constructor() {
        super();
        this.keyPress = this.keyPress.bind(this);
        this.state = {
            pokeCode: null,
            openInfo: false,
            openError: false
        };
    }

    componentDidMount() {
        if (localStorage.getItem('info')!= 0) {
            this.setState({openInfo: true})
            setTimeout(() => {
                this.setState({openInfo: false})
                localStorage.setItem('info', 0)
            }, 5000)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.openError==true) {
            setTimeout(() => {
                this.setState({openError: false, errorCode: null})
            }, 5000)
        }
    }


    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    goBack() {
        this.setState({pokeCode: null});
        this.props.history.push('/menu');
    }


    keyPress(e){
        if(e.keyCode == 13 && this.state.pokeCode){
            this.join();
        }
    }

    async join() {
        //IMPORTANT: Ask backend team if they can also accept id
        //IMPOORTANT: May need token-authorization. This is not added yet
        // '/lobby/pokeCode' is not implemented yet neither as a component nor in the AppRouter
        try {
            const requestBody = JSON.stringify({
                action: "JOIN",
                id: localStorage.getItem('id')
            });
            await api.put('/games/'+this.state.pokeCode+'/players', requestBody,{ headers: {'Token': localStorage.getItem('token')}});

            // Login successfully worked --> navigate to the route /game in the GameRouter
            this.props.history.push(`/lobby/`+this.state.pokeCode);
        } catch (error) {
            if(error.response.status == 404){
                this.setState({openError: true, errorCode: 404});
            }
            else if(error.response.status == 500){
                this.setState({openError: true, errorCode: 500});
            }
        }
    }

    async createGame() {
        this.props.history.push('/createGame');
    }

    render() {

        return(
            <BaseContainer>
                <Header height={140} top={33} />
                <Row>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="flex-start"
                    >
                        <BackButton action={() => {this.goBack()}}/>
                        {localStorage.getItem('VolumeMuted')=='true'?
                            <SoundButton mute={true} action={()=>{
                                localStorage.setItem('VolumeMuted', 'false');
                                document.getElementById('MainTheme').play();
                                this.forceUpdate()}} />
                            :
                            <SoundButton mute={false} action={() => {
                                localStorage.setItem('VolumeMuted', 'true');
                                document.getElementById('MainTheme').pause();
                                this.forceUpdate()}} />
                        }
                    </Grid>
                </Row>
                <FormContainer>
                   <Form>
                       <CenterContainer >
                           <Collapse in={this.state.openInfo}>
                               <Alert severity="info"
                                      action={
                                          <IconButton
                                              aria-label="close"
                                              color="inherit"
                                              size="small"
                                              onClick={() => {
                                                  this.setState({openInfo: false});
                                              }}
                                          >
                                              <CloseIcon fontSize="inherit"/>
                                          </IconButton>
                                      }
                               >
                                   {localStorage.getItem('info')}
                               </Alert>
                               <br/>
                           </Collapse>
                           <Collapse in={this.state.openError}>
                               <Alert severity="error"
                                      action={
                                          <IconButton
                                              aria-label="close"
                                              color="inherit"
                                              size="small"
                                              onClick={() => {
                                                  this.setState({openError: false, errorCode: null});
                                              }}
                                          >
                                              <CloseIcon fontSize="inherit"/>
                                          </IconButton>
                                      }
                               >
                                   {this.state.errorCode == 404 ? 'PokeCode does not exist!' : (this.state.errorCode == 500 ? 'Internal Server Error' : null)}
                               </Alert>
                               <br/>
                           </Collapse>
                       </CenterContainer>
                       <InputField
                           placeholder="Enter PokeCode"
                           width={"55%"}
                           onChange={e => {
                               this.handleInputChange('pokeCode', e.target.value);
                           }}
                           onKeyDown={this.keyPress}/>
                       <ButtonContainer>
                           <Button
                               disabled={!this.state.pokeCode}
                               width="55%"
                               onClick={() => {
                                   this.join();
                               }}
                           >
                               Join
                           </Button>
                           <OrSeparation />
                           <TransparentButton
                               width = "55%"
                               onClick={() => {
                                   this.createGame();
                               }}
                           >
                               New Game
                           </TransparentButton>
                       </ButtonContainer>
                       <div>

                       </div>
                   </Form>

                </FormContainer>

            </BaseContainer>

        );
    }
}

export default withRouter(SocialMode);