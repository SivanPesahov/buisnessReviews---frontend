import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { CircleFadingPlus, User, Mail, Lock, UserPlus } from "lucide-react";
import api from "../services/api.service"; // Import your API service

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
        firstName,
        lastName,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      navigate("/auth/login");
    } catch (error: any) {
      console.error(
        "Registration failed:",
        error.response ? error.response.data.message : error.message
      );
      // Handle error state or display error message
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 py-8 bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center"
    >
      <Card className="max-w-md mx-auto p-8 shadow-2xl rounded-lg bg-white dark:bg-gray-800">
        <CardHeader className="mb-6">
          <CardTitle className="flex justify-between items-center text-2xl font-semibold text-blue-900 dark:text-blue-300">
            <span>Register</span>
            <CircleFadingPlus
              size={24}
              className="text-blue-500 dark:text-blue-400"
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2 dark:border-gray-700">
              <User size={20} className="text-gray-500 dark:text-gray-400" />
              <Input
                name="username"
                placeholder="Enter username..."
                value={username}
                onChange={handleInputChange(setUsername)}
                className="flex-1 p-3 bg-transparent border-none dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2 dark:border-gray-700">
              <Mail size={20} className="text-gray-500 dark:text-gray-400" />
              <Input
                name="email"
                type="email"
                placeholder="Enter email..."
                value={email}
                onChange={handleInputChange(setEmail)}
                className="flex-1 p-3 bg-transparent border-none dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2 dark:border-gray-700">
              <Lock size={20} className="text-gray-500 dark:text-gray-400" />
              <Input
                name="password"
                type="password"
                placeholder="Enter password..."
                value={password}
                onChange={handleInputChange(setPassword)}
                className="flex-1 p-3 bg-transparent border-none dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2 dark:border-gray-700">
              <UserPlus
                size={20}
                className="text-gray-500 dark:text-gray-400"
              />
              <Input
                name="firstName"
                placeholder="Enter first name..."
                value={firstName}
                onChange={handleInputChange(setFirstName)}
                className="flex-1 p-3 bg-transparent border-none dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2 dark:border-gray-700">
              <UserPlus
                size={20}
                className="text-gray-500 dark:text-gray-400"
              />
              <Input
                name="lastName"
                placeholder="Enter last name..."
                value={lastName}
                onChange={handleInputChange(setLastName)}
                className="flex-1 p-3 bg-transparent border-none dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <Button
              type="submit"
              className="py-3 mt-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
            >
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center mt-6">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              className="underline font-bold text-blue-600 dark:text-blue-400"
              to="/auth/login"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default RegisterPage;
