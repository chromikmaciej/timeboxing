const initialState = {
  currentTimeboxId: null,
  timeboxes: [],
  editIndex: null,
  loading: true,
  error: null,
};

function rootReducer(state, action) {
  return {
    currentTimeboxId: currentTimeboxIdReducer(state.currentTimeboxId, action), 
    timeboxes: timeboxesReducer(state.timeboxes, action),
    currentlyEditedTimeboxId: currentlyEditedTimeboxIdReducer(state.currentlyEditedTimeboxId, action),
    timeboxesAreLoading: timeboxesAreLoadingReducer(state.timeboxesAreLoading, action),
    timeboxesLoadingError: timeboxesLoadingErrorReducer(state.timeboxesLoadingError, action)
  }
}

function currentTimeboxIdReducer(state = null, action) {
  switch(action.type) {
    case "TIMEBOX_MAKE_CURRENT": {
      const {timebox} = action;
      return timebox.id;
    }
    case "TIMEBOX_REMOVE": {
      const { removedTimebox } = action;
      return state === removedTimebox.id ? null : state;
    }
    default: {
      return state;
    }
  }
}

function timeboxesReducer(state = [], action) {
  switch(action.type) {
    case "TIMEBOXES_SET": {
      const { timeboxes } = action;
      return timeboxes;
    }
    case "TIMEBOX_ADD": {
      const { timebox } = action;
      const timeboxes = [...state, timebox];
      return timeboxes;
    }
    case "TIMEBOX_REMOVE": {
      const { removedTimebox } = action;
      const timeboxes = state.filter(
        (timebox) => timebox.id !== removedTimebox.id
      );
      return timeboxes;
    }
    case "TIMEBOX_REPLACE": {
      const { replacedTimebox } = action;
      const timeboxes = state.map((timebox) =>
        timebox.id === replacedTimebox.id ? replacedTimebox : timebox
      );
      return timeboxes;
    }
    default: {
      return state;
    }
  }
}

function currentlyEditedTimeboxIdReducer(state = null, action) {
  switch(action.type) {
    case "TIMEBOX_EDIT_STOP": {
      return null;
    }
    case "TIMEBOX_EDIT_START": {
      const { currentlyEditedTimeboxId } = action;
      return currentlyEditedTimeboxId;
    }
    default: {
      return state;
    }
  }
}


function timeboxesAreLoadingReducer(state = true, action) {
  switch(action.type) {
    case "LOADING_INDICATOR_DISABLE": {
      return false;
    }
    default: {
      return state;
    }
  }
}

export function timeboxesLoadingErrorReducer(state = null, action = {}) {
  switch (action.type) {
    case "ERROR_SET": {
      const { timeboxesLoadingError } = action;
      return timeboxesLoadingError;
    }
    default: {
      return state;
    }
  }
}

export function oldReducer(state = initialState, action = {}) {
  if (typeof state === "undefined") {
    return initialState;
  }

  switch (action.type) {
    default: {
      return state;
    }
  }
}

export const getAllTimeboxes = (state) => state.timeboxes;
export const getRemainingTimebosex = (state) => state.timeboxes.filter(timebox => timebox.id !== state.currentTimeboxId);
export const areTimeboxesLoading = (state) => state.timeboxesAreLoading;
export const getTimeboxesLoadingError = (state) => state.timeboxesLoadingError;
export const isTimeboxEdited = (state, timebox) => state.currentlyEditedTimeboxId && state.currentlyEditedTimeboxId === timebox.id;
export const getTimeboxById = (state, timeboxId) => state.timeboxes.find(timebox => timebox.id === timeboxId);
export const getCurrentlyEditedTimebox = (state) => getTimeboxById(state, state.currentlyEditedTimeboxId);
export const isAnyTimeboxEdited = (state) => !!state.currentlyEditedTimeboxId;
export const isAnyTimeboxCurrent = (state) => !!state.currentTimeboxId;
export const getCurrentTimebox = (state) => isAnyTimeboxCurrent(state) ? getTimeboxById(state, state.currentTimeboxId) : null;
