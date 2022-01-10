import { Outlet } from "react-router-dom";
import GuidelinesContainer from "./GuidelinesContainer";
import GuidelinesNav from "./GuidelinesNav";

const GuidelinesScreen = () => {
  return (
    <GuidelinesContainer>
      <GuidelinesNav />
      <Outlet />
    </GuidelinesContainer>
  );
};

export default GuidelinesScreen;
