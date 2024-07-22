import React, { useState, useRef } from "react";
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
import { useAuth } from "../components/AuthProvider";
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
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const userData = {
      username: userNameRef.current!.value,
      password: passwordRef.current!.value,
    };

    try {
      await login(userData);
      navigate("/businesses", { replace: true });
    } catch (err) {
      console.log("TypeError");
      console.log(err);
    }
  }

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
              User name:
            </Label>
            <Input ref={userNameRef} placeholder="Enter username..." />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-lg font-medium">
              Password:
            </Label>
            <Input
              type="password"
              ref={passwordRef}
              placeholder="Enter password..."
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
