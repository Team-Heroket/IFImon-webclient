import React from "react";
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import "./StylesheetGame.css";


let clock;
clock = {
    GAMESTART: "gamestart",
    REMATCH: "rematch",
    PERIOD: "period",
}

const renderTimeGameStart = ({remainingTime}) => {
    if (remainingTime === 0) {
        return <div className="timer">Wait...</div>;
    }

    return (
        <div className="timer">
            <div className="textTimer">Game starts in</div>
            <div className="valueTimer">{remainingTime}</div>
            <div className="textTimer">seconds</div>
        </div>
    );
};

const renderTimeRematch = ({remainingTime}) => {
    if (remainingTime === 0) {
        return <div className="timer">Wait...</div>;
    }

    return (
        <div className="timer">
            <div className="textTimer">Rematch?</div>
            <div className="valueTimer">{remainingTime}</div>
            <div className="textTimer">seconds</div>
        </div>
    );
};

const renderTimePeriod = ({remainingTime}) => {
    if (remainingTime === 0) {
        return <div className="timer"></div>;
    }

    return (
        <div className="timer">
            <div className="valuePeriodTimer">{remainingTime}</div>
        </div>
    );
};

export function Clock({remainingTime, totalTime, type}) {

    if (type == clock.GAMESTART) {
        return (

            <CountdownCircleTimer
                key={remainingTime}
                isPlaying
                initialRemainingTime={remainingTime/1000}

                colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                onComplete={() => [true, 1000]}
                trailColor = "transparent"
                duration={totalTime/1000}
            >
                {renderTimeGameStart}
            </CountdownCircleTimer>

        );
    }
    else if (type== clock.REMATCH){
        return (

            <CountdownCircleTimer
                key={remainingTime}
                isPlaying
                initialRemainingTime={remainingTime/1000}
                colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                onComplete={() => [true, 1000]}
                trailColor = "transparent"
                duration={totalTime/1000}
            >
                {renderTimeRematch}
            </CountdownCircleTimer>
        );
    }
    else if (type == clock.PERIOD){
        return (

            <CountdownCircleTimer
                key={remainingTime}
                isPlaying
                size={46}
                colors={[["#4EE142", 0.33], ["#FFF45B", 0.33], ["#F53E28"]]}
                strokeWidth={5}
                onComplete={() => [true, 1000]}
                trailColor = "#DDDDDD"
                duration={totalTime/1000}
            >
                {renderTimePeriod}
            </CountdownCircleTimer>
        );
    }
}