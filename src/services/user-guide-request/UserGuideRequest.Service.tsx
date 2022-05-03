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

const getData = () => {
    return axios
        .get(API_URL + `api/v1/user-guide-request?sort=created_date,DESC`, config)
        .then((response) => {
            return response;
        });
};

const patchData = (id: string, data: any) => {
    return axios
        .patch(API_URL + `api/v1/user-guide-request/${id}`, data, config)
        .then((response) => {
            return response;
        });
};

const UserGuideRequestService = {
    getData,
    patchData
};

export default UserGuideRequestService;
