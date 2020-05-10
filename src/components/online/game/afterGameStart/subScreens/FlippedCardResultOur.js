import React from "react";
import ReactCardFlip from "react-card-flip";
import {PlaceholderCard} from "../../../../../views/design/PokemonCard";


export class FlippedCardResultOur extends React.Component {
    front;


    constructor() {
        super();
        this.state = {
            isFlipped: false
        };
    }

    componentDidMount() {

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