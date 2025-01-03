import Link from "next/link";
import React, { useState } from "react";
import { baseUrl } from "../components/utils/baseUrl";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();
  //   const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !username) {
      setError("Please fill out all fields.");
      return;
    }

    const response = await fetch(baseUrl + "api/usersignup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password,
      }),
    });
    const json = await response.json();
    console.log("json", json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("useremail", email);
      router.push("/");
      toast.success("Sign In successfully");
    } else if (json.error) {
      toast.error("Account already exists! Please log in.");
      router.push("/login");
    } else {
      toast.error("please try again!!");
    }
    setError("");
    setUsername("");
    setPassword("");
    setEmail("");
    // console.log("Signing in with:", {
    //   email,
    //   password,
    //   username,
    //   // , rememberMe
    // });
    // alert("Sign In Successful!");
  };

  return (
    <div className="container mx-auto py-8 px-4 min-h-[70vh]">
      <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        {/* Username Field */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        {/* Remember Me Checkbox */}
        {/* <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="text-sm text-gray-700">
            Remember me
          </label>
        </div> */}

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="mt-6 space-y-4">
          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-blue-600 transition-all"
          >
            Sign In
          </button>

          {/* Already Have an Account Button */}
          <Link href="/login" passHref>
            <button className="w-full bg-gray-100 text-blue-500 py-2 px-6 rounded-md border border-blue-500 shadow-lg hover:bg-blue-500 hover:text-white transition-all mt-2">
              Already have an Account
            </button>
          </Link>

          {/* Forgot Password Link */}
          <div className="text-center">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
