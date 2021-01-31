import Translator from "./Translator";

let translator = new Translator({
    ru: {
        "header": "\"Виват, Россия!\""
    },
    en: {
        "header": "\"Vivat, Russia!\""
    }
});

// class NewContentHeader extends React.Component {
//     render() {
//         return (
//             <div>
//                 <div className="header-bg" />
//                 <div className="blur-1" />
//                 <div className="blur-2" />
//                 <div className="blur-3" />
//                 <div className="header-title-wrapper">
//                     <div className="header-navigation"></div>
//                     <div className="header-title">
//                         <h1>{translator.get("header")}</h1>
//                         <h2>{this.props.header ?? ""}</h2>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

export default function ContentHeader(props) {
    return (
        <div>
            <div className="header-bg" />
            <div className="blur-1" />
            <div className="blur-2" />
            <div className="blur-3" />
            <div className="header-title-wrapper">
                <div className="header-navigation">{"RU" /* global.language.toUpperCase() */} | Russia, Moscow</div>
                <div className="header-title">
                    <h1>{translator.get("header")}</h1>
                    <h2>{props.header ?? ""}</h2>
                </div>
            </div>
        </div>
    );
}