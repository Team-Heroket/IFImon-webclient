import React from "react";
import ReactCardFlip from "react-card-flip";
import {PlaceholderCard} from "../../../../../views/design/PokemonCard";
import posed from 'react-pose';

const Box = posed.div({

    hidden: { opacity: 0, y: 1000, transition: { duration: 500 }},
    visible: { opacity: 1, y: 0, transition: { duration: 500 }},

});


export class FlippedCard extends React.Component {
    front;


    constructor() {
        super();
        this.state = {
            isFlipped: true,
            visible: false
        };
    }

    componentDidMount() {
        this.setState({visible: true})
        setTimeout(() => {
            this.setState({isFlipped: false})
        }, 600)
    }

    render() {
        const front = this.props.front;
        return (
            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                <Box className="box" >{front}</Box>

                <Box className="box" pose={this.state.visible ? 'visible' : 'hidden'}>{PlaceholderCard()}</Box>
            </ReactCardFlip>
        )
    }

}
