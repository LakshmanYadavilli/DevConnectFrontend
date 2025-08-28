/* eslint-disable no-debugger */
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";
import { setFeed } from "../utils/feedSlice";
import { useNavigate } from "react-router-dom";
import FeedCard from "./FeedCard";

const Home = () => {
  const user = useSelector((store) => store.user);
  const feedData = useSelector((store) => store.feed.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await axios.get("http://localhost:3000/user", {
          withCredentials: true,
        });
        const feedData = await axios.get("http://localhost:3000/feed", {
          withCredentials: true,
        });
        console.log({ feedData });

        console.log("userdata::", userData?.data);

        dispatch(setFeed(feedData?.data?.data));
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
    <div className="flex  justify-center items-center">
      {feedData &&
        feedData.map((user) => <FeedCard user={user} key={user._id} />)}
    </div>
  );
};

export default Home;
