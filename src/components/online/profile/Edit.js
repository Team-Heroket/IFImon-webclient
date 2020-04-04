import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../../helpers/layout';
import { api, handleError } from '../../../helpers/api';
import User from '../../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../../views/design/Button';

class Edit extends React.Component {

    constructor() {
        super();
        this.state = {
            id: null,
            username: null,
            password: null,
            avatarid: null,
            avatar_list: []
        };
    }

    goToSettings() {
        this.props.history.push('/settings/'+this.state.id)
    }

    async getUser() {
        try {
            const response = api.get('/users/'+this.state.id)
            const newUser = new User(response.data);
            //sets fetched data to state that will be displayed
            this.setState({
                username: newUser.username,
                avatarid: newUser.avatarid,
                password: newUser.password
            })}
        catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    async save() {

    }

    componentDidMount() {
        if (this.props.match.params !== localStorage.getItem('id')) {
            this.goToSettings();
        }

        else {
            this.setState({id: this.props.match.params});
            this.getUser();

            for (let i=1; i<61; i++) {
                this.state.avatar_list.push(
                    <button
                        width="50%"
                        onClick={() => {
                            this.setState({'avatarid': i});
                        }}
                    >
                        <li>
                            <img alt="avatar" src={require('../../shared/images/avatar/'+i+'.png')}/>
                        </li>
                    </button>
                )
            }
        }
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    render() {
        return (
            <div>
                <h1>Enter new Username</h1>
                <input
                    placeholder="Enter here.."
                    onChange={e => {
                        this.handleInputChange('username', e.target.value);
                    }}
                />
                <h1>Enter new Password</h1>
                <input
                    placeholder="Enter here.."
                    onChange={e => {
                        this.handleInputChange('username', e.target.value);
                    }}
                />

                <h1>Choose new Avatar</h1>
                <ul>
                {
                    this.state.avatar_list
                }
                </ul>
                <h1>Current avatar id={this.state.avatarid}</h1>
            </div>
        );
    }
}
export default withRouter(Edit);