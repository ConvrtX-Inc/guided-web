import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const login = (email: string, password: string) => {
  return axios
    .post(
      API_URL + "api/v1/auth/email/login",
      JSON.stringify({
        email,
        password,
      }),
      config
    )
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const AuthService = {
  login,
};

export default AuthService;
