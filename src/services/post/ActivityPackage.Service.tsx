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
const deleteActivityPackageImage = (id: string) => {
  return axios
    .delete(API_URL + `api/v1/activity-article-image/${id}`, config())
    .then((response) => {
      return response;
    });
};
const patchActivityPackageData = (id: string, data: any) => {
  return axios
    .patch(API_URL + `api/v1/activity-packages/${id}`, data, config())
    .then((response) => {
      return response;
    });
};
const patchActivityPackageDataDestination = (id: string, data: any) => {
  return axios
    .patch(
      API_URL + `api/v1/activity-package-destinations/${id}`,
      data,
      config()
    )
    .then((response) => {
      return response;
    });
};
const getActivityPackageData = (id: string) => {
  return axios
    .get(API_URL + `api/v1/activity-packages/${id}`, config())
    .then((response) => {
      return response;
    });
};
const getActivityPackageImages = (id: string) => {
  return axios
    .get(
      API_URL +
        `api/v1/activity-package-destination-images?filter=activity_package_destination_id||$eq||${id}&limit=5`,
      config()
    )
    .then((response) => {
      return response;
    });
};
const postOneActivityPackageImage = (data: any) => {
  return axios
    .post(
      API_URL + `api/v1/activity-package-destination-images/`,
      data,
      config()
    )
    .then((response) => {
      return response;
    });
};
const getActivityPackageDestination = (id: string) => {
  return axios
    .get(
      API_URL +
        `api/v1/activity-package-destinations?filter=activity_package_id||$eq||${id}&limit=1`,
      config()
    )
    .then((response) => {
      return response;
    });
};
const getActivityPackageForms = (id: string) => {
  return axios
    .get(
      API_URL +
        `api/v1/activity-package-forms?filter=activity_package_id||$eq||${id}&limit=1`,
      config()
    )
    .then((response) => {
      return response;
    });
};
const deleteActivityPackageDestinationImage = (id: string) => {
  return axios
    .delete(
      API_URL + `api/v1/activity-package-destination-images/${id}`,
      config()
    )
    .then((response) => {
      return response;
    });
};
const patchActivityPackageFormsData = (id: string, data: any) => {
  return axios
    .patch(API_URL + `api/v1/activity-package-forms/${id}`, data, config())
    .then((response) => {
      return response;
    });
};
const ActivityPackageService = {
  deleteActivityPackageDestinationImage,
  getActivityPackageForms,
  postOneActivityPackageImage,
  patchActivityPackageData,
  getActivityPackageData,
  getActivityPackageImages,
  deleteActivityPackageImage,
  getActivityPackageDestination,
  patchActivityPackageDataDestination,
  patchActivityPackageFormsData,
};
export default ActivityPackageService;
