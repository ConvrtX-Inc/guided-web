import axios from "axios";
import AuthHeader from "../Auth-Header";
const API_URL = process.env.REACT_APP_BACKEND_URL;

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: AuthHeader(),
  },
};

const postData = (id: string, data: any) => {
  return axios
    .post(API_URL + `api/v1/guidelines/${id}`, data, config)
    .then((response) => {
      return response.data;
    });
};

const patchData = (id: string, data: any) => {
  return axios
    .patch(API_URL + `api/v1/guidelines/${id}`, data, config)
    .then((response) => {
      return response.data;
    });
};

const loadWaiverForm = () => {
  return axios
    .get(
      API_URL +
        "api/v1/guidelines?filter=type_name%7C%7C%24eq%7C%7CTraveler%20Release%20%26%20Waiver%20Form&limit=1",
      config
    )
    .then((response) => {
      return response.data;
    });
};

const loadTncs = () => {
  return axios
    .get(
      API_URL +
        "api/v1/guidelines?filter=type_name%7C%7C%24eq%7C%7CTerms%20%26%20Conditions&limit=1",
      config
    )
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

const loadCancellationPolicy = () => {
  return axios
    .get(
      API_URL +
        "api/v1/guidelines?filter=type_name%7C%7C%24eq%7C%7CCancellation%20Policy&limit=1",
      config
    )
    .then((response) => {
      return response.data;
    });
};

const loadFAQs = () => {
  return axios
    .get(
      API_URL + "api/v1/guidelines?filter=type_name%7C%7C%24eq%7C%7CFAQ",
      config
    )
    .then((response) => {
      return response.data;
    });
};

const loadLogs = () => {
  return axios
    .get(API_URL + "api/v1/guidelines?limit=5", config)
    .then((response) => {
      return response.data;
    });
};

const GuidelinesService = {
  patchData,
  postData,
  loadTncs,
  loadLocalLaws,
  loadPayoutTerms,
  loadWaiverForm,
  loadCancellationPolicy,
  loadFAQs,
  loadLogs,
};

export default GuidelinesService;
