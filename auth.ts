import NextAuth, { JWT } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({

    providers: [

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        Credentials({
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials, request) {
                const res = await fetch(`${process.env.APIURL}/account/login/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credentials),
                });
                const user = await res.json();

                console.log(user);

                if(user.success){
                    return user;
                }
                return null;
            },
        })
    ],

    session: {
        strategy: "jwt",
    },


    callbacks: {
        async jwt({ token, user, account }) {


            // credentials
            if (account && user) {
                token.accessToken = user?.access;
                token.id = user?.id;
                token.name = user?.fullname ?? undefined;
                token.role = user?.role;
            }


            // google
            // From Google provider → exchange ID token with DRF
            if (account?.provider === "google" && account.id_token) {
                const res = await fetch(`${process.env.APIURL}/account/google-login/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token: account.id_token }),
                })

                const data = await res.json()
                if (res.ok && data.access) {
                    token.accessToken = data.access;
                    token.id = data.id;
                    token.name = data.fullname;
                    token.role = data.role;
                } else {
                    throw new Error(data.error || "Google login failed")
                }
            }


            return token;
        },
        async session({ session, token }) {
            const t = token as JWT;
            session.accessToken = t?.accessToken as string;
            session.user.id = t?.id as string;
            session.user.name = token?.name ?? undefined;
            session.user.role = token?.role as string;
            return session;
        },
    },

    secret: process.env.AUTH_SECRET,
    
    pages: {
        signIn: "/auth/login",
    },

})