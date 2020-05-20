import { wait } from "./wait";

const FakeAuthenticationAPI = {
  login: async function(credentials) {
    await(200);
    const { email, password } = credentials;
    if (email === "bob@example.com" && password === "secret") {
      return {
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…IyIn0.UubxcVsLsPCIVnyQa546CVCrzSyMahnggB3BTTmpHCM"
      }
    }
    throw new Error("Invalid credentials");
  }
}

export default FakeAuthenticationAPI;
