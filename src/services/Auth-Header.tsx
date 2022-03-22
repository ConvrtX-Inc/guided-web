export default function AuthHeader() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  //if (user && user.accessToken) {
  if(user && user.token){
  //return { Authorization: "Bearer " + user.accessToken };
    //return "Bearer " + user.accessToken;
    return "Bearer " + user.token;
  } else {
    return "";
  }
}
