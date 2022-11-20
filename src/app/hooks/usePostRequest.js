

export default function usePostRequest () {
    const request = async (url, method = 'POST', body = null, headers) => {
        try {
            const response = await fetch(url, {method, body, headers: {'Content-type': 'application/x-www-from-urlencoded'}}); 

            const data = await response.text(); 
            return data
        } catch (error) {
            console.log(error); 
        }
    }
    
    return {
        request
    }
}