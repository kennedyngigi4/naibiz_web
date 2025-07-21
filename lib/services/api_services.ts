

const APIServices = {

    post: async function (url: string, formData: any): Promise<any> {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/${url}`, {
                method: "POST",
                headers: {
                    
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


    get: async function (url: string): Promise<any> {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/${url}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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
}


export default APIServices;
