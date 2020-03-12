import React from "react";
import uuid from "uuid";
import TimeboxCreator from "./TimeboxCreator";
import Timebox from "./Timebox";
import TimeboxesAPI from "../api/FetchTimeboxesAPI";
import AuthenticationContext from "../contexts/AuthenticationContext";

class TimeboxList extends React.Component {
    state = {
        timeboxes: [],
        loading: true,
        error: null
    }

    componentDidMount() {
        TimeboxesAPI.getAllTimeboxes(this.context.accessToken).then(
            (timeboxes) => this.setState({ timeboxes })
        ).catch(
            (error) => Promise.reject(this.setState({ error }))
        ).finally(
            () => this.setState({ loading: false })
        )
    }

    addTimebox = (timebox) => {
        // TimeboxesAPI.addTimebox(timebox)
        //     .then(() => TimeboxesAPI.getAllTimeboxes())
        //     .then(
        //         (timeboxes) => this.setState({ timeboxes })
        //     )

        TimeboxesAPI.addTimebox(timebox, this.props.accessToken).then(
            (addedTimebox) => this.setState(prevState => {
                const timeboxes = [...prevState.timeboxes, addedTimebox];
                return { timeboxes };
            })
        )

    }

    handleCreate = (createdTimebox) => {
        try {
            this.addTimebox(createdTimebox)
        } catch (error) {
            console.log("Jest błąd przy tworzeniu timeboxa:", error);
        }
    }

    removeTimebox = (indexToRemove) => {
        TimeboxesAPI.removeTimebox(this.state.timeboxes[indexToRemove], this.props.accessToken)
            .then(
                () => this.setState(prevState => {
                    const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove);
                    return { timeboxes }
                })
            )

    }

    updateTimebox = (indexToUpdate, timeboxToUpdate) => {
        TimeboxesAPI.replaceTimebox(timeboxToUpdate, this.props.accessToken)
            .then(
                (updatedTimebox) => this.setState(prevState => {
                    const timeboxes = prevState.timeboxes.map((timebox, index) =>
                        index === indexToUpdate ? updatedTimebox : timebox
                    )
                    return { timeboxes }
                })
            )

    }

    render() {
        console.table(this.state.timeboxes);
        return (
            <>
                <TimeboxCreator
                    onCreate={this.handleCreate}
                />
                {this.state.loading ? "Timeboxy się ładują ..." : null}
                {this.state.error ? "Nie udało się załadować " : null}
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
            </>
        )
    }
}
TimeboxList.contextType = AuthenticationContext;

export default TimeboxList;