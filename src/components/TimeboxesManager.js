import React, { useEffect, useContext, useReducer } from "react";

import TimeboxCreator from "./TimeboxCreator";
import TimeboxesAPI from "../api/FetchTimeboxesAPI";
import AuthenticationContext from "../contexts/AuthenticationContext";
import { TimeboxesList } from "./TimeboxesList";
import Timebox from "./Timebox";
import ReadOnlyTimebox from "./ReadOnlyTimebox";
import TimeboxEditor from "./TimeboxEditor";

function timeboxesReducer(state, action) {
  switch (action.type) {
    case "TIMEBOXES_LOAD": {
      const { timeboxes } = action;
      return { ...state, timeboxes };
    }
    case "TIMEBOX_ADD": {
      const { timebox } = action;
      const timeboxes = [...state.timeboxes, timebox];
      return { ...state, timeboxes };
    }
    case "TIMEBOX_REMOVE": {
      const { indexToRemove } = action;
      const timeboxes = state.timeboxes.filter(
        (timebox, index) => index !== indexToRemove
      );
      return { ...state, timeboxes };
    }
    case "TIMEBOX_REPLACE": {
      const {indexToUpdate, updatedTimebox} = action;
      const timeboxes = state.timeboxes.map((timebox, index) => 
        index === indexToUpdate ? updatedTimebox : timebox
      );
      return {...state, timeboxes};
    }
    case "TIM"
    case "LOADING_INDICATOR_DISABLE": {
      return { ...state, loading: false };
    }
    case "ERROR_SET": {
      const { error } = action;
      return { ...state, error };
    }
    default: {
      return state;
    }
  }
}

function TimeboxesManager() {
  const initialState = {
    timeboxes: [],
    editIndex: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(timeboxesReducer, initialState);
  const { accessToken } = useContext(AuthenticationContext);

  useEffect(() => {
    TimeboxesAPI.getAllTimeboxes(accessToken)
      .then((timeboxes) => dispatch({ type: "TIMEBOXES_LOAD", timeboxes }))
      .catch((error) => dispatch({ type: "ERROR_SET", error }))
      .finally(() => dispatch({ type: "LOADING_INDICATOR_DISABLE" }));
  }, []);

  const addTimebox = (timebox) => {
    TimeboxesAPI.addTimebox(timebox, accessToken).then((addedTimebox) =>
      dispatch({ type: "TIMEBOX_ADD", timebox: addedTimebox })
    );
  };
  const removeTimebox = (indexToRemove) => {
    TimeboxesAPI.removeTimebox(
      state.timeboxes[indexToRemove],
      accessToken
    ).then(() => dispatch({ type: "TIMEBOX_REMOVE", indexToRemove }));
  };
  const updateTimebox = (indexToUpdate, timeboxToUpdate) => {
    TimeboxesAPI.replaceTimebox(timeboxToUpdate, accessToken).then(
      (updatedTimebox) => dispatch({type: "TIMEBOX_REPLACE", indexToUpdate, updatedTimebox})
    );
  };

  const handleCreate = (createdTimebox) => {
    try {
      addTimebox(createdTimebox);
    } catch (error) {
      console.log("Jest błąd przy tworzeniu timeboxa:", error);
    }
  };
  const renderTimebox = (timebox, index) => {
    return (
      <>
        {state.editIndex === index ? (
          <TimeboxEditor
            initialTitle={timebox.title}
            initialTotalTimeInMinutes={timebox.totalTimeInMinutes}
            onCancel={() => dispatch({ type: "TIMEBOX_EDIT_STOP" })}
            onUpdate={(updatedTimebox) => {
              updateTimebox(index, { ...timebox, ...updatedTimebox });
              dispatch({ type: "TIMEBOX_EDIT_STOP" });
            }}
          />
        ) : (
          <Timebox
            key={timebox.id}
            title={timebox.title}
            totalTimeInMinutes={timebox.totalTimeInMinutes}
            onDelete={() => removeTimebox(index)}
            onEdit={() => dispatch({ type: "TIMEBOX_EDIT_START", editIndex: index })}
          />
        )}
      </>
    );
  };
  function renderReadOnlyTimebox(timebox, index) {
    return (
      <ReadOnlyTimebox
        key={timebox.id}
        title={timebox.title}
        totalTimeInMinutes={timebox.totalTimeInMinutes}
      />
    );
  }
  return (
    <>
      <TimeboxCreator onCreate={handleCreate} />
      {state.loading ? "Timeboxy się ładują..." : null}
      {state.error ? "Nie udało się załadować :(" : null}
      <TimeboxesList
        timeboxes={state.timeboxes}
        renderTimebox={renderTimebox}
      />
    </>
  );
}

export default TimeboxesManager;
