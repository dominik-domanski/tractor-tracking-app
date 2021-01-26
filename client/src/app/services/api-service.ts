import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from "axios";
import { StatusCodes } from "http-status-codes";
import { RequestBodyType } from "../types/request-body-type";

const BACKEND_DOMAIN = "http://localhost:3000";
const { CONFLICT, OK, CREATED } = StatusCodes;

class ApiService {
  protected readonly instance: AxiosInstance;

  public constructor() {
    this.instance = axios.create();

    this._initializeResponseInterceptor();
    this._initializeRequestInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError
    );
  };

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };

  private _handleResponse = ({ status, data }: AxiosResponse) => {
    if ([OK, CREATED].includes(status) && data) {
      return data;
    }
    return undefined;
  };

  private _handleRequest = (config: AxiosRequestConfig) => {
    const newConfig = { ...config };
    newConfig.headers["Content-type"] = "application/json";
    newConfig.withCredentials = true;
    newConfig.baseURL = `${BACKEND_DOMAIN}/api`;
    return newConfig;
  };

  protected _handleError = (error: AxiosError) => {
    if (error.response) {
      // here we can intercept any error
      const { status } = error.response;
      if (status === CONFLICT) {
        return Promise.resolve(error.response.data);
      }
    }
    // this should be done in a bigger project in more sofisticated way
    console.error(error.message);
    return Promise.reject(error);
  };

  get<T>(url: string, axiosConfig?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, axiosConfig);
  }

  post<T>(url: string, body?: RequestBodyType): Promise<T> {
    return this.instance.post(url, body);
  }

  put<T>(url: string, body: RequestBodyType): Promise<T> {
    return this.instance.put(url, body);
  }

  delete<T>(url: string): Promise<T> {
    return this.instance.delete(url);
  }
}

export default new ApiService();
