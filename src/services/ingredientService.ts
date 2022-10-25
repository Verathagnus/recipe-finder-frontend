import axios, { AxiosResponse } from "axios";

const VITE_SERVERURL = import.meta.env.VITE_SERVERURL;
import FormData from "form-data";
const baseUrl = `${VITE_SERVERURL}/api/ingredients`;

export function getIngredientsListPopular() {
  return axios.get(baseUrl + "/get-all-ingredients-popular");
}

export function getIngredientsListAlphabetical() {
  return axios.get(baseUrl + "/get-all-ingredients-alphabet");
}

export function getIngredientImageUploadSign() {
  return axios.get(`${VITE_SERVERURL}/api/cloudinary/ingredient`, {
    headers: {
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
}

export function getIngredient(id: string) {
  return axios.get(baseUrl + "/get-ingredient-by-id/" + id);
}

export function createIngredient(formData: FormData) {
  return axios.post(baseUrl + "/upload-ingredient", formData, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
}

export function updateIngredient(formData: FormData) {
  return axios.post(baseUrl + "/modify-ingredient", formData, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
}

export function deleteIngredient(id: string) {
  return axios.post(baseUrl + "/delete/" + id, {
    headers: {
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
}
