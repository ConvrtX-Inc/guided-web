import axios from "axios";
import AuthHeader from "../Auth-Header";
const API_URL = process.env.REACT_APP_BACKEND_URL;
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: AuthHeader(),
  },
  params: {},
};
const loadPostCategory = () => {
  config["params"] = {};
  return axios
    .get(API_URL + "api/v1/activity-post-category", config)
    .then((response) => {
      return response;
    });
};

const postArticleData = (data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-article/`, data, config)
    .then((response) => {
      return response;
    });
};
const postArticleImage = (data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-article-image/bulk`, data, config)
    .then((response) => {
      return response;
    });
};
const postNewsFeedData = (data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-newsfeed/`, data, config)
    .then((response) => {
      return response;
    });
};
const postNewsFeedImage = (data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-newsfeed-image/bulk`, data, config)
    .then((response) => {
      return response;
    });
};
const postToActivityPost = (data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-post/`, data, config)
    .then((response) => {
      return response;
    });
};
const PostService = {
  loadPostCategory,
  postArticleData,
  postArticleImage,
  postNewsFeedData,
  postNewsFeedImage,
  postToActivityPost,
};
export default PostService;
