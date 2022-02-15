import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJiN2NmNDM1LTQwOTAtNGEzOC1hYzVhLTUzNzA3ZTQ0YmMwMCIsImlhdCI6MTY0NDg5NzIxOCwiZXhwIjoxNjQ2MTkzMjE4fQ.AHE2SZPqXLVgKP0FbYFbPUgE6PAhm0L5vIF6892Ylpc";

export default axios.create({
  baseURL: "https://dev-guided-convrtx.herokuapp.com/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
