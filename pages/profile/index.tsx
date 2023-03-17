import React from "react";
import { useAuthStore } from "../../stores/useAuthStore";

const Profile = () => {
  const { userStore } = useAuthStore();
  const {
    first_name,
    last_name,
    avatar_url,
    email,
    updated_at,
    address,
    balance,
    phone_number,
    username,
  } = userStore;

  return (
    <>
      <h1 className="text-3xl font-bold text-base-content">Profile</h1>
      <main className="flex flex-col w-full bg-base-300 rounded-xl mt-5 p-5">
        <div className="flex items-center gap-2">
          <div className="avatar">
            <div className="w-24 rounded-xl">
              <img
                src={`https://tcvbahslxgfxsxqidkyy.supabase.co/storage/v1/object/public/${avatar_url}`}
              />
            </div>
          </div>
          <p className="text-3xl font-bold text-base-content ">
            {first_name + " " + last_name}
          </p>
        </div>
        <div className="divider bg-primary h-fit" />
        <div className="flex flex-col items-end w-full p-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5 place-items-center">
            <div className="form-control w-full max-w-2xl">
              <label className="label">
                <span className="label-text">Firstname</span>
              </label>
              <input
                type="text"
                placeholder={first_name ? first_name : "Type here"}
                className="input input-bordered w-full max-w-2xl"
              />
            </div>
            <div className="form-control w-full max-w-2xl">
              <label className="label">
                <span className="label-text">Lastname</span>
              </label>
              <input
                type="text"
                placeholder={last_name ? last_name : "Type here"}
                className="input input-bordered w-full  max-w-2xl"
              />
            </div>
            <div className="form-control w-full max-w-2xl">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder={username ? username : "Type here"}
                className="input input-bordered w-full  max-w-2xl"
              />
            </div>
            <div className="form-control w-full max-w-2xl">
              <label className="label">
                <span className="label-text">Telephone</span>
              </label>
              <input
                type="text"
                placeholder={phone_number ? phone_number : "Type here"}
                className="input input-bordered w-full  max-w-2xl"
              />
            </div>
            <div className="form-control w-full max-w-2xl">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder={email ? email : "Type here"}
                className="input input-bordered w-full  max-w-2xl"
              />
              <label className="label">
                <span className="label-text">Upload Image</span>
              </label>
              <input
                type="file"
                className="file-input file-input-primary w-full max-w-2xl"
              />
            </div>
            <div className="form-control w-full max-w-2xl">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <textarea
                className="textarea textarea-lg"
                rows={3}
                cols={3}
                placeholder={address ? address : "Type here"}
              />
            </div>
          </div>
          <div className="mt-10">
            <button className="btn btn-primary">Update Profile</button>
          </div>
        </div>
      </main>
      <p>Test</p>
    </>
  );
};

export default Profile;
