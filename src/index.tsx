import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import "./index.scss";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";

import "./fonts/Gilroy/GilroyBold.ttf";
import "./fonts/Gilroy/GilroyExtraBold.ttf";
import "./fonts/Gilroy/GilroyMedium.ttf";
import "./fonts/Gilroy/GilroyRegular.ttf";
import "./fonts/Gilroy/GilroySemibold.ttf";

ReactDOM.render(
  <ReduxProvider store={store}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </ReduxProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
