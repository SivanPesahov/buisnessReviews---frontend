import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ClipboardList, Menu, X } from "lucide-react";
// import { useUserContext } from "./AuthProvider";
import { useAuth } from "../components/AuthProvider";
function Header() {
  const { loggedInUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className="dark:bg-white/5 bg-black/5 px-4 flex justify-between items-center h-14 relative z-50">
        <div className="flex justify-between items-center space-x-16">
          <div>
            <Link className="text-primary uppercase font-bold text-xl" to="/">
              <div className="flex justify-between items-center gap-1">
                <p>Showbiz</p>
              </div>
            </Link>
          </div>
          <nav className="hidden md:block">
            <ul className="flex gap-6">
              <li>
                <Link to="/businesses">Businesses</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-1">
          {loggedInUser === undefined ? (
            <Link to="/auth/login">Login</Link>
          ) : loggedInUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8 dark:bg-white/5 bg-slate-300">
                  {/* <AvatarImage alt={loggedInUser!.username} /> */}
                  <AvatarFallback>
                    {loggedInUser!.firstName &&
                      loggedInUser!.firstName[0].toUpperCase()}
                    {loggedInUser!.lastName &&
                      loggedInUser!.lastName[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link to="/auth/login">Login</Link>
            </Button>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <X className="text-2xl" />
            ) : (
              <Menu className="text-2xl" />
            )}
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
