import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { Loading } from "../components/ui/Loading";
import { base_backend_url } from "../config";
import { signupSchema, type SignupType } from "../lib/signup.schema";

const Signup = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupType>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      role: "user"
    },
  });

  const onSubmit: SubmitHandler<SignupType> = async (data: SignupType) => {
    try {
      await axios.post(
        `${base_backend_url}/signup`,
        data,
        {
          withCredentials: true,
        }
      );
      const role = data.role;
      setAuth(role, data.email);
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#6a0572,_#1f1c2c,_#000428)] flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-8 text-center text-4xl font-bold tracking-tight bg-gradient-to-b from-orange-500 to-red-600 bg-clip-text text-transparent">
          Sign Up
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
            <div className="mt-2">
              <select
                {...register("role")}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base font-medium text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-slate-700 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 sm:text-sm/6"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gradient-to-b from-orange-500 to-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs cursor-pointer transition-all duration-300 hover:from-amber-400 hover:to-orange-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loading /> : "Sign up"}
            </button>
            {errors.root && (
              <div className="text-red-500 text-sm mt-1">
                *{errors.root.message}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
