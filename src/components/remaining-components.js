import React from "react";
import uuid from "uuid";
import classNames from "classnames";

import Clock from "./Clock";

function TimeboxEditor(props) {
    const {
        title,
        isEditable,
        totalTimeInMinutes,
        onTitleChange,
        onTotaTimeInMinutesChange,
        onConfirm
    } = props;
    return (
        <div className={`TimeboxEditor ${isEditable ? "" : "inactive"}`}>
            <label>
                Co robisz ?
                <input
                    disabled={!isEditable}
                    value={title}
                    onChange={onTitleChange}
                    type="text"
                />
            </label><br />
            <label>
                Ile minut
                <input
                    disabled={!isEditable}
                    value={totalTimeInMinutes}
                    onChange={onTotaTimeInMinutesChange}
                    type="number"
                />
            </label><br />
            <button
                disabled={!isEditable}
                onClick={onConfirm}
            >
                Zatwierdź zmiany
            </button>
        </div>
    );
}

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

class CurrentTimebox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        }

        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.togglePause = this.togglePause.bind(this);

    }

    handleStart(event) {
        this.setState({
            isRunning: true
        });
        this.startTimer();
    }

    handleStop(event) {
        this.setState({
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        });
        this.stopTimer();
    }

    startTimer() {
        this.intervalId = window.setInterval(
            () => {
                this.setState(
                    (prevState) => ({ elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1 })
                );
            },
            100
        )
    }

    stopTimer() {
        window.clearInterval(this.intervalId);
    }

    togglePause() {
        this.setState(
            function (prevState) {
                const isPaused = !prevState.isPaused;
                if (isPaused) {
                    this.stopTimer();
                } else {
                    this.startTimer();
                }
                return {
                    isPaused,
                    pausesCount: isPaused ? prevState.pausesCount + 1 : prevState.pausesCount
                }
            }
        )
    }

    render() {
        const { isPaused, isRunning, pausesCount, elapsedTimeInSeconds } = this.state;
        const { title, totalTimeInMinutes, isEditable, onEdit } = this.props;
        const totalTimeInSeconds = totalTimeInMinutes * 60;
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
        const minutesLeft = Math.floor(timeLeftInSeconds / 60);
        const secondsLeft = Math.floor(timeLeftInSeconds % 60);
        const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;
        return (
            <div className={`CurrentTimebox ${isEditable ? "inactive" : ""}`} >
                <h1>{title}</h1>
                <Clock minutes={minutesLeft} seconds={secondsLeft} className={isPaused ? "inactive" : ""} />
                <ProgressBar
                    percent={progressInPercent}
                    className={isPaused ? "inactive" : ""} trackRemaining={false}
                    color="red"
                    big
                />
                <button onClick={onEdit} disabled={isEditable}>Edytuj</button>
                <button onClick={this.handleStart} disabled={isRunning}>Start</button>
                <button onClick={this.handleStop} disabled={!isRunning}>Stop</button>
                <button onClick={this.togglePause} disabled={!isRunning}>{isPaused ? "Wznów" : "Pauzuj"}</button>
                Liczba przerw: {pausesCount}
            </div>
        )
    }
}

class EditableTimebox extends React.Component {
    state = {
        title: "Uczę się",
        totalTimeInMinutes: 15,
        isEditable: true
    }
    handleTitleChange = (event) => {
        this.setState({ title: event.target.value })
    }
    handleTotalTimeInMinutes = (event) => {
        this.setState({ totalTimeInMinutes: event.target.value })
    }
    handleConfirm = () => {
        this.setState({ isEditable: false })
    }
    handleEdit = () => {
        this.setState({ isEditable: true })
    }
    render() {
        const { title, totalTimeInMinutes, isEditable } = this.state
        return (
            <>
                <TimeboxEditor
                    title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                    isEditable={isEditable}
                    onTitleChange={this.handleTitleChange}
                    onTotaTimeInMinutesChange={this.handleTotalTimeInMinutes}
                    onConfirm={this.handleConfirm}
                />
                <CurrentTimebox
                    title={title}
                    isEditable={isEditable}
                    totalTimeInMinutes={totalTimeInMinutes}
                    onEdit={this.handleEdit}
                />
            </>
        )
    }
}

class TimeboxCreator extends React.Component {

    constructor(props) {
        super(props);
        this.titleInput = React.createRef();
        this.totalTimeInMinutesInput = React.createRef();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onCreate({
            id: uuid.v4(),
            title: this.titleInput.current.value,
            totalTimeInMinutes: this.totalTimeInMinutesInput.current.value
        });
        this.titleInput.current.value = "";
        this.totalTimeInMinutesInput.current.value = "";
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="TimeboxCreator">
                <label>
                    Co robisz ?
                <input
                        ref={this.titleInput}
                        type="text"
                    />
                </label><br />
                <label>
                    Ile minut
                <input
                        ref={this.totalTimeInMinutesInput}
                        type="number"
                    />
                </label><br />
                <button>Dodaj timebox</button>
            </form>
        );
    }
}

class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            { id: "a", title: "Uczę się list", totalTimeInMinutes: 5 },
            { id: "b", title: "Uczę się formularzy", totalTimeInMinutes: 10 },
            { id: "c", title: "Uczę się styli", totalTimeInMinutes: 15 },
        ]
    }

    addTimebox = (timebox) => {
        this.setState(prevState => {
            const timeboxes = [timebox, ...prevState.timeboxes];
            return { timeboxes };
        })
    }

    handleCreate = (createdTimebox) => {
        this.addTimebox(createdTimebox)
    }

    removeTimebox = (indexToRemove) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove);
            return { timeboxes }
        })
    }

    updateTimebox = (indexToUpdate, updatedTimebox) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.map((timebox, index) =>
                index === indexToUpdate ? updatedTimebox : timebox
            )
            return { timeboxes }
        })
    }

    render() {
        return (
            <>
                <TimeboxCreator
                    onCreate={this.handleCreate}
                />
                {this.state.timeboxes.map((timebox, index) => (
                    <Timebox
                        key={timebox.id}
                        title={timebox.title}
                        totalTimeInMinutes={timebox.totalTimeInMinutes}
                        onDelete={() => this.removeTimebox(index)}
                        onEdit={() => this.updateTimebox(index, { ...timebox, title: "Updated timebox" })}
                    />
                ))}
            </>
        )
    }
}

function Timebox({ title, totalTimeInMinutes, onDelete, onEdit }) {
    return (
        <div className="Timebox">
            <h3>{title} - {totalTimeInMinutes} min.</h3>
            <button onClick={onDelete}>Usuń</button>
            <button onClick={onEdit}>Zmień</button>
        </div>
    )
}

export { TimeboxList, EditableTimebox }