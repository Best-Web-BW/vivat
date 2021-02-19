import Head from "next/head";
import Link from "next/link";
import Translator from "./Translator";

let translator = new Translator({
    ru: {
        "header": "Конно-спортивный клуб \"Виват, Россия!\""
    },
    en: {
        "header": "Equestrian Sports Club \"Vivat, Russia!\""
    }
});

function processNavigation(pages) {
    return [pages[pages.length - 1][1], [
        createLink("home", "Главная"),
        ...pages.map((page, index, array) => createLink(page[0], page[1], index == (array.length - 1)))
    ]];
}

function createLink(address, text, isCurrent) {
    return (
        <Link key={address} href={`/${address}`}>
            <a className={`header-link-${isCurrent ? "current" : "prev"}`}>{text}</a>
        </Link>
    );
}

function processChildren(children) {
    if(!children) return;
    if(!children.length) children = [children];
    return children.map((child, i) => <p key={i} className={`page-title-${i + 1}`}>{child.props.children}</p>);
}

export default function ContentHeader({ pages, wrapperClass, titleClass, beforeNavigation, afterTitle, children }) {
    const [title, navigation] = processNavigation(pages);
    return (
        <div className={`header-content-wrapper content-block ${wrapperClass ?? ""}`}>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="header-bg" />
            <div className="blur-1" />
            <div className="blur-2" />
            <div className="blur-3" />
            { beforeNavigation }
            <div className={`header-title-wrapper ${titleClass ?? ""}`}>
                <div className="header-navigation">
                    { navigation }
                </div>
                <div className="header-title">
                    <h1>{title}</h1>
                    <h2>{translator.get("header")}</h2>
                </div>
                { afterTitle ?? (
                    <div className="page-title-container">
                        { processChildren(children) }
                    </div>
                ) }
            </div>
        </div>
    );
}