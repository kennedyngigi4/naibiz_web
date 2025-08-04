import NextAuth, { JWT } from "next-auth";
import Credentials from "next-auth/providers/credentials";


export const { handlers, signIn, signOut, auth } = NextAuth({

    providers: [
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
            if (account && user) {
                token.accessToken = user?.access;
                token.id = user?.id;
                token.name = user?.fullname ?? undefined;
                token.role = user?.role;
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