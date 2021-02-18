import { isServer } from "../common";

export default class FetchProvider {
    static async post(_url, data) {
        try {
            const url = isServer() ? `https://localhost${_url}` : _url;
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json;charset=utf-8" },
                body: JSON.stringify(data)
            });
            return (await response.json());
        } catch(e) {
            console.error(e);
            return { status: "error", error: "fetch_error" };
        }
    }
}