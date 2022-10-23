import axios, { AxiosResponse } from "axios";

const VITE_SERVERURL = import.meta.env.VITE_SERVERURL;

const baseUrl = `${VITE_SERVERURL}/api/careers`;

export function getAllResumeList() {
  return axios.get(baseUrl + "/get-all-resume");
}

export function getResumeById(id: string) {
  return axios.get(baseUrl + "/get-resume-by-id/" + id);
}
export function getCareerUploadSign() {
  return axios.get(`${VITE_SERVERURL}/api/cloudinary/career`);
}

export function uploadResume(formData: any) {
  return axios.post(baseUrl + "/upload-resume", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function deleteResume(id: string) {
  return axios.delete(baseUrl + "/delete/" + id);
}
