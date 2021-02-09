import { useEffect, useState } from "react";
import Layout from "../components/layout";
import AuthProvider from "../utils/providers/AuthProvider";

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        Math.bound = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
        Math.cycle = (num, border) => border ? +Math.abs((num >= 0 ? num : num - Math.floor(num / border) * border) % border).toFixed(8) : num;
    }, []);

    const [auth, setAuth] = useState(false);
    global.auth = () => setAuth(prev => !prev);

    useEffect(() => {
        console.log("Updated");
        global.register = (email, name, birthdate) => AuthProvider.register(email, name, birthdate);
        global.authenticate = (email, password) => AuthProvider.authenticate(email, password);
        global.deauthenticate = () => AuthProvider.deauthenticate();
        global.authorize = () => AuthProvider.authorize();
        global.refreshTokens = () => AuthProvider.refreshTokens();
        global.user = AuthProvider.userData;
        global.accessKeyLifetime = AuthProvider.accessKeyLifetime;
        global.refreshInterval = AuthProvider.refreshInterval;
        global.refreshPreemption = AuthProvider.REFRESH_PREEMPTION;
    }, [auth]);

    useEffect(() => AuthProvider.refreshTokens(), []);
    
	return (
		<Layout>
			<Component { ...pageProps } />
		</Layout>
	);
}