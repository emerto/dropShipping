import { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { supabaseClient } from "../../utils/supabaseBrowserClient";
import { useAuthStore } from "../../stores/useAuthStore";
import { useRouter } from "next/navigation";

interface Inputs {
  email: string;
  password: string;
}

const SignIn: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    const { email, password } = inputs;
    const { data, error } = await supabaseClient.auth.signInWithPassword({
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
        router.push("/");
      }
    }

    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <form
          className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="card-body">
            <div className="form-control w-full max-w-xs">
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
                className="input input-bordered w-full max-w-xs"
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
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  min: 3,
                  maxLength: 40,
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.password?.type === "required" && (
                <span className="mt-1 text-sm text-red-600">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
