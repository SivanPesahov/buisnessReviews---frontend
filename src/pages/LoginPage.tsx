import React, { useState } from "react";
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
import { SendHorizontal } from "lucide-react";
import { useUserContext } from "../components/AuthProvider";
import api from "../services/api.service";
import axios from "axios";

// Define the User interface with all necessary fields
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
}

// Define the LoginResponse interface
interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    username?: string;
  };
}

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem("token", token);

      // Providing default values for missing properties
      const fullUser: User = {
        ...user,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
      };

      login(fullUser);
      navigate("/task");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Login failed:",
          error.response?.data?.message || error.message
        );
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <Card className="max-w-md mx-auto p-8 shadow-lg rounded-lg">
      <CardHeader className="mb-6">
        <CardTitle className="flex justify-between items-center text-2xl font-semibold">
          <span>Login</span> <SendHorizontal />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-lg font-medium">
              Email:
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email..."
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="p-3 border rounded-md"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-lg font-medium">
              Password:
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              className="p-3 border rounded-md"
              required
            />
          </div>
          <Button type="submit" className="py-3 mt-4 rounded-md">
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter className="mt-6 text-center">
        <p className="text-sm">
          Don't have an account?{" "}
          <Link className="underline font-semibold" to="/auth/register">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default LoginPage;
