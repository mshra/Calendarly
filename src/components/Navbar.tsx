"use client";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./theme-toggle-button";
import LoginButton from "./LoginButton";
import { useUser } from "@auth0/nextjs-auth0/client";
import ProfileDropdown from "./ProfileDropdown";

function Navbar() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <header className="flex w-full justify-around p-3 border-b border-gray-300">
      <Link href="/" className="flex items-center space-x-2 shrink-0 text-left">
        <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
        <span className="font-bold text-sm sm:text-base">Calendarly</span>
      </Link>
      <div className="flex gap-4 items-center">
        <ModeToggle />
        {!user && <LoginButton />}
        {user && <ProfileDropdown user={user} />}
      </div>
    </header>
  );
}

export default Navbar;
