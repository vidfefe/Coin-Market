import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_COINCAP_KEY;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export async function getCoins(limit: number, offset: number) {
  try {
    const response = await axiosInstance.get(`/assets`, {
      params: { offset, limit },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getCoinDetails(id: string) {
  try {
    const response = await axiosInstance.get(`/assets/${id}`);
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
    const response = await axiosInstance.get(`/assets/${id}/history`, {
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
