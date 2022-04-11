//Get User Token
export default function AuthHeader(token?: string) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user && user.token) {
    return "Bearer " + user.token;
  } else if (token) {
    return "Bearer " + token;
  } else {
    return "";
  }
}
