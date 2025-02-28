import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GitHub({ clientId: process.env.AUTH_GITHUB_ID as string, clientSecret: process.env.AUTH_GITHUB_SECRET as string }),
        Google({ clientId: process.env.AUTH_GOOGLE_ID as string, clientSecret: process.env.AUTH_GOOGLE_SECRET as string })
    ],
    callbacks: {
        authorized: async ({ auth, request }) => {
            //get pathname from request
            const { pathname } = request.nextUrl
            console.log("Checking auth for path:", pathname, "Auth status:", !!auth)
            //allow access to home page and login page
            if (pathname === "/" || pathname === "/login") return true

            //Check if user is logged in
            return !!auth
        },
    },
    pages: {
        signIn: "/login",
        signOut: "/"
    }
})