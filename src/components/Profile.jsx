import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useSnackbar } from "notistack";

const Profile = () => {
  const user = useSelector((store) => store.user?.user);
  const [isEditing, setIsEditing] = useState(false);
  const formDataInitialVal = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    age: user?.age || "",
    email: user?.email || "",
    gender: user?.gender || "",
    skills: user?.skills || [],
  };
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState(formDataInitialVal);
  const handleEdit = () => {
    setIsEditing((prev) => !prev);
    if (isEditing) {
      setFormData(formDataInitialVal);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const changedInputValues = {};
    Object.keys(formDataInitialVal).forEach((key) => {
      if (formData[key] !== user[key]) {
        changedInputValues[key] = formData[key];
      }
    });
    if (Object.keys(changedInputValues).length !== 0) {
      const res = await axios.patch(
        "http://localhost:3000/user/",
        changedInputValues,
        { withCredentials: true }
      );
      enqueueSnackbar("Profile updated successfully", { variant: "success" });
      console.log("res:::", res);
    }
    enqueueSnackbar("No changes made to update", { variant: "info" });
    setIsEditing(false);
    console.log("changedInputValues:::", changedInputValues);
  };

  const labelClass = "text-2xl font-extrabold text-amber-600";
  const inputClasss =
    "input input-bordered w-full max-w-xs text-2xl font-extrabold ";
  return (
    <div className="flex">
      <form className="flex flex-col gap-4 p-4 w-1/3 " onSubmit={handleSubmit}>
        <label className={labelClass} htmlFor="firstName">
          First Name:
        </label>
        <input
          id="firstName"
          type="text"
          placeholder="First Name"
          disabled={!isEditing}
          className={inputClasss}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          value={formData.firstName}
        />
        <label className={labelClass} htmlFor="lastName">
          Last Name:
        </label>
        <input
          id="lastName"
          type="text"
          disabled={!isEditing}
          placeholder="Last Name"
          className={inputClasss}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          value={formData.lastName}
        />
        <label className={labelClass} htmlFor="email">
          Email:
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          disabled={true}
          className={inputClasss}
          value={formData.email}
        />
        <label className={labelClass} htmlFor="age">
          Age:
        </label>
        <input
          id="age"
          type="number"
          disabled={!isEditing}
          placeholder="Age"
          className={inputClasss}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          value={formData.age}
        />
        <label className={labelClass} htmlFor="gender">
          Gender:
        </label>
        <select
          id="gender"
          disabled={!isEditing}
          className={inputClasss}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          value={formData.gender}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <label className={labelClass} htmlFor="skills">
          Skills:
        </label>
        <textarea
          id="skills"
          disabled={!isEditing}
          className={inputClasss}
          placeholder="Skills ...."
          cols={1}
          rows={4}
          onChange={(e) =>
            setFormData({
              ...formData,
              skills: e.target.value.split(",").map((s) => s.trim()),
            })
          }
          value={formData.skills.join(", ")}
        />
        {isEditing && (
          <button
            type="submit"
            className="bg-red-400 w-20 font-extrabold text-xl rounded-lg"
          >
            Save
          </button>
        )}
      </form>
      <button
        className="self-start bg-blue-200 px-4 m-4 rounded-sm text-xl font-extrabold cursor-pointer"
        onClick={handleEdit}
        type="button"
      >
        {!isEditing ? "Edit" : "Cancel"}
      </button>
    </div>
  );
};

export default Profile;
