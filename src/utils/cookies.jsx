import axios from "axios"

export default async function Cookie() {

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/cookie`, 
        )
        const cookie = response.data.cookie; // Adjust this based on your API response structure
        const expirationDays = 1; // Set cookie expiration (e.g., 7 days)
        const date = new Date();
        date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;


        document.cookie = `cookie=${cookie}; ${expires}; path=/; secure`;
    } catch(error) {
        throw new Error('Error getting cookie', error)
    }

}