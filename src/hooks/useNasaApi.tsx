import { useEffect, useState } from "react"
import { IUseNasaApi } from "../types/IUseNasaApi"

interface useNasaApi {
    data: IUseNasaApi[];
    loading: boolean;
    error: string | null;
}

export default function UseNasaApi() {

    const count = 10;
    const apiKey = "COj1voW3jq3uvF44x8Me3mRWK0Sc3XKatQJTqZ92";
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`

    const [data, setData] = useState<IUseNasaApi[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState< {} | null>(null);

    useEffect(() => {
        fetch(apiUrl)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
            })
            .then(data => setData(data))
            .catch(error => {
                console.error("Error fetching data:", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [apiUrl])

    // if (loading) return "Loading...";
    // if (error) return "Error!";

    return {
        data,
        loading,
        error
    };

}