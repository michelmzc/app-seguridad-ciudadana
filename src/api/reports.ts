import axios from 'axios';
import env from './env';

const API_URL = env().API_URL;

export const sendReport = async ({
    text,
    category,
    location,
    userId,
  }:{
    text: string;
    category: string;
    location: { latitude: number; longitude: number };
    userId: string;
  }) => {
    return axios.post(`${API_URL}/reports`, {
      text,
      category,
      location: {
        lat: location.latitude,
        lon: location.longitude,
      },
      user: userId,
    });
};

export const getReports = async () => {
  try {
    const response = await axios.get(`${API_URL}/reports`)
    return response;
  } catch (error) {
    console.log('Error al obtener reportes:', error);
    throw new Error('Error al obtener reportes:');
  }
};

export const shareUserCameras = async (cameraId: string) => {
  const oneHourLater = new Date(Date.now() + 60 * 60 * 1000); // 1 hora desde ahora

  return axios.patch(`${API_URL}/cameras/${ cameraId }/share`, {
    isPublic: true,
    publicUntil: oneHourLater,
  });
}