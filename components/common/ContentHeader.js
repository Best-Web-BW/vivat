import Head from "next/head";
import Link from "next/link";
import { useMemo } from "react";
import { divideArrayFlatly } from "../../utils/common";
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

export default function ContentHeader({ description, keywords, pages, wrapperClass, titleClass, beforeNavigation, afterTitle, children }) {
    const [title, navigation] = processNavigation(pages);

    const descriptionMeta = useMemo(() => {
        const desc = description ?? children;
        if(!desc) return null;
        return <meta name="description" content={desc.length > 140 ? `${desc.substring(0, 137)}...` : desc} />;
    }, [description, children]);

    const keywordsMetas = useMemo(() => {
        if(!keywords) return null;
        return divideArrayFlatly(keywords, 3).map(kws => <meta key={kws[0]} name="keywords" content={kws.join(", ")} />);
    }, [keywords]);
    
    return (
        <div className={`header-content-wrapper content-block ${wrapperClass ?? ""}`}>
            <Head>
                <title>{title}</title>
                <meta name="robots" content="index, nofollow" />
                { descriptionMeta }
                { keywordsMetas }
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
                    <h1>{ title }</h1>
                    <h2>{ translator.get("header") }</h2>
                </div>
                { afterTitle ?? (
                    <div className="page-title-container">
                        { children && <p className="page-title-1">{ children }</p> }
                    </div>
                ) }
            </div>
        </div>
    );
}