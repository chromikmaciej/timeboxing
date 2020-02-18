import React from "react";

function Clock({ className = "", hours = 0, minutes = 0, seconds = 0, miliseconds = 0 }) {
    if (hours < 0) {
        hours = 0;
    }
    if (hours > 23) {
        hours = 23;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 0) {
        minutes = 0;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (minutes > 59) {
        minutes = 59;
    }

    if (seconds < 0) {
        seconds = 0;
    }
    if (seconds > 59) {
        seconds = 59;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (miliseconds < 0) {
        miliseconds = 0;
    }
    if (miliseconds > 999) {
        miliseconds = 999;
    }
    if (miliseconds < 10) {
        miliseconds = "00" + miliseconds;
    } else if (miliseconds < 100) {
        miliseconds = "0" + miliseconds;
    }
    return (
        <h2 className={"Clock " + className}>Pozostało {hours}:{minutes}:{seconds}.{miliseconds}</h2>
    );
}

export default Clock;