// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API,
// });

// export const fetchVideos = async (auth_token: string) => {
//   if (!auth_token) {
//     alert("Login Required");
//     return;
//   }
//   const headers = { Authorization: "Bearer my-token" };
//   const res = await api.get("/videos", {headers
//   });
//   return res?.status === 200 ? res.data : [];
// };
const baseUrl = import.meta.env.VITE_API;

export const fetchVideos = async (auth_token: string) => {
  const res = await fetch(`${baseUrl}/videos`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  });
  if (!res.ok) throw new Error("Error");

  return res.json();
};
export const fetchOneVideo = async (id: string, auth_token: string) => {
  const res = await fetch(`${baseUrl}/videos/${id}`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  });
  if (!res.ok) throw new Error("Error");

  return res.json();
};
export const fetchRecomendedVideos = async (id: string, auth_token: string) => {
  const res = await fetch(`${baseUrl}/videos/${id}/recommended`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  });
  if (!res.ok) throw new Error("Error");

  return res.json();
};
