import React from "react";
import TimeboxCreator from "./TimeboxCreator";
import Timebox from "./Timebox";

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
        console.table(this.state.timeboxes);
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

export default TimeboxList;