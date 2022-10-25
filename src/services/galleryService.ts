import axios, { AxiosResponse } from "axios";

const VITE_SERVERURL = import.meta.env.VITE_SERVERURL;
import FormData from "form-data";
const baseUrl = `${VITE_SERVERURL}/api/images`;

export function getImagesList() {
  return axios.get(baseUrl + "/images-list");
}
export function getImageUploadSign() {
  return axios.get(`${VITE_SERVERURL}/api/cloudinary/gallery`, {
    headers: {
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
}

export function deleteImage(imagePublicId: string) {
  console.log(imagePublicId);
  var newData = new FormData();
  newData.append("id", imagePublicId);
  return axios.post(baseUrl + "/delete", newData, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
}
