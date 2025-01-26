import axios from "axios";

const API_URL = "https://api.coincap.io/v2";

export async function getCoins(limit: number, offset: number) {
  const response = await axios.get(`${API_URL}/assets`, {
    params: { offset, limit },
  });

  return response.data.data;
}
