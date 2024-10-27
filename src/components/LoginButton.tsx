"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";

function LoginButton() {
  return (
    <Link href={"/api/auth/login"}>
      <Button>
        <LogIn />
        Login
      </Button>
    </Link>
  );
}

export default LoginButton;
