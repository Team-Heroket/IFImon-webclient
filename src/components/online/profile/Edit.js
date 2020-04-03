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

    }

    render() {

        return (
            <h1>Hello World!</h1>
        );
    }
}
export default withRouter(Edit);