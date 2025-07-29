import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/site/login",
        {
          email,
          password,
        },
        {
          withCredentials: true, // This enables cookie handling
        }
      );

      const { role } = response.data; // Get role directly from response instead of JWT

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
      console.log(`Logged in as: ${email}`);
    } catch (e) {
      console.log(`Login failed: ${e.message}`);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-[#000428] via-[#1f1c2c] to-[#6a0572] min-h-screen flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-8 text-center text-4xl font-bold tracking-tight bg-gradient-to-b from-orange-500 to-red-600 bg-clip-text text-transparent">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base font-medium text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-slate-700 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base font-medium text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-slate-700 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gradient-to-b from-orange-500 to-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs cursor-pointertransition-all duration-300 hover:from-amber-400 hover:to-orange-500"
              >
                Log In
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="font-semibold text-gray-700"
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
