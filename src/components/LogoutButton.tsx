"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

function Logout() {
  return (
    <Link href={"/api/auth/logout"}>
      <Button>
        <LogOut />
        Logout
      </Button>
    </Link>
  );
}

export default Logout;
