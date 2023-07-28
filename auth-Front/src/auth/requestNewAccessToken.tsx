/**
 * Call API for get a new Access Token
 * @param {string} refreshToken - need the prev Refresh Token
 * @returns {string} Return new access token in String
 */

import { AccessTokenResponse } from "../types/types";
import { API_URL } from "./constanst";

export default async function requestNewAccessToken(refreshToken: string) {
  const response = await fetch(`${API_URL}/refreshToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (response.ok) {
    const json = (await response.json()) as AccessTokenResponse;

    if (json.error) {
      throw new Error(json.error);
    }
    return json.body.accessToken;
  } else {
    throw new Error("Unable to refresh access token.");
  }
}