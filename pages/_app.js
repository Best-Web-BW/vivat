import { useEffect } from "react";
import Layout from "../components/layout";

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        Math.bound = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
        Math.cycle = (num, border) => border ? +Math.abs((num >= 0 ? num : num - Math.floor(num / border) * border) % border).toFixed(8) : num;
        global.sleep = (delay) => new Promise(resolve => setTimeout(resolve, delay));
        global.reformatDate = (rawDate) => new Date(rawDate).toLocaleString("ru", { day: "numeric", month: "numeric", year: "numeric" });
    }, []);
    
	return (
		<Layout>
			<Component { ...pageProps } />
		</Layout>
	);
}