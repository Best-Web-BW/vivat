import AuthProvider from "../utils/providers/AuthProvider";
import Layout from "../components/layout";
import { useEffect } from "react";
import Head from "next/head";

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
            <Head>
                <link rel="stylesheet" href="/fonts/icons/css/animation.css" />
                <link rel="stylesheet" href="/fonts/icons/css/fontello.css" />
                <link rel="stylesheet" href="/fonts/icons/css/fontello-codes.css" />
                <link rel="stylesheet" href="/fonts/icons/css/fontello-embedded.css" />
                {/* <link rel="stylesheet" href="/fonts/icons/css/fontello-ie7.css" />
                <link rel="stylesheet" href="/fonts/icons/css/fontello-ie7-codes.css" /> */}
                <link rel="stylesheet" href="/css/stylesheet.css" />
                <link rel="stylesheet" href="/css/main.css" />
                <link rel="stylesheet" href="/css/home.css" />
                <link rel="stylesheet" href="/css/about.css" />
                <link rel="stylesheet" href="/css/gallery.css" />
                <link rel="stylesheet" href="/css/services.css" />
                <link rel="stylesheet" href="/css/events.css" />
                <link rel="stylesheet" href="/css/news.css" />
                <link rel="stylesheet" href="/css/contacts.css" />
                <link rel="stylesheet" href="/css/event-page.css" />
                <link rel="stylesheet" href="/css/profile.css" />
                <link rel="stylesheet" href="/css/cookies.css" />
                <link rel="stylesheet" href="/css/datepicker.css" />
                <link rel="stylesheet" href="/css/react-big-calendar.css" />
                <link rel="stylesheet" href="/css/react-images-upload.css" />
                <link rel="stylesheet" href="/css/admin.css" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <script src="/yandex_all.js" async={true} />
            </Head>
			<Component { ...pageProps } />
		</Layout>
	);
}