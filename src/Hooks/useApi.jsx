import { useState } from "react";
import api from "../api";


const useApi = (initialData = []) => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const get = async (url) => {
        try {
            setLoading(true);
            setError(null);
            const data = await api.get(url);
            setData(data.data);
        } catch (error) {
            console.log(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const post = async (url, requestData) => {
        try {
            setLoading(true);
            setError(null);
            const data = await api.post(url, requestData);
            setData(data);
        } catch (error) {
            console.log(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const patch = async (url, requestData) => {
        try {
            setLoading(true);
            setError(null);
            const data = await api.patch(url, requestData);
            setData(data);
        } catch (error) {
            console.log(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, get, post, patch };
}

export default useApi;