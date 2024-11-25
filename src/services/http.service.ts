import { Injectable } from "@angular/core";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { environment } from '../environments/environment';

export class HttpRequestError extends Error {

  constructor(message = 'Network error', options?: ErrorOptions) {
    super(message, options);
  }
}

export class HttpResponseError extends Error {

  response: AxiosResponse;

  constructor(response: AxiosResponse, message?: string, options?: ErrorOptions) {
    super(message, options);
    this.response = response;
  }
}

@Injectable({ providedIn: 'root' })
export class HttpService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: environment.apiUrl,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async request<T>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.axiosInstance.request({
        ...options,
        url,
      });
    }
    catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          throw new HttpResponseError(err.response);
        }
        else if (err.request) {
          throw new HttpRequestError();
        }
      }
      throw err;
    }

  }

  public async get<T>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await this.request<T>(url, options);
  }

  public async post<T>(url: string, data?: unknown, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await this.request<T>(url, {
      ...options,
      method: 'POST',
      data,
    });
  }

  public async put<T>(url: string, data?: unknown, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await this.request<T>(url, {
      ...options,
      method: 'PUT',
      data,
    });
  }

  public async patch<T>(url: string, data?: unknown, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await this.request<T>(url, {
      ...options,
      method: 'PATCH',
      data,
    });
  }

  public async delete<T>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return await this.request<T>(url, {
      ...options,
      method: 'DELETE',
    });
  }
}
