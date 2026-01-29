import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import { type NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

export default async function proxy(request: NextRequest) {
    // Use Auth.js to handle the session/auth logic
    const session = await auth();

    // You can also perform rewrites/redirects here if needed
    // For now, we return the session which Auth.js middleware handles internally
    // But since we are manually controlling this in proxy, let's replicate the logic:

    // Technically Auth.js 'auth' function when exported as middleware handles the request.
    // In proxy.ts pattern, we might need to invoke it explicitly.
    // However, Auth.js v5 beta might not have a dedicated 'proxy' export yet.
    // We will adapt the logic from auth.config.ts to run manually here.

    const { nextUrl } = request;
    const isLoggedIn = !!session?.user;
    const authCallback = authConfig.callbacks?.authorized;

    if (authCallback) {
        const authorized = await authCallback({
            auth: session,
            request
        });

        if (authorized instanceof Response) {
            return authorized;
        }

        if (!authorized) {
            return Response.redirect(new URL("/login", nextUrl));
        }
    }

    // If valid, continue
    // In proxy.ts, returning nothing or 'undefined' might not be enough, 
    // usually you rewrite or just let it pass.
    // Next.js 16 proxy convention says it should return a NextResponse or similar.
    // If we just want to proceed, we might not need to return anything or return `NextResponse.next()`
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
