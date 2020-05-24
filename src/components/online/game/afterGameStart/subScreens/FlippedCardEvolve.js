import React from "react";
import ReactCardFlip from "react-card-flip";
import {PlaceholderCard} from "../../../../../views/design/PokemonCard";
import posed from 'react-pose';

const Box = posed.div({
    hoverable: true,
    pressable: true,
    init: {
        scale: 1,
        boxShadow: '0px 0px 0px rgba(0,0,0,0)'
    },
    hover: {
        scale: 1.05,
        boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
    },
    press: {
        scale: 1.05,
        boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
    }
});

export class FlippedCardEvolve extends React.Component {
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
        }, 400)

        setTimeout(() => {
            this.setState({isFlipped: true})
        }, 9000)
    }

    render() {
        const front = this.props.front;
        return (
            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                <Box className="box">{front}</Box>

                <Box className="box">{PlaceholderCard()}</Box>
            </ReactCardFlip>

        )
    }

}