import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedCard from "./FeedCard";
import { baseURL } from "../utils/constants";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  useEffect(() => {
    const fetchConnection = async () => {
      const res = await axios.get(baseURL + "/connection/connections", {
        withCredentials: true,
      });
      console.log("res:::", res);
      setConnections(res.data.data);
    };
    fetchConnection();
  }, []);
  console.log("connections:::", connections);
  if (connections.length === 0) {
    return (
      <h1 className="text-center text-3xl font-extrabold p-4">
        No Connections
      </h1>
    );
  }
  return (
    <div>
      {connections.map((connection) => (
        <FeedCard user={connection} key={connection._id} />
      ))}
    </div>
  );
};

export default Connections;
