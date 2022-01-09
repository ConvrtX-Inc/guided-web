import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExODRkOTQxLWIzYTEtNGMxNS1hNTQxLThlODllODliOWM4ZCIsImlhdCI6MTY0MTI4NDQ1MiwiZXhwIjoxNjQyNTgwNDUyfQ.y5oYjIsOGMCriUnIpRASnmNAsntIFzG5NxAsJJLJ1JA";

export default axios.create({
  baseURL: "http://localhost:3000/api/v1/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
