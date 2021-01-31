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

function processChildren(children) {
    if(!children) return;
    if(!children.length) children = [children];
    return children.map((child, i) => <p key={i} className={`page-title-${i + 1}`}>{child.props.children}</p>);
}

export default function ContentHeader(props) {
    return (
        <div className={"header-content-wrapper content-block " + (props.class ?? "")}>
            <div className="header-bg" />
            <div className="blur-1" />
            <div className="blur-2" />
            <div className="blur-3" />
            <div className="header-title-wrapper">
                <div className="header-navigation">
                    <Link href="/home">
                        <a className="header-link-prev">Главная</a>
                    </Link>
                    <Link href={`/${props.address}`}>
                        <a className="header-link-current">{props.title}</a>
                    </Link>
                </div>
                <div className="header-title">
                    <h1>{props.title}</h1>
                    <h2>{translator.get("header")}</h2>
                </div>
                <div className="page-title-container">
                    { processChildren(props.children) }
                </div>
            </div>
        </div>
    );
}