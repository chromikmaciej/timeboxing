import makeRequest from "./makeFetchRequest";

const BASE_URL = "http://localhost:4000/timeboxes";
const FetchTimeboxesAPI = {
  getAllTimeboxes: async function getAllTimeboxes(accessToken) {
    const response = await makeRequest(BASE_URL, "GET", null, accessToken);
    const timeboxes = await response.json();
    return timeboxes;
  },
  addTimebox: async function addTimebox(timeboxToAdd, accessToken) {
    const response = await makeRequest(
      BASE_URL,
      "POST",
      timeboxToAdd,
      accessToken
    );
    const addedTimebox = await response.json();
    return addedTimebox;
  },
  replaceTimebox: async function (timeboxToReplace, accessToken) {
    if (!timeboxToReplace.id) {
      throw new Error("Timebox has to have an id to be updated");
    }
    const response = await makeRequest(
      `${BASE_URL}/${timeboxToReplace.id}`,
      "PUT",
      timeboxToReplace,
      accessToken
    );
    const replacedTimebox = await response.json();
    return replacedTimebox;
  },
  removeTimebox: async function (timeboxToRemove, accessToken) {
    console.log("usuwam ___" + timeboxToRemove.id);
    if (!timeboxToRemove.id) {
      throw new Error("Timebox has to have an id to be updated");
    }
    await makeRequest(
      `${BASE_URL}/${timeboxToRemove.id}`,
      "DELETE",
      null,
      accessToken
    );
    // możemy nic nie zwracać
    //const response = await makeRequest(`${BASE_URL}/${timeboxToRemove.id}`, "DELETE", null, accessToken);
  },
};

export default FetchTimeboxesAPI;
