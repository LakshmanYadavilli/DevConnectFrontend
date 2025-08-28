import { useState } from "react";
import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
const LogInOut = () => {
  const [email, setEmail] = useState("venkat@gmail.com");
  const [password, setPassword] = useState("Venkat21@");
  const navigate = useNavigate();
  // const userDispatch = useDispatch();
  const handleLogin = async () => {
    try {
      await axios.post(
        "http://localhost:3000/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      // console.log("data:::", data);
      // userDispatch(setUser(data.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card bg-base-100 w-96 shadow-sm mx-auto my-[30vh] flex flex-col justify-center items-center p-5">
      <fieldset className="fieldset w-80">
        <legend className="fieldset-legend">Email :</legend>
        <input
          type="text"
          className="input"
          placeholder="Type here"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </fieldset>
      <fieldset className="fieldset w-80">
        <legend className="fieldset-legend">Password :</legend>
        <input
          type="password"
          className="input"
          placeholder="Type here"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </fieldset>
      <button
        className="btn btn-active btn-accent mt-2"
        onClick={() => handleLogin()}
      >
        Login
      </button>
    </div>
  );
};

export default LogInOut;
