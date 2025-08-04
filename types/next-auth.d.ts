import type { DefaultSession, DefaultUser } from "next-auth";


declare module "next-auth" {
    interface Session {
        accessToken?: string;
        user: {
            id?: string;
            fullname?: string;
            email?: string | null;
            role? : string | null;
            image?: string | null;
        };
    }

    interface JWT {
        accessToken?: string;
        refreshToken?: string;
        id?: string;
        fullname?: string;
        role?:  string;
    }

    interface User {
        access?: string;
        refresh?: string;
        id?: string;
        fullname?: string;
        role?: string;
    }
}
