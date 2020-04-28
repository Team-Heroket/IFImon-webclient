import React from "react";
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import ReactDOM from "react-dom";
import "./StylesheetGame.css";
import {ButtonContainer} from "../../../../helpers/layout";


let clock;
clock = {
    GAMESTART: "gamestart",
    REMATCH: "rematch",
    PERIOD: "period",
}

const renderTimeGameStart = value => {
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

const renderTimeRematch = value => {
    if (value === 0) {
        return <div className="timer">Too late...</div>;
    }

    return (
        <div className="timer">
            <div className="textTimer">Waiting for Admin</div>
            <div className="valueTimer">{value}</div>
            <div className="textTimer">seconds</div>
        </div>
    );
};

const renderTimePeriod = value => {
    if (value === 0) {
        return <div className="timer"></div>;
    }

    return (
        <div className="timer">
            <div className="valuePeriodTimer">{value}</div>
        </div>
    );
};

export function Clock({remainingTime, totalTime, type}) {

    if (type == clock.GAMESTART) {
        return (

            <CountdownCircleTimer
                isPlaying
                initialRemainingTime={remainingTime/1000}
                durationSeconds={totalTime/1000}
                colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                renderTime={renderTimeGameStart}
                onComplete={() => [true, 1000]}
                trailColor = "transparent"
            />

        );
    }
    else if (type== clock.REMATCH){
        return (

            <CountdownCircleTimer
                isPlaying
                initialRemainingTime={remainingTime/1000}
                durationSeconds={totalTime/1000}
                colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                renderTime={renderTimeRematch}
                onComplete={() => [true, 1000]}
                trailColor = "transparent"
            />
        );
    }
    else if (type == clock.PERIOD){
        return (

            <CountdownCircleTimer
                isPlaying
                size={46}
                durationSeconds={totalTime/1000}
                colors={[["#4EE142", 0.33], ["#FFF45B", 0.33], ["#F53E28"]]}
                strokeWidth={5}
                renderTime={renderTimePeriod}
                onComplete={() => [true, 1000]}
                trailColor = "#DDDDDD"
            />
        );
    }
}