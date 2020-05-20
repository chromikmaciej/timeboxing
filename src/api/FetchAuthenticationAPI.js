import makeRequest from "./makeFetchRequest";

const BASE_URL = "http://localhost:4000";
const FetchAuthenticationAPI = {
    login: async function addTimebox(credentials) {
        const response = await makeRequest(`${BASE_URL}/login`, "POST", credentials);
        const result = await response.json();
        console.log(result, credentials);
        return result;
    }
}

export default FetchAuthenticationAPI;
