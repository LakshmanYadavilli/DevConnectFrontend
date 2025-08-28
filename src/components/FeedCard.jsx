import React from "react";

const FeedCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, skills } = user;

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
          <div>
            <button className="btn btn-error mx-2 ">Ignore</button>
            <button className="btn btn-success ">Interest</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
