import axios, {AxiosInstance, AxiosRequestConfig, AxiosError} from 'axios';

const baseURL = 'http://localhost:8000/';

class AxiosService {
  private static instance: AxiosService;
  private axiosInstance: AxiosInstance;
  private token: string | null = null;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
    });

    this.axiosInstance.interceptors.request.use(
      async (config: any) => {
        if (this.token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
            'X-Platform': 'mobile',
          };
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error),
    );
  }

  public static getInstance(): AxiosService {
    if (!AxiosService.instance) {
      AxiosService.instance = new AxiosService();
    }
    return AxiosService.instance;
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  post(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<any> {
    return this.axiosInstance.post(endpoint, data, config);
  }

  get(endpoint: string, config?: AxiosRequestConfig): Promise<any> {
    return this.axiosInstance.get(endpoint, config);
  }

  setToken(token: string) {
    this.token = token;
  }
}

export default AxiosService.getInstance();
