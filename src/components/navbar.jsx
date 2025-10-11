import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../utils/userSlice";
import { clearFeed } from "../utils/feedSlice";
import { baseURL } from "../utils/constants";

const Navbar = () => {
  const user = useSelector((store) => store.user?.user);
  const dispatch = useDispatch();
  console.log("user from navbar", user);
  const handleLogout = async () => {
    try {
      const res = await axios.post(baseURL + "/auth/logout");
      dispatch(clearUser());
      dispatch(clearFeed());

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="navbar bg-accent shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">👨🏻‍💻devConnect</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 h-10 rounded-full  p-2 bg-amber-600">
              {user && (
                <h1 className="font-extrabold">
                  {user.firstName.split("")[0]}
                </h1>
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/connections" className="justify-between">
                Connections
              </Link>
            </li>
            <li>
              <Link to="/requests" className="justify-between">
                Requests
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <Link to="/login" onClick={handleLogout}>
                LogOut
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
