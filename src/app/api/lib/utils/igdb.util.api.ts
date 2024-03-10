import axios from "axios";

let accessToken: string | null = null;
let tokenExpirationTimestamp = 0;

async function authenticateWithTwitch() {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  try {
    const response = await axios.post("https://id.twitch.tv/oauth2/token", null, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
      },
    });

    const {access_token, expires_in} = response.data;
    console.info(`Twitch authentication successful. Expires in: ${expires_in} seconds`);

    accessToken = access_token;
    tokenExpirationTimestamp = Date.now() + expires_in * 1000;

    return accessToken;
  } catch (error) {
    console.error("Twitch authentication failed:", error);
    throw error;
  }
}

export const getTwitchAccessToken = async () => {
  // If the token is not set or it has expired, fetch a new one
  if (!accessToken || Date.now() >= tokenExpirationTimestamp) {
    await authenticateWithTwitch();
  }

  return accessToken;
};
