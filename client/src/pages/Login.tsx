import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema, type LoginType } from "../lib/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { type LoginResponse } from "../types";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginType> = async (data: LoginType) => {
    try {
      const res = await axios.post<LoginResponse>(
        "http://localhost:3000/api/auth/login",
        data,
        {
          withCredentials: true,
        }
      );
      const { role } = res.data;
      switch (role) {
        case "admin":
          navigate("/AdminDashboard");
          break;
        case "employee":
          navigate("/EmployeeDashboard");
          break;
        case "user":
          navigate("/UserDashboard");
          break;
      }
    } catch {
      setError("root", {
        message: "Invalid email or password",
      });
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-[#000428] via-[#1f1c2c] to-[#6a0572] min-h-screen flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-8 text-center text-4xl font-bold tracking-tight bg-gradient-to-b from-orange-500 to-red-600 bg-clip-text text-transparent">
            Log In
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="mt-2">
                <input
                  {...register("email")}
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base font-medium text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-slate-700 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 sm:text-sm/6"
                />
                {errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    *{errors.email.message}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  {...register("password")}
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base font-medium text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-slate-700 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 sm:text-sm/6"
                />
                {errors.password && (
                  <div className="text-red-500 text-sm mt-1">
                    *{errors.password.message}
                  </div>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gradient-to-b from-orange-500 to-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs cursor-pointer transition-all duration-300 hover:from-amber-400 hover:to-orange-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading..." : "Log In"}
              </button>
              {errors.root && (
                <div className="text-red-500 text-sm mt-1">
                  *{errors.root.message}
                </div>
              )}
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-slate-300">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="relative text-slate-200 px-0 py-2 text-sm/6 font-semibold cursor-pointer transition duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:text-orange-400 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-gradient-to-r before:from-orange-400 before:to-orange-600 before:transition-all before:duration-300 before:content-[''] hover:before:w-full before:shadow-[0_0_8px_rgba(255,165,0,0.6)]"
            >
              Signup
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
