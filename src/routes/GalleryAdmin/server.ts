import axios, { AxiosResponse } from "axios";

const VITE_SERVERURL = import.meta.env.VITE_SERVERURL;

const baseUrl = `${VITE_SERVERURL}/api/images`;
interface GalleryResponse {
  data: Object;
  imageNames: string[];
  response: string;
}
export function getImagesList() {
  return axios.get<GalleryResponse>(baseUrl + "/images-list");
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

export function uploadImage(formData: FormData) {
  return axios.post<GalleryResponse>(baseUrl + "/upload-image", formData, {
    headers: {
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
}

export function deleteImage(imageName: string) {
  return axios.delete<GalleryResponse>(baseUrl + "/delete/" + imageName, {
    headers: {
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
}
