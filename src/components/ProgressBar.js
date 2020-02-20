import React from "react";
import classNames from "classnames";

function ProgressBar({ className = "", percent = 80, big = false, color = null, trackRemaining = false }) {

    var mfloat;

    let progressClassName = classNames(
        "progress",
        className,
        {
            "progress--big": big,
            "progress--color-red": color === "red"
        }
    );

    if (big) {
        progressClassName += " progress--big"
    }
    if (color === "red") {
        progressClassName += " progress--color-red"
    }

    if (trackRemaining) {
        percent = 100 - percent;
        mfloat = 'right';
    } else {
        mfloat = 'left';
    }

    return (
        <div className={progressClassName}>
            <div className="progress__bar" style={{ width: `${percent}%`, float: `${mfloat}` }}></div>
        </div>
    );

}

export default ProgressBar;