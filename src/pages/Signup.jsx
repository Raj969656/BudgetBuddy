import React, { useState } from "react";
import { createUser } from "../services/UserService";
import { toast } from "react-toastify";
import GradientBackground from "../components/GradientBackground.jsx";
import { Link } from "react-router-dom"; // 👈 import Link

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    age: "",
  });

  const [errors, setErrors] = useState([]);
  const [creating, setCreating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCreating(true);
    setErrors([]);

    try {
      const response = await createUser(formData);
      console.log(response);

      toast.success("User is created Successfully..");

      setFormData({
        username: "",
        email: "",
        password: "",
        gender: "",
        age: "",
      });
    } catch (error) {
      if (error.status === 400) {
        setErrors(error.response.data);
        toast.error("Validation error");
      } else if (error.status === 403) {
        toast.error("You don't have permission to create user.");
      } else {
        toast.error("Server error");
      }
    } finally {
      setCreating(false);
    }
  };

  return (
    <GradientBackground>
      <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Your Account
        </h2>
        <div className="py-3">
          {errors.length > 0 &&
            errors.map((error, i) => (
              <div key={i} className="p-2 border-red-300 mb-2 border rounded">
                <p className="text-red-400">
                  {error.property.toUpperCase()}: {error.errorValue}
                </p>
              </div>
            ))}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter a strong password"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 mb-1">Gender</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  className="text-indigo-600"
                />
                <span className="ml-2 text-gray-700">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  className="text-indigo-600"
                />
                <span className="ml-2 text-gray-700">Female</span>
              </label>
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Your age"
              required
            />
          </div>

          {/* Submit */}
          <div>
            <button
              disabled={creating}
              type="submit"
              className="disabled:bg-gray-300 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              {creating ? "Creating user.." : "Sign Up"}
            </button>
          </div>

          {/* Already have account? */}
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </GradientBackground>
  );
};

export default Signup;
