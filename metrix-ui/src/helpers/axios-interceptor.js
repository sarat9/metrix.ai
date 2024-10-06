import axios from "axios";
// axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (request) => {
    request.url =
      process.env.REACT_APP_API_PROTOCOL +
      process.env.REACT_APP_API_HOST +
      ":" +
      process.env.REACT_APP_API_PORT +
      process.env.REACT_APP_API_PREFIX +
      request.url;

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
