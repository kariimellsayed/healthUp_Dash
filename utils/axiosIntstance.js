"use client";

import axios from "axios";

const onAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true,
});

onAxios.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("token-healthUp");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default onAxios;
