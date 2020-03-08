import axios from "axios";

const BASE_URL = "http://localhost:4000/timeboxes";
const AxiosTimeboxesAPI = {
    getAllTimeboxes: async function getAllTimeboxes() {
        const timeboxes = [];
        return timeboxes;
    },
    addTimebox: async function addTimebox(timeboxToAdd) {
        const addedTimebox = {};
        return addedTimebox;
    },
    replaceTimebox: async function (timeboxToReplace) {
        if (!timeboxToReplace.id) {
            throw new Error("Timebox has to have an id to be updated");
        }
        const replacedTimebox = {};
        return replacedTimebox;
    },
    removeTimebox: async function (timeboxToRemove) {
        if (!timeboxToRemove.id) {
            throw new Error("Timebox has to have an id to be updated");
        }
    }

}

export default AxiosTimeboxesAPI;