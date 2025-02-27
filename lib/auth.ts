import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GitHub({ clientId: process.env.AUTH_GITHUB_ID as string, clientSecret: process.env.AUTH_GITHUB_SECRET as string }),
        Google({ clientId: process.env.AUTH_GOOGLE_ID as string, clientSecret: process.env.AUTH_GOOGLE_SECRET as string })
    ],
})