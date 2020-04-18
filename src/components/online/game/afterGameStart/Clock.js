import React from "react";
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import ReactDOM from "react-dom";
import "./StylesheetGame.css";

const renderTime = value => {
    if (value === 0) {
        return <div className="timer">Too late...</div>;
    }

    return (
        <div className="timer">
            <div className="textTimer">Game starts in</div>
            <div className="valueTimer">{value}</div>
            <div className="textTimer">seconds</div>
        </div>
    );
};

export function Clock({remainingTime, totalTime}) {
    return (

            <CountdownCircleTimer
                isPlaying
                initialRemainingTime={remainingTime/1000}
                durationSeconds={totalTime/1000}
                colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                renderTime={renderTime}
                onComplete={() => [true, 1000]}
                trailColor = "transparent"
            />

    );
}