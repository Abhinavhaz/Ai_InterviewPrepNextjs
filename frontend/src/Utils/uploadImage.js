import { API_PATH } from "./apiPath";
import axiosInstance from "./axiosInstance";

const uploadImage = async (image) => {
const formData = new FormData();
formData.append("image",image);

try {
    const response = await axiosInstance.post(API_PATH.IMAGE.UPLOAD_IMAGE,formData,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
} catch (error) {
    console.log("Error uploading image",error);
    throw error;
}




}

export default uploadImage;