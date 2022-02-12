import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJiN2NmNDM1LTQwOTAtNGEzOC1hYzVhLTUzNzA3ZTQ0YmMwMCIsImlhdCI6MTY0MjUzODk4OSwiZXhwIjoxNjQzODM0OTg5fQ.l34oKBblB-ZUpAfxCFdmIXnbifbV0PF8fPHevt4ZJaY";

export default axios.create({
  baseURL: "https://dev-guided-convrtx.herokuapp.com/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
