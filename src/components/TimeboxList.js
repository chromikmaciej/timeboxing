import React from "react";
import TimeboxCreator from "./TimeboxCreator";
import Timebox from "./Timebox";
import ErrorBoundary from "./ErrorBoundary";



class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            { id: "1", title: "Uczę się o promises", totalTimeInMinutes: 25 },
            { id: "2", title: "Poznaję REST API", totalTimeInMinutes: 10 },
            { id: "3", title: "Ćwiczę async/await", totalTimeInMinutes: 15 },
            { id: "4", title: "Uczę się fetch", totalTimeInMinutes: 5 }
        ]
    }

    addTimebox = (timebox) => {
        throw new Error("Nie udało się utworzyć timeboxa :(");
        this.setState(prevState => {
            const timeboxes = [timebox, ...prevState.timeboxes];
            return { timeboxes };
        })
    }

    handleCreate = (createdTimebox) => {
        try {
            this.addTimebox(createdTimebox)
        } catch (error) {
            console.log("Jest błąd przy tworzeniu timeboxa:", error);
        }
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
                <ErrorBoundary message="Coś się wykrzaczyło w liście :(">
                    {
                        this.state.timeboxes.map((timebox, index) => (
                            <Timebox
                                key={timebox.id}
                                title={timebox.title}
                                totalTimeInMinutes={timebox.totalTimeInMinutes}
                                onDelete={() => this.removeTimebox(index)}
                                onEdit={() => this.updateTimebox(index, { ...timebox, title: "Updated timebox" })}
                            />
                        ))
                    }
                </ErrorBoundary>
            </>
        )
    }
}

export default TimeboxList;