import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { baseURL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await axios.get(baseURL + "/user", {
          withCredentials: true,
        });

        console.log("userdata::", userData?.data);

        dispatch(setUser(userData?.data));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // User is not authenticated, redirect to login
          navigate("/login");
        }
        console.log("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="h-full w-full">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
