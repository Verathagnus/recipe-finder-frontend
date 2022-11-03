import axios, { AxiosResponse } from "axios";
 
const VITE_SERVERURL = import.meta.env.VITE_SERVERURL;
import FormData from "form-data";
const baseUrl = `${VITE_SERVERURL}/api/recipes`;
 
export function getRecipesListLatest() {
  return axios.get(baseUrl + "/get-all-recipes-latest");
}

export function getRecipesListPopular() {
  return axios.get(baseUrl + "/get-all-recipes-popular");
}


export function getRecipesListAlphabetical() {
  return axios.get(baseUrl + "/get-all-recipes-alphabetical");
}

export function getRecipeImageUploadSign() {
  return axios.get(`${VITE_SERVERURL}/api/cloudinary/recipe`, {
    headers: {
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
}

export function getRecipe(id: string) {
  return axios.get(baseUrl + "/get-recipe-by-id/" + id);
}

export function filterForRecipe(formData: FormData) {
  return axios.post(baseUrl + "/get-recipe-by-filters", formData, {
    headers: {
      "Content-Type": "application/json"
    },
  });
}

export function createRecipe(formData: FormData) {
  console.log(formData)
  return axios.post(baseUrl + "/upload-recipe", formData, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
}

export function updateRecipe(formData: FormData) {
  return axios.post(baseUrl + "/modify-recipe", formData, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
}

export function deleteRecipe(id: string) {
  return axios.post(baseUrl + "/delete/" + id, {
    headers: {
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
}
