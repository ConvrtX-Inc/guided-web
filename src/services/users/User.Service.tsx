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

const getUsers = (limit: number = 5, page: number = 1) => {
  return axios
    .get(API_URL + `api/v1/users?limit=${limit}&page=${page}`, config)
    .then((response) => {
      return response;
    });
};

const updateUserActiveStatus = (userId: string, isActive: boolean) => {
  return axios
      .patch(API_URL + `api/v1/users/${userId}`, {is_active: isActive}, config)
      .then((response) => {
        return response;
      });
}

const UserService = { getUsers, updateUserActiveStatus };

export default UserService;
