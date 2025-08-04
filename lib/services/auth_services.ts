// "use server";

import { signIn, signOut } from "next-auth/react";


export async function loginUser(email: string, password: string): Promise<any> {
    try {
        
        const res = await signIn("credentials", { email: email, password: password, redirect: false });
        console.log(res);
        if (res?.error) {
            return { "success": false, "message": "Email or Password is invalid!" }
        } else {
            return { "success": true, "message": "Login successful!" }
        }
    } catch (e) {
        return { "success": false, "message": e }
    }
}




