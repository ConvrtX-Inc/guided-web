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
const OutfitterService = { patchOutfitterData, getOutfitterData };
export default OutfitterService;
