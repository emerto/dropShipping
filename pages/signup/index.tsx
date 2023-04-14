import { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { supabaseClient } from "../../utils/supabaseBrowserClient";
import { useAuthStore } from "../../stores/useAuthStore";
import { useRouter } from "next/navigation";
import Head from "next/head";
import toast from "react-hot-toast";

interface Inputs {
  email: string;
  password: string;
  terms: boolean;
}

const SignUp: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    const { email, password } = inputs;
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (data) {
      const { data: userData, error } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", data.user?.id)
        .single();

      if (userData) {
        useAuthStore.setState({
          userStore: userData,
        });
        toast.success("Sign up successful!");
        router.push("/profile");
      }

      if (error) {
        toast.error(error.message);
      }
    }

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-full min-h-[522px]">
      <Head>
        <title>DropShoop - Sign up</title>
      </Head>
      <div className="hero w-full">
        <div className="hero-content flex-col w-full">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Sign up!</h1>
          </div>
          <form
            className="card flex-shrink-0 w-full max-w-xl shadow-2xl bg-base-100"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body">
              <div className="form-control w-full max-w-xl">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    min: 2,
                    maxLength: 100,
                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                  })}
                  className="input input-bordered w-full max-w-xl"
                />
                {errors.email?.type === "required" && (
                  <span className="mt-1 text-sm text-red-600">
                    This field is required
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="mt-1 text-sm text-red-600">
                    Invalid email address
                  </span>
                )}
              </div>
              <div className="form-control w-full max-w-xl">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                    minLength: 3,
                    maxLength: 40,
                  })}
                  className="input input-bordered w-full max-w-xl"
                />
                {errors.password?.type === "required" && (
                  <span className="mt-1 text-sm text-red-600">
                    This field is required
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="mt-1 text-sm text-red-600">
                    Password must be at least 3 characters
                  </span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="mt-1 text-sm text-red-600">
                    Password must be less than 40 characters
                  </span>
                )}
              </div>
              <div className="flex flex-col w-full gap-2 mt-2">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    placeholder="Terms"
                    {...register("terms", { required: true })}
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  <p>
                    I agree to the{" "}
                    <a
                      href="/terms-and-conditions"
                      target="_blank"
                      className="text-primary hover:underline hover:cursor-pointer">
                      Terms and Conditions
                    </a>
                  </p>
                </div>
                {errors.terms?.type === "required" && (
                  <span className="mt-1 text-sm text-red-600">
                    This field is required
                  </span>
                )}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
