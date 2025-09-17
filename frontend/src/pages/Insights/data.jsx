import axios from "axios";

export async function fetchStats() {
  try {
    const res = await axios.get("http://localhost:5000/api/task/stats");
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching stats:", err);
    throw err;
  }
}
