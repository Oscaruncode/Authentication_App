/**
 * Call API for get user info
 * @param {string} accessToken - need accessToken for send and authenticate in backend
 * @returns {json} Return User info in Json
 */
import { API_URL } from "./constanst";

export default async function retrieveUserInfo(accessToken: string) {
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        return json.body;
      }
    } catch (error) {
        console.log("error retrieve user info: ", error)
    }
  }
  