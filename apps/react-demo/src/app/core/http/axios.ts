/* eslint-disable import/prefer-default-export */
import axios, { AxiosInstance } from "axios";
import { get } from "lodash";
import { IToastify, toastify } from "../../commons/components/toast/Toast";

export const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const remember = localStorage.getItem("remember") === "true";
  // Put token to each request
  let authToken: string | null;
  if (remember) {
    authToken = localStorage.getItem("access-token");
  } else {
    authToken = sessionStorage.getItem("access-token");
  }
  let basePath: string | undefined = "";
  const headers: { [key: string]: string } = {};

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const instance = axios.create({
    baseURL,
    responseType: "text",
    headers,
  });
  const toastifyConfig: IToastify = {
    type: "success",
    content: "",
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    draggable: true,
  };
  instance.interceptors.request.use(
      (config) => {
        basePath = config.url;
        return config;
      },
      (error) => {
        throw error;
      }
  );
  instance.interceptors.response.use(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (response): any => {
        if (response.status >= 400) {
          throw new Error(response.data.message);
        }
        return response.data;
      },
      (error): Error => {
        // eslint-disable-next-line no-param-reassign
        error = errorRemap(error);
        if (
            basePath &&
            (basePath.indexOf("login") !== -1 ||
                basePath.indexOf("register") !== -1)
        ) {
          throw error;
        }
        if (
            error &&
            (error.response?.data?.error ||
                error.response?.data?.message ||
                error.message)
        ) {
          toastify({
            ...toastifyConfig,
            content:
                error.response?.data?.error ||
                error.response?.data?.message ||
                error.message,
            type: "error",
          });
        } else {
          toastify({
            ...toastifyConfig,
            content: "Unexpected Error",
            type: "error",
          });
        }
        toastify({
          ...toastifyConfig,
          content: "Unexpected Error",
          type: "error",
        });
        throw new Error(
            error.response?.data?.error ??
            error.response?.data?.message ??
            error.message ??
            error
        );
      }
  );

  return instance;
};

const errorRemap = (error: any): Error => {
  const errorMessageMapping = {
    "401":
        "Username or password is not correct! Please recheck and login again!",
    "404":
        "Unexpected Error! Not Found Resource Path Of Domain",
    "error.usernameexists": "Username has been exsited. Please choose another.",
    "error.locked":
        "Account is locked! Please contact administrator to unlock!",
    "error.http.500": "Unexpected Error! Please contact administrator!",
  };
  if (error.response && error.response.data && error.response.data.message) {
    // eslint-disable-next-line no-param-reassign
    error.response.data.message = get(
        errorMessageMapping,
        error.response.data.message,
        ""
    );
  } else if (error.response && error.response.status === 401) {
    // eslint-disable-next-line no-param-reassign
    error = {response: {
      data: {
        message: get(errorMessageMapping, "401", "")
      }
      }}
  } else if (error.response.statusText === "Not Found" && error.response.status === 404) {
    // eslint-disable-next-line no-param-reassign
    error = {response: {
        data: {
          message: get(errorMessageMapping, "404", "")
        }
      }}
  } else if (error.response && error.response.data) {
    // eslint-disable-next-line no-param-reassign
    error.response.data = {
      message: get(errorMessageMapping, error.response?.status, ""),
    };
  } else {
    // eslint-disable-next-line no-param-reassign
    error = {response: {
        data: {
          message: get(errorMessageMapping, "error.http.500", "")
        }
      }}
  }
  return error;
};
