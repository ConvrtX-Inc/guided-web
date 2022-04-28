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
const deleteArticleImage = (id: string) => {
  return axios
    .delete(API_URL + `api/v1/activity-article-image/${id}`, config())
    .then((response) => {
      return response;
    });
};
const patchArticleData = (id: string, data: any) => {
  return axios
    .patch(API_URL + `api/v1/activity-article/${id}`, data, config())
    .then((response) => {
      return response;
    });
};
const getArticleData = (id: string) => {
  return axios
    .get(API_URL + `api/v1/activity-article/${id}`, config())
    .then((response) => {
      return response;
    });
};
const getArticleImages = (id: string) => {
  return axios
    .get(
      API_URL + `api/v1/activity-article-image/get-by-article/${id}`,
      config()
    )
    .then((response) => {
      return response;
    });
};
const postOneArticleImage = (data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-article-image/`, data, config())
    .then((response) => {
      return response;
    });
};
const ArticleService = {
  postOneArticleImage,
  patchArticleData,
  getArticleData,
  getArticleImages,
  deleteArticleImage,
};
export default ArticleService;
