export interface Camera {
    id: string;
    name: string;
    streamUrl: string;
  }

export interface Report {
    _id: string;
    text: string;
    category: string;
    location: { lat: number; lon: number };
    user: string;
  };