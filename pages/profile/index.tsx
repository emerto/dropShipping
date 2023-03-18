import { NextPage } from "next";
import { useAuthStore } from "../../stores/useAuthStore";
import { useForm } from "react-hook-form";
import { supabase } from "../../utils/supabaseClient";
import toast from "react-hot-toast";
import Image from "next/image";
import { useState } from "react";

interface Inputs {
  first_name: string;
  last_name: string;
  username: string;
  address: string;
  phone_number: string;
}

const Profile: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const { userStore } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data) => {
    const filterEmpty = Object.keys(data).reduce((acc, key) => {
      if (data[key] !== "") {
        acc[key] = data[key];
      }
      return acc;
    }, {});

    if (Object.keys(filterEmpty).length === 0) {
      toast.error("Please fill in at least one field!");
      return;
    }

    try {
      const updatedData = await fetch(
        "http://localhost:3000/api/updateProfile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filterEmpty),
        }
      );
      const updatedDataJson = await updatedData.json();

      useAuthStore.setState({
        userStore: updatedDataJson.data,
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const uploadFile = async (e) => {
    setLoading(true);
    const file = e.target?.files[0];

    if (!file) {
      toast.error("Please select a file!");
      return;
    }

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(`${Date.now()}_avatar-${userStore.id}`, file);

    if (error) {
      toast.error(error.message);
      return;
    }

    const { data: publicURL } = supabase.storage
      .from("avatars")
      .getPublicUrl(data.path);

    const { error: updateUrlError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicURL.publicUrl })
      .eq("id", userStore.id);

    if (updateUrlError) {
      toast.error(updateUrlError.message);
      return;
    }

    useAuthStore.setState({
      userStore: {
        ...userStore,
        avatar_url: publicURL.publicUrl,
      },
    });

    toast.success("Avatar updated successfully!");
    setLoading(false);
  };
  return (
    <>
      <h1 className="text-3xl font-bold text-base-content">Profile</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full bg-base-300 rounded-xl mt-5 p-5"
      >
        <div className="flex items-center gap-2">
          <div className="avatar">
            <div className="w-24 rounded-xl">
              {userStore.avatar_url ? (
                <Image
                  src={`${userStore.avatar_url}`}
                  alt="Profile Avatar"
                  width={300}
                  height={300}
                />
              ) : (
                <img src="https://i.imgur.com/6S4ZQYg.png" />
              )}
            </div>
          </div>
          {userStore.first_name && userStore.last_name ? (
            <p className="text-3xl font-bold text-base-content ">
              {userStore.first_name + " " + userStore.last_name}
            </p>
          ) : (
            <p className="text-3xl font-bold text-base-content ">
              Update your profile
            </p>
          )}
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
                placeholder={
                  userStore.first_name
                    ? userStore.first_name
                    : "Your first name"
                }
                className="input input-bordered w-full max-w-2xl"
                {...register("first_name", {})}
              />
            </div>
            <div className="form-control w-full max-w-2xl">
              <label className="label">
                <span className="label-text">Lastname</span>
              </label>
              <input
                type="text"
                placeholder={
                  userStore.last_name ? userStore.last_name : "Your last name"
                }
                className="input input-bordered w-full  max-w-2xl"
                {...register("last_name", {})}
              />
            </div>
            <div className="form-control w-full max-w-2xl">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder={
                  userStore.username ? userStore.username : "Your username"
                }
                className="input input-bordered w-full  max-w-2xl"
                {...register("username", {})}
              />
            </div>
            <div className="form-control w-full max-w-2xl">
              <label className="label">
                <span className="label-text">Telephone</span>
              </label>
              <input
                type="text"
                placeholder={
                  userStore.phone_number
                    ? userStore.phone_number
                    : "Your phone number"
                }
                className="input input-bordered w-full  max-w-2xl"
                {...register("phone_number", {})}
              />
            </div>
            <div className="form-control w-full max-w-2xl">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder={userStore.email ? userStore.email : "Your email"}
                disabled
                className="input input-bordered w-full  max-w-2xl"
              />
              <label className="label">
                <span className="label-text">Upload Image</span>
              </label>
              <input
                type="file"
                name="avatar_url"
                disabled={loading}
                className="file-input file-input-primary w-full max-w-2xl"
                onChange={(e) => uploadFile(e)}
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
                placeholder={
                  userStore.address ? userStore.address : "Type here"
                }
                {...register("address", {})}
              />
            </div>
          </div>
          <div className="mt-10">
            <button className="btn btn-primary" type="submit">
              Update Profile
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Profile;
