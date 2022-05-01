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
const getEventData = (id: string) => {
  return axios
    .get(API_URL + `api/v1/activity-events/${id}`, config())
    .then((response) => {
      return response;
    });
};
const postOneEventImage = (data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-event-destination-images/`, data, config())
    .then((response) => {
      return response;
    });
};
const getEventImages = (id: string) => {
  return axios
    .get(API_URL + `api/v1/activity-event-image/get-by-article/${id}`, config())
    .then((response) => {
      return response;
    });
};
const getActivityEventDestination = (id: string) => {
  return axios
    .get(
      API_URL +
        `api/v1/activity-event-destination?filter=activity_package_id||$eq||${id}&limit=1`,
      config()
    )
    .then((response) => {
      return response;
    });
};
const getActivityEventForms = (id: string) => {
  return axios
    .get(
      API_URL +
        `api/v1/activity-event-forms?filter=activity_event_id||$eq||${id}&limit=1`,
      config()
    )
    .then((response) => {
      return response;
    });
};
const deleteEventDestinationImage = (id: string) => {
  return axios
    .delete(
      API_URL + `api/v1/activity-event-destination-images/${id}`,
      config()
    )
    .then((response) => {
      return response;
    });
};
const patchActivityEventsData = (id: string, data: any) => {
  return axios
    .patch(API_URL + `api/v1/activity-events/${id}`, data, config())
    .then((response) => {
      return response;
    });
};
const patchActivityEventDataDestination = (id: string, data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-event-destinations/${id}`, data, config())
    .then((response) => {
      return response;
    });
};
const patchActivityEventFormsData = (id: string, data: any) => {
  return axios
    .post(API_URL + `api/v1/activity-event-forms/${id}`, data, config())
    .then((response) => {
      return response;
    });
};
const EventService = {
  deleteEventDestinationImage,
  patchActivityEventsData,
  getActivityEventForms,
  getActivityEventDestination,
  getEventImages,
  getEventData,
  postOneEventImage,
  patchActivityEventDataDestination,
  patchActivityEventFormsData,
};
export default EventService;
