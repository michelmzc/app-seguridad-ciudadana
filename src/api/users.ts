import axios from './axios'

export const updateUserLocation = async (userId: string, lat: number, lon: number) => {
  try {
    return await axios.patch(`/users/${userId}/location`, { lat, lon });
  } catch (err: any) {
    throw new Error(err?.message || 'Error desconocido actualizando ubicación');
  }
};
