import { useContext, useEffect, useRef } from "react";

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
import { LogIn } from "lucide-react";
import { useAuth } from "../components/AuthProvider";
import { useToast } from "@/components/ui/use-toast";
import { log } from "console";

function RegisterPage() {
  const { register, loggedInUser } = useAuth();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const eMailRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      navigate("/businesses", { replace: true });
    } else {
      console.log("Error registering");
      console.log(
        "Registration failed, please check your details and try again"
      );
    }
  }, [loggedInUser]);

  async function handleRegister(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const userData = {
      username: usernameRef.current!.value,
      password: passwordRef.current!.value,
      firstName: firstNameRef.current!.value,
      lastName: lastNameRef.current!.value,
      email: eMailRef.current!.value,
    };

    try {
      await register(userData);
      console.log("aaa" + loggedInUser);
    } catch (err: any) {
      console.log("TypeError");
      console.log("Something went wrong... please try again");

      console.log(err.name);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="shadow-2xl ">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Register</span> <LogIn />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <div>
              <Label>Username:</Label>
              <Input ref={usernameRef} placeholder="Enter username..." />
            </div>
            <div>
              <Label>Password:</Label>
              <Input
                ref={passwordRef}
                type="password"
                placeholder="Enter password..."
              />
            </div>
            <div>
              <Label>First name:</Label>
              <Input ref={firstNameRef} placeholder="Enter first name..." />
            </div>
            <div>
              <Label>Last name:</Label>
              <Input ref={lastNameRef} placeholder="Enter last name..." />
            </div>
            <div>
              <Label>EMail:</Label>
              <Input ref={eMailRef} placeholder="Enter last name..." />
            </div>

            <Button type="submit" className="bg-sky-900">
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-xs">
            Already have an account?{" "}
            <Link className="underline font-bold text-sky-900" to="/auth/login">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default RegisterPage;
