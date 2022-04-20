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
const loadActivityPost = (id: string) => {
  config()["params"] = {};
  return axios
    .get(API_URL + `api/v1/sub-admin-post/activity-post/${id}`, config())
    .then((response) => {
      return response;
    });
};
const loadPostCategory = () => {
  config()["params"] = {};
  return axios
    .get(API_URL + "api/v1/activity-post-category", config())
    .then((response) => {
      return response;
    });
};
const postActivityPackageData = (data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-packages/`, data, config())
    .then((response) => {
      return response;
    });
};
const postActivityPackageFormsData = (data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-package-forms/`, data, config())
    .then((response) => {
      return response;
    });
};
const postEventFormsData = (data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-event-forms/`, data, config())
    .then((response) => {
      return response;
    });
};
const postEventData = (data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-event/`, data, config())
    .then((response) => {
      return response;
    });
};
const postActivityPackageImage = (data: any) => {
  return axios
    .post(
      API_URL + `api/v1/activity-package-destination-images/bulk`,
      data,
      config()
    )
    .then((response) => {
      return response;
    });
};
const postEventDataImage = (data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-event-image/bulk`, data, config())
    .then((response) => {
      return response;
    });
};
const postActivityPackageDataDestination = (data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-package-destinations/`, data, config())
    .then((response) => {
      return response;
    });
};
const postEventDataDestination = (data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-event/`, data, config())
    .then((response) => {
      return response;
    });
};
const postArticleData = (data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-article/`, data, config())
    .then((response) => {
      return response;
    });
};
const postArticleImage = (data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-article-image/bulk`, data, config())
    .then((response) => {
      return response;
    });
};
const postNewsFeedData = (data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-newsfeed/`, data, config())
    .then((response) => {
      return response;
    });
};
const postNewsFeedImage = (data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-newsfeed-image/bulk`, data, config())
    .then((response) => {
      return response;
    });
};
const postToActivityPost = (data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-post/`, data, config())
    .then((response) => {
      return response;
    });
};
const PostService = {
  loadActivityPost,
  loadPostCategory,
  //article
  postArticleData,
  postArticleImage,
  //newsfeed
  postNewsFeedData,
  postNewsFeedImage,

  postToActivityPost,

  //activity-package
  postActivityPackageData,
  postActivityPackageFormsData,
  postActivityPackageDataDestination,
  postActivityPackageImage,

  //events
  postEventData,
  postEventDataDestination,
  postEventDataImage,
  postEventFormsData,
};
export default PostService;
