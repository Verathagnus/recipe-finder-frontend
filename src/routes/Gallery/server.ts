import axios, { AxiosResponse } from "axios";

const VITE_SERVERURL = import.meta.env.VITE_SERVERURL;
import FormData from "form-data";
const baseUrl = `${VITE_SERVERURL}/api/images`;
interface GalleryResponse {
  data: Object;
  imageNames: string[];
  response: string;
}
export function getImagesList() {
  return axios.get<any>(baseUrl + "/images-list");
}
export function getImageUploadSign() {
  return axios.get(`${VITE_SERVERURL}/api/cloudinary/gallery`, {
    headers: {
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
}
// export function getImage(name: string){
//     return axios.get(baseUrl+"/get-image-by-name/"+name);
// }

// export const getAllImages = async () => {
//     const resp = await getImagesList();
//     const imagesList = resp.data;
//     const images: any = [];
//     for(let i = 0; i < imagesList.length; i++){
//         const res = await getImage(images[i]);
//         images.push(res.data);
//     }
//     return images;
// }

// export function uploadImage(formData: FormData){
//     return axios.post<GalleryResponse>(baseUrl+"/upload-image", formData);
// }

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
