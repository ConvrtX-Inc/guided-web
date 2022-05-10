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
const patchOutfitterData = (id: string, data: any) => {
  return axios
    .patch(API_URL + `api/v1/activity-outfitter/${id}`, data, config())
    .then((response) => {
      return response;
    });
};
const getOutfitterData = (id: string) => {
  return axios
    .get(API_URL + `api/v1/activity-outfitter/${id}`, config())
    .then((response) => {
      return response;
    });
};
const getOutfitterImages = (id: string) => {
  return axios
    .get(
      API_URL +
        `api/v1/activity-outfitter-image?filter=activity_outfitter_id||$eq||${id}&limit=5`,
      config()
    )
    .then((response) => {
      return response;
    });
};
const postOneOutfitterImage = (data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-outfitter-image`, data, config())
    .then((response) => {
      return response;
    });
};
const deleteOutfitterImage = (id: string) => {
  return axios
    .delete(API_URL + `api/v1/activity-outfitter-image/${id}`, config())
    .then((response) => {
      return response;
    });
};
const OutfitterService = {
  patchOutfitterData,
  getOutfitterData,
  deleteOutfitterImage,
  postOneOutfitterImage,
  getOutfitterImages,
};
export default OutfitterService;
