import axios, { AxiosError } from 'axios';


const API_BASE_URL = "https://weather-subscribe-service.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export type WeatherResponse = {
  temperature: number;
  humidity: number;
  description: string;
};

export type SubscribePayload = {
  email: string;
  city: string;
  frequency: "hourly" | "daily";
};
type ErrorResponse = {
  message: string;
};

class API {
  async getWeather(city: string): Promise<WeatherResponse> {
    try {
      const response = await api.get<WeatherResponse>("/weather", { params: { city } });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        console.error("Axios error:", axiosError.response?.data?.message);
        throw axiosError; 
      } else {
        throw new Error("unknown error");
      }
    }
  }


  async subscribe(payload: SubscribePayload): Promise<string> {
    try {
      const response = await api.post(
        "/subscribe",{
          email: payload.email,
          city: payload.city,
          frequency: payload.frequency,
        },
      );
      return response.data.message;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        console.error("Axios error:", axiosError.response?.data?.message);
        throw axiosError;
      } else {
        throw new Error("Unknown error");
      }
    }
  }

  async confirmSubscription(token: string): Promise<string> {
    try {
      const response = await api.get(`/confirm/${token}`);
      return response.data.message;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        console.error("Axios error:", axiosError.response?.data?.message);
        throw axiosError;
      } else {
        throw new Error("Unknown error");
      }
    }
  }

  async unsubscribe(token: string): Promise<string> {
    try {
      const response = await api.get(`/unsubscribe/${token}`);
      return response.data.message;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        console.error("Axios error:", axiosError.response?.data?.message);
        throw axiosError;
      } else {
        throw new Error("Unknown error");
      }
    }
  }
}

const weatherApi = new API();
export default weatherApi;
