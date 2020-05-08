import { areTimeboxesLoading, timeboxesReducer } from "../reduceres";

test("areTimeboxesLoading return true when state.timeboxesAreLoading is set to true", () => {
  const state = {
    timeboxesAreLoading: true,
  };
  expect(areTimeboxesLoading(state)).toBe(true);
});

describe("timeboxesReducer", () => {
  test("adds a timebox when given a TIMEBOXES_ADD action", () => {
    const state = {
      timeboxes: [],
    };
    const newTimebox = { id: "I am a new timebox" };
    expect(
      timeboxesReducer(state, { type: "TIMEBOX_ADD", timebox: newTimebox })
    ).toEqual({
      timeboxes: [newTimebox],
    });
  });
});
