import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
import { BriefcaseBusinessIcon, Menu, X } from "lucide-react";
import { useUserContext } from "./AuthProvider";
import { ModeToggle } from "./mode-toggle";

function Header() {
  const { user, logout } = useUserContext();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-gradient-to-r from-blue-900 to-blue-700 dark:from-blue-950 dark:to-blue-900 px-4 flex justify-between items-center h-16 relative z-50 shadow-md"
    >
      <div className="flex justify-between items-center space-x-16">
        <div>
          <Link className="text-white uppercase font-bold text-xl" to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex justify-between items-center gap-1"
            >
              <BriefcaseBusinessIcon className="text-white" />
              <p>Showbiz</p>
            </motion.div>
          </Link>
        </div>
        <nav className="hidden md:block">
          <ul className="flex gap-6">
            <li>
              <Link
                to="/businesses"
                className="text-white hover:text-amber-300 transition-colors duration-200"
              >
                Businesses
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        {user === undefined ? (
          <Link
            to="/auth/login"
            className="text-white hover:text-amber-300 transition-colors duration-200"
          >
            Login
          </Link>
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="h-8 w-8 bg-purple-200 dark:bg-purple-700 ring-2 ring-white">
                <AvatarImage alt={user.username} />
                <AvatarFallback className="text-purple-500 dark:text-purple-300">
                  {user.firstName && user.firstName[0].toUpperCase()}
                  {user.lastName && user.lastName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-700">
              <DropdownMenuLabel className="text-purple-600 dark:text-purple-300">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  to="/profile"
                  className="text-white hover:text-amber-300 transition-colors duration-200"
                >
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={logout}
                className="text-white hover:text-amber-300 transition-colors duration-200"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            asChild
            className="bg-amber-500 text-blue-900 hover:bg-amber-400 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500"
          >
            <Link to="/auth/login">Login</Link>
          </Button>
        )}
        <ModeToggle />
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white">
          {menuOpen ? (
            <X className="text-2xl" />
          ) : (
            <Menu className="text-2xl" />
          )}
        </button>
      </div>
    </motion.header>
  );
}

export default Header;
