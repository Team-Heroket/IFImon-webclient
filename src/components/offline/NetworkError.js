import React from 'react';
import {BaseContainer, FormContainer} from "../../helpers/layout";
import Header from "../../views/Header";
import styled from "styled-components";
import {withRouter} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {LogOutButton} from "../../views/design/Button";
import {api} from "../../helpers/api";
import {Alert} from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";




const Label = styled.label`
  position: relative;
  font-size: 30px;
  
  text-align: center
  color: white;
  font-weight: 300;
 
  
`;

class NetworkError extends React.Component {

    constructor() {
        super();
        this.state = {
            openInfo: false
        }
    }

    componentDidMount() {
        this.testServer(false)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.openInfo == false && this.state.openInfo==true) {
            setTimeout(()=> {
                this.setState({openInfo: false})
            }, 5000)
        }
    }

    async testServer(wasClicked) {
        try {
            await api.get('/cards/1', { headers: {'Token': '1'}});
        }
        catch (error) {
            if (error.response) {
                this.props.history.push('/login')
            }
            else {
                if (wasClicked) {
                    this.setState({'openInfo':true})
                }

            }
        }
    }


    render() {
        return (
            <BaseContainer>
                <Header height={140} top={33}/>
                <FormContainer margin={'100px'}>
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
                            Server is still unreachable
                        </Alert>
                        <br/>
                    </Collapse>
                        <Label>
                            Server is offline
                        </Label>
                        <img src={require('../shared/images/error/pikachu_error.gif')} height={"375px"} width={"500px"} resizeMode={'contain'} />
                        <LogOutButton
                            width="20%"
                            onClick={() => {
                                this.testServer(true);
                            }}
                        >
                            Try Again
                        </LogOutButton>

                </FormContainer>
            </BaseContainer>
        );
    }
}


export default withRouter(NetworkError);
