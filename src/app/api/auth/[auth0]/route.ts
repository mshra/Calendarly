import { handleAuth, handleCallback, getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const auth0Handler = handleAuth({
  callback: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handleCallback(req, res);
      const session = await getSession(req, res);
      const user = session?.user;

      if (user) {
        // check user if it exists in database
        // create a new user if it doesn't exist in database
      }

      return res;
    } catch (error) {
      console.error("Auth callback error:", error);
      return res.status(500).json({ error: "Authentication callback failed" });
    }
  },
});

export const GET = auth0Handler;
export const POST = auth0Handler;
