// import axios from "axios";

import axios from "axios";

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

export const getUserDetails = async (email: string) => {
  const res = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password: "TechEniac@123",
    }),
  });

  if (!res.ok) return res;

  return res.json();
};

export const fetchVideos = async (
  auth_token: string,
  page: number = 1,
  limit: number = 20,
) => {
  const res = await fetch(`${baseUrl}/videos?page=${page}&limit=${limit}`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  });
  if (!res.ok) throw new Error("Error wihle fetching all videos");

  return res.json();
};
export const fetchOneVideo = async (id: string, auth_token: string) => {
  const res = await fetch(`${baseUrl}/videos/${id}`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  });
  if (!res.ok) return res;

  return res.json();
};
export const fetchRecomendedVideos = async (id: string, auth_token: string) => {
  const res = await fetch(`${baseUrl}/videos/${id}/recommended`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  });
  if (!res.ok) throw new Error("Error while fetching recomended video");

  return res.json();
};
export const fetchAccessToken = async (refresh_token: string) => {
  console.log(refresh_token);
  const res = await fetch(`${baseUrl}/auth/refresh`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: refresh_token,
    }),
  });
  console.log(await res.json());
  if (!res.ok) throw new Error("Error while fetching new accessToken");

  return res.json();
};
export const uploadImage = async (auth_token: string, file: File) => {
  console.log("file", file);
  const res = await fetch(`${baseUrl}/uploads/thumbnails/presign`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type,
    }),
  });
  console.log("inner", res);
  if (!res.ok) return res;
  return res.json();
};
export const uploadVideo = async (auth_token: string, file: File) => {
  console.log("file", file);
  const res = await fetch(`${baseUrl}/uploads/videos/initiate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify({
      fileName: file.name,
      fileSize: file.size,
      contentType: file.type,
    }),
  });
  console.log("inner", res);
  if (!res.ok) return res;
  return res.json();
};
export const publishVideo = async (
  auth_token: string,
  title: string,
  description: string,
  category: string,
  videoKey: string,
  thumbnailKey: string,
) => {
  const res = await fetch(`${baseUrl}/videos`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify({
      title,
      description,
      category,
      videoKey,
      thumbnailKey,
    }),
  });
  if (!res.ok) return res;
  return res.json();
};
export const doLikeInVideos = async (
  auth_token: string,
  type: string,
  video_id: string,
) => {
  const res = await fetch(`${baseUrl}/videos/${video_id}/reaction`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify({
      type,
    }),
  });
  if (!res.ok) return res;
  return res.json();
};
export const SearchVideo = async (text: string) => {
  const token = localStorage.getItem("auth_token");
  try {
    console.log(token);
    const { data } = await axios.get(`${baseUrl}/videos`, {
      params: {
        search: text,
      },
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token} `,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getMyVideos = async (auth_token: string) => {
  const res = await fetch(`${baseUrl}/videos/mine`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth_token}`,
    },
  });
  if (!res.ok) return res;
  return  res.json();
};
