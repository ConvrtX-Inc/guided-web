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
const getArticleData = (id: string) => {
  return axios
    .get(API_URL + `api/v1/activity-article/${id}`, config())
    .then((response) => {
      return response;
    });
};
const ArticleService = { getArticleData };
export default ArticleService;
