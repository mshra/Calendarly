// app/api/auth/[auth0]/route.js
import { handleAuth, handleCallback, getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

const auth0Handler = handleAuth({
  callback: async (req) => {
    try {
      const res = handleCallback(req);

      const session = await getSession(req);
      const user = session?.user;

      if (user) {
        // check user if it exists in database
        // create a new user if it doesn not exist in database
      }
    } catch (error) {
      console.error("Auth callback error:", error);
      return NextResponse.json(
        { error: "Authentication callback failed" },
        { status: 500 },
      );
    }
  },
});

export const GET = auth0Handler;
export const POST = auth0Handler;
