const axios = require("axios");
const jwt = require("jsonwebtoken");

class GoogleAuth {
  #clientId;
  #clientSecret;
  #redirectUri;
  constructor({ clientId, clientSecret, redirectUri }) {
    this.#clientId = clientId;
    this.#clientSecret = clientSecret;
    this.#redirectUri = redirectUri;
  }
  getAuthUrl() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
      clientId: this.#clientId,
      redirectUri: this.#redirectUri,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
    };
    const query = new URLSearchParams(options).toString();
    return `${rootUrl}?${query}`;
  }
  async getToken(code) {
    const url = "https://oauth2.googleapis.com/token";
    const values = {
      code,
      client_id: this.#clientId,
      client_secret: this.#clientSecret,
      redirect_uri: this.#redirectUri,
      grant_type: "authorization_code",
    };
    try {
      const { data } = await axios.post(url, values, {
        headers: { "Content-Type": "application/json" },
      });
      return data;
    } catch (err) {
      throw new Error("error while get token form google: ");
    }
  }
  async getUserInfo(tokenId, accessToken) {
    try {
      const { data: userFromApi } = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return { ...userFromApi };
    } catch (err) {
      throw new Error("error while get user info");
    }
  }
}

module.exports = GoogleAuth;
