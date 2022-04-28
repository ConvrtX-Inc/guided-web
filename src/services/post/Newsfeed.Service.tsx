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
const deleteNewsfeedImage = (id: string) => {
  return axios
    .delete(API_URL + `api/v1/activity-newsfeed-image/${id}`, config())
    .then((response) => {
      return response;
    });
};
const patchNewsfeedData = (id: string, data: any) => {
  return axios
    .patch(API_URL + `api/v1/activity-newsfeed/${id}`, data, config())
    .then((response) => {
      return response;
    });
};
const getNewsfeedData = (id: string) => {
  return axios
    .get(API_URL + `api/v1/activity-newsfeed/${id}`, config())
    .then((response) => {
      return response;
    });
};
const postOneNewsfeedImage = (data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-newsfeed-image/`, data, config())
    .then((response) => {
      return response;
    });
};
const getNewsfeedImages = (id: string) => {
  return axios
    .get(
      API_URL + `api/v1/activity-newsfeed-image/get-by-newsfeed/${id}`,
      config()
    )
    .then((response) => {
      return response;
    });
};
const NewsfeedService = {
  postOneNewsfeedImage,
  patchNewsfeedData,
  getNewsfeedData,
  getNewsfeedImages,
  deleteNewsfeedImage,
};
export default NewsfeedService;
