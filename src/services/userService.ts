import axios, { AxiosResponse } from "axios";
import FormData from "form-data";
const VITE_SERVERURL = import.meta.env.VITE_SERVERURL;

export function VerifyJWT(jwtToken: string | null) {
  if (jwtToken === null) {
    axios.get(`${VITE_SERVERURL}/api/login/verify`, {
      headers: {
        "x-auth-token": "random",
      },
    });
  }
  return axios.get(`${VITE_SERVERURL}/api/login/verify`, {
    headers: {
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
}

export function AdminLogin(formData: any) {
  return axios.post(`${VITE_SERVERURL}/api/login`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function UserProfilePic(formData: any) {
  return axios.post(`${VITE_SERVERURL}/api/update-profile-pic`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}