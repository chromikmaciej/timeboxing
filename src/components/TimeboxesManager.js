import React, { useEffect, useContext, useReducer } from "react";

import TimeboxCreator from "./TimeboxCreator";
import TimeboxesAPI from "../api/FetchTimeboxesAPI";
import AuthenticationContext from "../contexts/AuthenticationContext";
import { TimeboxesList } from "./TimeboxesList";
import Timebox from "./Timebox";
import ReadOnlyTimebox from "./ReadOnlyTimebox";
import TimeboxEditor from "./TimeboxEditor";
import { timeboxesReducer } from "../reduceres";

function setTimeboxes(timeboxes) {
  return { type: "TIMEBOXES_SET", timeboxes };
}
const addTimebox = timebox => ({type: "TIMEBOX_ADD", timebox});
const setError = error => ({ type: "ERROR_SET", error});
const disableLoadingIndicator = () => ({type: "LOADING_INDICATOR_DISABLE"});

function TimeboxesManager() {
  const [state, dispatch] = useReducer(
    timeboxesReducer,
    undefined,
    timeboxesReducer
  );
  const { accessToken } = useContext(AuthenticationContext);

  useEffect(() => {
    TimeboxesAPI.getAllTimeboxes(accessToken)
      .then((timeboxes) => dispatch(setTimeboxes(timeboxes)))
      .catch((error) => dispatch(setError(error)))
      .finally(() => dispatch(disableLoadingIndicator()));
  }, []);

  const handleCreate = (createdTimebox) => {
    try {
      TimeboxesAPI.addTimebox(createdTimebox, accessToken).then((addedTimebox) =>
      dispatch(addTimebox(addedTimebox))
    );
    } catch (error) {
      console.log("Jest błąd przy tworzeniu timeboxa:", error);
    }
  };
  const renderTimebox = (timebox) => {
    return (
      <>
        {state.currentlyEditedTimeboxId === timebox.id ? (
          <TimeboxEditor
            initialTitle={timebox.title}
            initialTotalTimeInMinutes={timebox.totalTimeInMinutes}
            onCancel={() => dispatch({ type: "TIMEBOX_EDIT_STOP" })}
            onUpdate={(updatedTimebox) => {
              const timeboxToUpdate = { ...timebox, ...updatedTimebox };
              TimeboxesAPI.replaceTimebox(
                timeboxToUpdate,
                accessToken
              ).then((replacedTimebox) =>
                dispatch({ type: "TIMEBOX_REPLACE", replacedTimebox })
              );
              dispatch({ type: "TIMEBOX_EDIT_STOP" });
            }}
          />
        ) : (
          <Timebox
            key={timebox.id}
            title={timebox.title}
            totalTimeInMinutes={timebox.totalTimeInMinutes}
            onDelete={() => 
              TimeboxesAPI.removeTimebox(timebox, accessToken).then(() =>
                dispatch({ type: "TIMEBOX_REMOVE", removedTimebox: timebox })
              )
            }
            onEdit={() =>
              dispatch({
                type: "TIMEBOX_EDIT_START",
                currentlyEditedTimeboxId: timebox.id,
              })
            }
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
