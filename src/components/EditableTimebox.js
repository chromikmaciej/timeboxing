import React from "react";
import TimeboxEditor from "./TimeboxEditor";
import CurrentTimebox from "./CurrentTimebox";

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
                { isEditable ? (
                <TimeboxEditor
                    title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                    isEditable={isEditable}
                    onTitleChange={this.handleTitleChange}
                    onTotaTimeInMinutesChange={this.handleTotalTimeInMinutes}
                    onConfirm={this.handleConfirm}
                />
                ) : (
                <CurrentTimebox
                    title={title}
                    isEditable={isEditable}
                    totalTimeInMinutes={totalTimeInMinutes}
                    onEdit={this.handleEdit}
                />
                )}
            </>
        )
    }
}

export default EditableTimebox;