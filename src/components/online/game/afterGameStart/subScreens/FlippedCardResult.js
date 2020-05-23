import React from "react";
import ReactCardFlip from "react-card-flip";
import {PlaceholderCard} from "../../../../../views/design/PokemonCard";
import posed from 'react-pose';

const BoxOur = posed.div({
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
    },
    hidden: { opacity: 0, y: 1000, transition: { duration: 300 }},
    visible: { opacity: 1, y: 0, transition: { duration: 300 }},
});

const BoxTheir = posed.div({
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
    },
    hidden: { opacity: 0, y: -1000, transition: { duration: 500 }},
    visible: { opacity: 1, y: 0, transition: { duration: 500 }},
});

export class FlippedCardResult extends React.Component {
    front;


    constructor() {
        super();
        this.state = {
            isFlipped: true,
            visible: true
        };
    }

    componentDidMount() {

        setTimeout(() => {
            this.setState({isFlipped: false})
        }, 2000)

        setTimeout(() => {
            this.setState({isFlipped: true})
        }, 10000)

        setTimeout(() => {
            this.setState({visible: false})
        }, 11000)
    }

    render() {
        const front = this.props.front;
        return (
            <div>
                {this.props.our ?
                    <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                        <BoxOur className="box" >{front}</BoxOur>

                        <BoxOur className="box" pose={this.state.visible ? 'visible' : 'hidden'}>{PlaceholderCard()}</BoxOur>
                    </ReactCardFlip>
                    :
                    <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                        <BoxTheir className="box">{front}</BoxTheir>

                        <BoxTheir className="box" pose={this.state.visible ? 'visible' : 'hidden'}>{PlaceholderCard()}</BoxTheir>
                    </ReactCardFlip>

                }
            </div>
        )
    }

}