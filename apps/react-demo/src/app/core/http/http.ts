import { AxiosInstance, AxiosRequestConfig } from "axios";
import qs from "qs";

import { createAxiosInstance } from "./axios";

export interface IHttp {
  instance: AxiosInstance;
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(
    url: string,
    body?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T>;
  put<T>(
    url: string,
    body?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(
    url: string,
    body?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T>;
}

const getConfig = (config: AxiosRequestConfig = {}): AxiosRequestConfig => {
  return {
    paramsSerializer: (params): string => {
      return qs.stringify(params, {
        encodeValuesOnly: true,
        arrayFormat: "repeat",
      });
    },
    ...config,
  };
};

class AxiosHttp implements IHttp {
  public instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  get = async <T extends unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => this.instance.get<T, T>(url, getConfig(config));

  delete = async <T extends unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => this.instance.delete<T, T>(url, getConfig(config));

  post = async <T extends unknown>(
    url: string,
    body?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> => this.instance.post<T, T>(url, body, getConfig(config));

  put = async <T extends unknown>(
    url: string,
    body?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> => this.instance.put<T, T>(url, body, getConfig(config));

  patch = async <T extends unknown>(
    url: string,
    body?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> => this.instance.patch<T, T>(url, body, getConfig(config));
}

export const axiosHttp = (baseURL: string): IHttp =>
  new AxiosHttp(createAxiosInstance(baseURL));
