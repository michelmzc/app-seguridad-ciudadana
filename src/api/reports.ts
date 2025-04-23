import axios from 'axios';
import env from './env';

const API_URL = env().API_URL;

export const sendReport = async ({
    text,
    category,
    location,
    userId,
  }: {
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