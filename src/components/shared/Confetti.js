import React from 'react'
import Confetti from 'react-confetti'

export default () => {
    let width = window.screen.width;
    let height = window.screen.height;
    return (
        <Confetti
            width={width+"px"}
            height={height+"px"}
        />
    )
}
