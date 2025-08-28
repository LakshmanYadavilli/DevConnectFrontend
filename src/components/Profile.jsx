import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user?.user);
  return (
    <div>
      <form className="flex flex-col gap-4 p-4 ">
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          type="text"
          placeholder="First Name"
          disabled="true"
          className="input input-bordered w-full max-w-xs text-2xl font-extrabold bg-amber-600 "
          value={user?.firstName}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="input input-bordered w full max-w-xs"
          value={user?.lastName}
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w full max-w-xs"
          value={user?.email}
        />
      </form>
    </div>
  );
};

export default Profile;
