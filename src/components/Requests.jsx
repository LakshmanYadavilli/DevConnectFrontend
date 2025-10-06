import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedCard from "./FeedCard";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [isChange, setIsChange] = useState(false);
  useEffect(() => {
    const fetchRequests = async () => {
      console.log("fetchRequest called:::");
      const res = await axios.get("http://localhost:3000/connection/requests", {
        withCredentials: true,
      });
      console.log("requests:::", res);
      setRequests(res.data.data);
    };
    fetchRequests();
    setIsChange(false);
  }, [isChange]);
  console.log("request:::", requests);
  if (requests.length === 0) {
    return (
      <h1 className="text-center text-3xl font-extrabold p-4">No Requests</h1>
    );
  }
  return (
    <div>
      {requests.map((connection) => (
        <FeedCard
          user={connection}
          key={connection._id}
          setIsChange={setIsChange}
        />
      ))}
    </div>
  );
};

export default Requests;
