import React from "react";

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

export default TimeboxEditor;