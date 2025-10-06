import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../utils/constants";
const LogInOut = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [isSigned, setIsSigned] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const userDispatch = useDispatch();
  const handleLogin = async () => {
    try {
      if (isSigned) {
        await axios.post(
          baseURL + "/auth/login",
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
      } else {
        if (password !== confirmPwd) return;
        const res = await axios.post(
          baseURL + "/auth/signup",
          { firstName, lastName, email, password },
          { withCredentials: true }
        );
        dispatch(setUser(res.data.data));
        navigate("/profile");
      }
    } catch (error) {
      console.log(error, "lakshman");
    }
  };
  return (
    <div className="card bg-base-100 w-96 shadow-sm mx-auto my-[30vh] flex flex-col justify-center items-center p-5">
      {!isSigned && (
        <fieldset className="fieldset w-80">
          <legend className="fieldset-legend">First Name :</legend>
          <input
            type="text"
            className="input"
            placeholder="First Name..."
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </fieldset>
      )}
      {!isSigned && (
        <fieldset className="fieldset w-80">
          <legend className="fieldset-legend">Last Name :</legend>
          <input
            type="text"
            className="input"
            placeholder="Last Name..."
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </fieldset>
      )}
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
      {!isSigned && (
        <fieldset className="fieldset w-80">
          <legend className="fieldset-legend">Confirm Password :</legend>
          <input
            type="password"
            className="input"
            placeholder="Type here"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
          />
        </fieldset>
      )}
      <button
        className="btn btn-active btn-accent mt-2"
        onClick={() => handleLogin()}
      >
        {isSigned ? "Login" : "SingUp"}
      </button>
      <p>
        {isSigned ? (
          <p>
            If you Don't have account please{" "}
            <span
              onClick={() => setIsSigned(false)}
              className="text-blue-400 cursor-pointer"
            >
              singup!
            </span>
          </p>
        ) : (
          <p>
            If You are aleady User please{" "}
            <span
              onClick={() => setIsSigned(true)}
              className="text-blue-400 cursor-pointer"
            >
              Login
            </span>
          </p>
        )}
      </p>
    </div>
  );
};

export default LogInOut;
