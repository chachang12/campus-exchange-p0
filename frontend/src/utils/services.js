export const baseUrl = "https://campus-exchange-p0.onrender.com";

// http://localhost:8080


export const postRequest = async(url, body) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body,
    });

    const data = await response.json();

    if (!response.ok) {
        let message;
        if(data?.message) {
            message = data.message;
        }
        else {
            message = data;
        }

        return {error: true, message};
    }

    return data;
};

export const getRequest = async(url) => {
   const response = await fetch (url);
   const data = await response.json();

   if(!response.ok)
   {
    let message = "An error occurred."

    if(data?.message)
    {
        message = data.message
    }

    return {error: true, message}
   }

   return data;
};