import React from "react";
import ReactCardFlip from "react-card-flip";
import {PlaceholderCard} from "../../../../../views/design/PokemonCard";
import {withRouter} from "react-router-dom";

export class FlippedCard extends React.Component {
    winner;


    constructor() {
        super();
        this.state = {
            isFlipped: true
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({isFlipped: false})
        }, 1000)
    }

    render() {
        const winner = this.props.winner;
        return (
            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                {winner}

                {PlaceholderCard()}
            </ReactCardFlip>
        )
    }

}
