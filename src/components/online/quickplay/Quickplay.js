import React from 'react';
import {withRouter} from "react-router-dom";
import {BaseContainer, FormContainer} from "../../../helpers/layout";
import Header from "../../../views/Header";
import styled from "styled-components";
import {BackButton, BackIcon} from "../../../views/design/Icons";
import {api, handleError} from "../../../helpers/api";
import {Spinner} from "../../../views/design/Spinner";



const Space = styled.div`
  margin-bottom: 45px
`;




class Quickplay extends React.Component {

    constructor() {
        super();
        this.state = {
            pokeCode: null
        };
    }
    async quickplay() {
        try {
            console.log('requesting new game')
            const requestBody = JSON.stringify({
                gameName: 'lol',
                mode: "SINGLE_PLAYER",

            });
            const request = await api.post('/games', requestBody, {headers: {'Token': localStorage.getItem('token')}});
            this.props.history.push(`/lobby/`+(request.data).token);
        } catch (error) {
            alert(`Something went wrong during the quickplay creation: \n${handleError(error)}`);
        }
    }

    componentDidMount() {
        this.quickplay();
    }

    render() {
        return (
            <BaseContainer>
                <Header height={140} top={33}/>
                <BackButton action={() => {this.goBack()}}/>
                <FormContainer>
                    <Space/>
                    <Spinner/>
                </FormContainer>
            </BaseContainer>
        );
    }



}
export default withRouter(Quickplay);