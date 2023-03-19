import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import toast from "react-hot-toast";
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from "next/navigation";

interface Inputs {
  storename: string;
  storephone: string;
  storeaddress: string;
}

const CreateStore = () => {
  const [loading, setLoading] = useState(false);
  const [hasFile, setHasFile] = useState(false);
  const [fileurl, setFileUrl] = useState<string | null>(null);

  const router = useRouter();
  const { userStore } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    console.log(data);

    if (!hasFile) {
      toast.error("Please upload a store image!");
      return;
    }

    const { error } = await supabase.from("dropshippers").insert({
      dropshipper_id: userStore.id,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    const { error: storeInsertError } = await supabase.from("stores").insert({
      store_name: data.storename,
      owner: userStore.id,
      store_phone: data.storephone,
      store_address: data.storeaddress,
      store_image: fileurl,
    });

    if (storeInsertError) {
      toast.error(storeInsertError.message);
      return;
    }

    toast.success("Store created successfully!");
    router.push("/manageStore");
  };

  const uploadFile = async (e: any) => {
    setLoading(true);
    const file = e.target?.files[0];

    if (!file) {
      return;
    }

    const { data, error } = await supabase.storage
      .from("stores")
      .upload(`${Date.now()}_store-${userStore.id}`, file);

    setHasFile(true);

    if (error) {
      toast.error(error.message);
      return;
    }

    const { data: publicURL } = supabase.storage
      .from("stores")
      .getPublicUrl(data.path);

    setFileUrl(publicURL.publicUrl);

    toast.success("Store image uploaded successfully!");

    setLoading(false);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-base-content">
        Create Your Store
      </h1>
      <section className="grid place-items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full lg:w-[70%] bg-base-300 rounded-xl mt-5 p-5"
        >
          <div className="flex flex-col items-end w-full p-2">
            <div className="grid grid-cols-1 w-full gap-5 place-items-center ">
              <div className="form-control w-full max-w-2xl">
                <label className="label">
                  <span className="label-text">Store Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Joe's Store"
                  className="input input-bordered w-full max-w-2xl"
                  {...register("storename", { required: true, minLength: 3 })}
                />
                {errors.storename?.type === "required" && (
                  <span className="mt-1 text-sm text-red-600">
                    This field is required
                  </span>
                )}
                {errors.storename?.type === "minLength" && (
                  <span className="mt-1 text-sm text-red-600">
                    Store name must be at least 3 characters
                  </span>
                )}
              </div>
              <div className="form-control w-full max-w-2xl">
                <label className="label">
                  <span className="label-text">Telephone Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="0000 000 00 00"
                  className="input input-bordered w-full  max-w-2xl"
                  {...register("storephone", {
                    required: true,
                    pattern:
                      /^(05)([0-9]{2})\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})$/,
                  })}
                />
                {errors.storephone?.type === "required" && (
                  <span className="mt-1 text-sm text-red-600">
                    This field is required
                  </span>
                )}
                {errors.storephone?.type === "pattern" && (
                  <span className="mt-1 text-sm text-red-600">
                    Please enter a valid phone number
                  </span>
                )}
              </div>
              <div className="form-control w-full max-w-2xl">
                <label className="label">
                  <span className="label-text">Upload Image</span>
                </label>
                <input
                  type="file"
                  name="storeimage"
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
                  placeholder="Very long address"
                  {...register("storeaddress", {
                    required: true,
                    minLength: 10,
                  })}
                />
                {errors.storeaddress?.type === "required" && (
                  <span className="mt-1 text-sm text-red-600">
                    This field is required
                  </span>
                )}
                {errors.storeaddress?.type === "minLength" && (
                  <span className="mt-1 text-sm text-red-600">
                    Address must be at least 10 characters
                  </span>
                )}
              </div>
            </div>
            <div className="mt-10">
              <button className="btn btn-primary" type="submit">
                Create Store
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default CreateStore;
