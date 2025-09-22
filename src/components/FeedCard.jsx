import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const FeedCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, skills, _id } = user;
  const location = useLocation();
  const handleIgnore = async () => {
    const res = await axios.post(
      "http://localhost:3000/connection/pass/" + _id,
      {},
      { withCredentials: true }
    );
    console.log("res:::", res);
  };
  const handleInterest = async () => {
    const res = await axios.post(
      "http://localhost:3000/connection/interested/" + _id,
      {},
      { withCredentials: true }
    );
    console.log("res:::", res);
  };

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
          {location.pathname === "/" && (
            <div>
              <button className="btn btn-error mx-2 " onClick={handleIgnore}>
                Ignore
              </button>
              <button className="btn btn-success " onClick={handleInterest}>
                Interest
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
