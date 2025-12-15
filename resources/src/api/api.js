import axios from "axios";

const API_URL = "http://localhost:5001";

export const api = axios.create({
  baseURL: API_URL,
});

/* ---------- OFFLINE-FIRST HELPERS ---------- */

export async function fetchWithCache(key, endpoint) {
  try {
    const res = await api.get(endpoint);
    localStorage.setItem(key, JSON.stringify(res.data));
    return res.data;
  } catch {
    return JSON.parse(localStorage.getItem(key)) || [];
  }
}
