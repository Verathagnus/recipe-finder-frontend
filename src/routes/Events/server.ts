import axios, { AxiosResponse } from "axios";
import FormData from "form-data";
const VITE_SERVERURL = import.meta.env.VITE_SERVERURL;

const baseUrl = `${VITE_SERVERURL}/api/events`;

export function getEventUploadSign() {
  return axios.get(`${VITE_SERVERURL}/api/cloudinary/events`, {
    headers: {
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
}

export function getAllEventList() {
  return axios.get(baseUrl + "/get-all-events");
}

export function getEventById(id: string) {
  return axios.get(baseUrl + "/get-event-by-id/" + id);
}

export function uploadEventWithAttachment(formData: FormData) {
  return axios.post(baseUrl + "/upload-event-with-attachment", formData, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
}

export function uploadEventWithoutAttachment(formData: FormData) {
  // formData.append("uploaded")
  return axios.post(baseUrl + "/upload-event-without-attachment", formData, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
}

export function deleteEvent(id: string) {
  console.log(id);
  return axios.delete(baseUrl + "/delete/" + id, {
    headers: {
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
}
