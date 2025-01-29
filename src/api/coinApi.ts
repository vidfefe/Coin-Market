import axios from "axios";

const API_URL = "https://api.coincap.io/v2";

export async function getCoins(limit: number, offset: number) {
  try {
    const response = await axios.get(`${API_URL}/assets`, {
      params: { offset, limit },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getCoinDetails(id: string) {
  try {
    const response = await axios.get(`${API_URL}/assets/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getCoinHistory(
  id: string,
  interval: string,
  start: number,
  end: number,
) {
  try {
    const response = await axios.get(`${API_URL}/assets/${id}/history`, {
      params: {
        interval,
        start,
        end,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}
