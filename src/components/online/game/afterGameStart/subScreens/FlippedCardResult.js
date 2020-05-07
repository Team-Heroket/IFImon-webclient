import React from "react";
import ReactCardFlip from "react-card-flip";
import {PlaceholderCard} from "../../../../../views/design/PokemonCard";


export class FlippedCardResult extends React.Component {
    front;


    constructor() {
        super();
        this.state = {
            isFlipped: true
        };
    }

    componentDidMount() {

        setTimeout(() => {
            this.setState({isFlipped: false})
        }, 2000)

        setTimeout(() => {
            this.setState({isFlipped: true})
        }, 9000)
    }

    render() {
        const front = this.props.front;
        return (
            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                {front}

                {PlaceholderCard()}
            </ReactCardFlip>
        )
    }

}