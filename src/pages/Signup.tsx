import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Signup: React.FC = () => {
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleSignupInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, confirmPassword } = signupForm;

    if (!email || !password || !confirmPassword) {
      setErrorMessage("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    // Retrieve existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if the user already exists
    const userExists = existingUsers.some((user: any) => user.email === email);
    if (userExists) {
      setErrorMessage("User already exists! Try logging in.");
      return;
    }

    // Add new user
    const newUser = { email, password };
    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

    alert("Account created successfully! You can now log in.");
    navigate("/login"); // Redirect to login page
  };

  return (
    <>
      <Header />
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="max-w-md rounded-xl bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="mt-2 text-gray-600">Sign up to get started</p>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          
          <form className="mt-6" onSubmit={handleSignup}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={signupForm.email}
                onChange={handleSignupInput}
                required
                className="mt-1 w-full rounded-md border p-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={signupForm.password}
                onChange={handleSignupInput}
                required
                className="mt-1 w-full rounded-md border p-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={signupForm.confirmPassword}
                onChange={handleSignupInput}
                required
                className="mt-1 w-full rounded-md border p-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <button type="submit" className="w-full rounded-md bg-primary p-2 text-white hover:bg-purple-900">
              Sign Up
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-primary hover:underline"
                >
                  Log in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
