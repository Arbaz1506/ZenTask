import { API_PATHS } from './apiPaths';
import axiosInstance from './axiosInstance';

const uploadImage = async (imageFile) => {
  if (!imageFile) throw new Error("No file provided");

  const formData = new FormData();
  formData.append('image', imageFile); // Make sure backend expects 'image'

  try {
    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // Return the uploaded image URL or any data the backend sends
    return response.data;
  } catch (error) {
    console.error('Error uploading the image:', error.response?.data || error.message);
    throw error;
  }
};

export default uploadImage;
