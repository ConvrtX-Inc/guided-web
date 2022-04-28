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
const getTransactions = () => {
  return axios
    .get(API_URL + `api/v1/transactions`, config)
    .then((response) => {
      return response;
    });
};
const TransactionHistoryService = { getTransactions };

export default TransactionHistoryService;
