import axios from "axios";
import AuthHeader from "../Auth-Header";
const API_URL = process.env.REACT_APP_BACKEND_URL;
const config = (token?: string) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: AuthHeader(),
  },
  params: {},
});
const patchAdsData = (id: string, data: any) => {
  return axios
    .patch(API_URL + `api/v1/activity-advertisement/${id}`, data, config())
    .then((response) => {
      return response;
    });
};
const getAdsData = (id: string) => {
  return axios
    .get(API_URL + `api/v1/activity-advertisement/${id}`, config())
    .then((response) => {
      return response;
    });
};
const getAdsImages = (id: string) => {
  return axios
    .get(
      API_URL +
        `api/v1/activity-advertisement-image?filter=activity_advertisement_id||$eq||${id}&limit=5`,
      config()
    )
    .then((response) => {
      return response;
    });
};
const postOneAdsImage = (data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-advertisement-image`, data, config())
    .then((response) => {
      return response;
    });
};
const deleteAdsImage = (id: string) => {
  return axios
    .delete(API_URL + `api/v1/activity-advertisement-image/${id}`, config())
    .then((response) => {
      return response;
    });
};
const AdsService = {
  getAdsData,
  deleteAdsImage,
  postOneAdsImage,
  patchAdsData,
  getAdsImages,
};
export default AdsService;
