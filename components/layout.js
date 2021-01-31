import Header from "./header/header";
import Main from "./main";
import Footer from "./footer/footer";

export default function Layout({ children }) {
	return [
		<Header key="header" />,
		<Main key="main" children={ children } />,
		<Footer key="footer" />
	];
}