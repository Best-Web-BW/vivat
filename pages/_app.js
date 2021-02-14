import { useEffect } from "react";
import Layout from "../components/layout";
import AuthProvider from "../utils/providers/AuthProvider";

export default function MyApp({ Component, pageProps }) {
    useEffect(async () => {
        await import("react-datepicker/dist/react-datepicker.css");
        const { registerLocale, setDefaultLocale } = await import("react-datepicker");
        registerLocale("ru", (await import("date-fns/locale/ru")).default);
        setDefaultLocale("ru");
    }, []);

    useEffect(() => { Math.cycle = (num, border) => border ? +Math.abs((num >= 0 ? num : num - Math.floor(num / border) * border) % border).toFixed(8) : num; }, []);
    useEffect(() => { Math.bound = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b)); }, []);
    useEffect(() => AuthProvider.refreshTokens(), []);
    
	return (
		<Layout>
			<Component { ...pageProps } />
		</Layout>
	);
}