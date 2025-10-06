/* eslint-disable no-debugger */
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setFeed } from "../utils/feedSlice";
import { useNavigate } from "react-router-dom";
import FeedCard from "./FeedCard";
import { baseURL } from "../utils/constants";

const Home = () => {
  // const user = useSelector((store) => store.user);
  const feedData = useSelector((store) => store.feed.feed);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isChange, setIsChange] = useState(false);
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const feedData = await axios.get(baseURL + "/feed", {
          withCredentials: true,
        });
        console.log({ feedData });

        dispatch(setFeed(feedData?.data?.data));
        setIsChange(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // User is not authenticated, redirect to login
          navigate("/login");
        }
        console.log("Error fetching user data:", error);
      }
    };
    fetchFeed();
  }, [isChange]);

  return (
    <div className="flex flex-row justify-center items-center flex-wrap">
      {feedData &&
        feedData.map((user) => (
          <FeedCard user={user} setIsChange={setIsChange} key={user._id} />
        ))}
    </div>
  );
};

export default Home;
