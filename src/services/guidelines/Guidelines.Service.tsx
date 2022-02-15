import axios from "axios";
import AuthHeader from "../Auth-Header";
const API_URL = process.env.REACT_APP_BACKEND_URL;

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: AuthHeader(),
  },
};

const postPayoutTerms = (id: string, data: any) => {
  return axios
    .post(API_URL + `api/v1/guidelines/${id}`, data, config)
    .then((response) => {
      return response.data;
    });
};

const patchPayoutTerms = (id: string, data: any) => {
  return axios
    .patch(API_URL + `api/v1/guidelines/${id}`, data, config)
    .then((response) => {
      return response.data;
    });
};

const loadPayoutTerms = () => {
  return axios
    .get(
      API_URL +
        "api/v1/guidelines?filter=type_name%7C%7C%24eq%7C%7CGuided%20Payment&limit=1",
      config
    )
    .then((response) => {
      return response.data;
    });
};

const postLocalLaws = (id: string, data: any) => {
  return axios
    .post(API_URL + `api/v1/guidelines/${id}`, data, config)
    .then((response) => {
      return response.data;
    });
};

const patchLocalLaws = (id: string, data: any) => {
  return axios
    .patch(API_URL + `api/v1/guidelines/${id}`, data, config)
    .then((response) => {
      return response.data;
    });
};

const loadLocalLaws = () => {
  return axios
    .get(
      API_URL +
        "api/v1/guidelines?filter=type_name%7C%7C%24eq%7C%7CLocal%20Laws&limit=1",
      config
    )
    .then((response) => {
      return response.data;
    });
};

const GuidelinesService = {
  postLocalLaws,
  patchLocalLaws,
  loadLocalLaws,
  loadPayoutTerms,
  postPayoutTerms,
  patchPayoutTerms,
};

export default GuidelinesService;
