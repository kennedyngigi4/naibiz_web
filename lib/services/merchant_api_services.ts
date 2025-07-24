import { signIn } from "next-auth/react";

const MerchantAPIServices = {

    

    registration: async function (url: string, formData: any): Promise<any> {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/${url}`, {
                method: "POST",
                body: formData
            });

            const data = await res.json()

            if (!res.ok) {
                return { "success": false, "message": "Something went wrong." }
            }

            return data;

        } catch (e) {
            return { "success": false, "message": e }
        }
    },

    post: async function(url: string, token: string, formData: any): Promise<any> {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/${url}`, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${token}`
                },
                body: formData
            });

            const data = await res.json()

            if(!res.ok){
                return { "success": false, "message": "Something went wrong."}
            }

            return data;

        } catch (e) {
            return { "success": false, "message": e }
        }
    },


    get: async function (url: string, token: string): Promise<any> {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/${url}`, {
                method: "GET",
                headers: {
                    "Authorization": `Token ${token}`
                },
            });
            const data = await res.json()

            if (!res.ok) {
                return { "success": false, "message": "Something went wrong." }
            }

            return data;

        } catch (e) {
            return { "success": false, "message": e }
        }
    },


    patch: async function (url: string, token: string, formData: any): Promise<any> {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/${url}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Token ${token}`
                },
                body: formData
            });

            const data = await res.json()

            if (!res.ok) {
                return { "success": false, "message": "Something went wrong." }
            }

            return data;

        } catch (e) {
            return { "success": false, "message": e }
        }
    },


    delete: async function (url: string, token: string, data: any): Promise<any> {
        try {

        } catch (e) {

        }
    }


}



export default MerchantAPIServices;

