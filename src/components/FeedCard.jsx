import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../utils/constants";

const FeedCard = ({ user, setIsChange }) => {
  const { firstName, lastName, age, gender, about, skills, _id } =
    user?.fromUserId || user;
  const location = useLocation();
  const isHomePage = location.pathname === "/" ? true : false;
  const isConnectionPage = location.pathname === "/connections" ? true : false;
  const handleIgnoreOrReject = async () => {
    try {
      if (isHomePage) {
        const res = await axios.post(
          baseURL + "/connection/pass/" + _id,
          {},
          { withCredentials: true }
        );
        setIsChange(true);
        console.log("res:::", res);
      } else {
        await axios.post(
          baseURL + "/connection/review/rejected/" + _id,
          {},
          { withCredentials: true }
        );
        setIsChange(true);
      }
    } catch (e) {
      console.log("error:", e);
    }
  };
  const handleInterestOrAccept = async () => {
    try {
      if (isHomePage) {
        console.log("handleInterest clicked:::");
        const res = await axios.post(
          baseURL + "/connection/interested/" + _id,
          {},
          { withCredentials: true }
        );
        setIsChange(true);
        console.log("res:::", res);
      } else {
        await axios.post(
          baseURL + "/connection/review/accepted/" + _id,
          {},
          { withCredentials: true }
        );
        setIsChange(true);
      }
    } catch (e) {
      console.log("errror at Interest connction:", e);
    }
  };
  console.log("user:::", user?.fromUserId);

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          <p>{about}</p>
          <p>
            {gender} {age}
          </p>
          <p>{skills.join(",")}</p>
          {!isConnectionPage && (
            <div>
              <button
                className="btn btn-error mx-2 "
                onClick={handleIgnoreOrReject}
              >
                {isHomePage ? "Ignore" : "Reject"}
              </button>
              <button
                className="btn btn-success "
                onClick={handleInterestOrAccept}
              >
                {isHomePage ? "Interest" : "Accept"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
