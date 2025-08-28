import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="h-full w-full">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
