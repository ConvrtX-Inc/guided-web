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
const patchData = (id: string) => {
  return axios
    .patch(API_URL + `api/v1/user-types/${id}`, config)
    .then((response) => {
      return response;
    });
};
const UserTypeService = { patchData };

export default UserTypeService;
