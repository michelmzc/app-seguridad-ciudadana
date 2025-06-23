
import axios from "./axios";
import env from './env';

const API_URL = env().API_URL;

export const makeCameraPublic = async (cameraId: string) => {
  return axios.post(`${API_URL}/cameras/${cameraId}/share`, {
    isPublic: true,
  });
};
