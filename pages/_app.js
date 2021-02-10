import { useEffect } from "react";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import Layout from "../components/layout";
import AuthProvider from "../utils/providers/AuthProvider";

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        Math.bound = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
        Math.cycle = (num, border) => border ? +Math.abs((num >= 0 ? num : num - Math.floor(num / border) * border) % border).toFixed(8) : num;
    }, []);

    useEffect(() => AuthProvider.refreshTokens(), []);

    registerLocale("ru", ru);
    setDefaultLocale("ru");
    
	return (
		<Layout>
			<Component { ...pageProps } />
		</Layout>
	);
}