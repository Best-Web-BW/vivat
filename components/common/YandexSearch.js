import { useEffect, useMemo, useState } from "react";
import { withRouter } from "next/router";

const DO_LOG = false;

export const QueryInput = withRouter(_QueryInput);
function _QueryInput({ router }) {
    const [text, setText] = useState("");
    const onSubmit = evt => {
        evt.preventDefault();
        // if(text.length) router.push(`/search?text=${encodeURIComponent(text)}&searchid=2447908&web=0`);
        if(text.length) document.location = `/search?text=${encodeURIComponent(text)}&searchid=2447908&web=0`;
    }

    return (
        <form className="search-form" onSubmit={onSubmit} style={{ width: "100%" }}>
            <input
                type="text" className="search-input" placeholder="Введите поисковой запрос"
                value={text} onChange={evt => setText(evt.target.value)}
            />
            <label className="search-icon-wrapper">
                <input type="submit" hidden />
                <span className="search-icon" />
            </label>
        </form>
    );
}

export const ResultPage = withRouter(_ResultPage);
function _ResultPage({ router }) {
    const config = useMemo(() => JSON.stringify({
        "tld": "ru",
        "language": "ru",
        "encoding": "",
        "htmlcss": "1.x",
        "updatehash": true
    }), []);

    // useEffect(() => console.log(router.query), [router.query]);
    useEffect(() => {
        DO_LOG && console.log(typeof Ya, router.query);
        typeof Ya === "object" && Ya.Site.Results.init();
    }, [typeof Ya, router.query]);

    return (<>
        <div id="ya-site-results" data-bem={config} />
        <style>
            {/* #ya-site-results
            {
                color: #000000;
                background: #ffffff;
            }

            #ya-site-results .b-pager__current,
            #ya-site-results .b-serp-item__number
            {
                color: #000000 !important;
            }

            #ya-site-results
            {
                font-family: Arial !important;
            }

            #ya-site-results :visited,
            #ya-site-results .b-pager :visited,
            #ya-site-results .b-foot__link:visited,
            #ya-site-results .b-copyright__link:visited
            {
                color: #800080;
            }

            #ya-site-results a:link,
            #ya-site-results a:active,
            #ya-site-results .b-pseudo-link,
            #ya-site-results .b-head-tabs__link,
            #ya-site-results .b-head-tabs__link:link,
            #ya-site-results .b-head-tabs__link:visited,
            #ya-site-results .b-dropdown__list .b-pseudo-link,
            #ya-site-results .b-dropdowna__switcher .b-pseudo-link,
            .b-popupa .b-popupa__content .b-menu__item,
            #ya-site-results .b-foot__link:link,
            #ya-site-results .b-copyright__link:link,
            #ya-site-results .b-serp-item__mime,
            #ya-site-results .b-pager :link
            {
                color: #0033FF;
            }

            #ya-site-results :link:hover,
            #ya-site-results :visited:hover,
            #ya-site-results .b-pseudo-link:hover
            {
                color: #FF0000 !important;
            }

            #ya-site-results .l-page,
            #ya-site-results .b-bottom-wizard
            {
                font-size: 13px;
            }

            #ya-site-results .b-pager
            {
                font-size: 1.25em;
            }

            #ya-site-results .b-serp-item__text,
            #ya-site-results .ad
            {
                font-style: normal;
                font-weight: normal;
            }

            #ya-site-results .b-serp-item__title-link,
            #ya-site-results .ad .ad-link
            {
                font-style: normal;
                font-weight: normal;
            }

            #ya-site-results .ad .ad-link a
            {
                font-weight: bold;
            }

            #ya-site-results .b-serp-item__title,
            #ya-site-results .ad .ad-link
            {
                font-size: 16px;
            }

            #ya-site-results .b-serp-item__title-link:link,
            #ya-site-results .b-serp-item__title-link
            {
                font-size: 1em;
            }

            #ya-site-results .b-serp-item__number
            {
                font-size: 13px;
            }

            #ya-site-results .ad .ad-link a
            {
                font-size: 0.88em;
            }

            #ya-site-results .b-serp-url,
            #ya-site-results .b-direct .url,
            #ya-site-results .b-direct .url a:link,
            #ya-site-results .b-direct .url a:visited
            {
                font-size: 13px;
                font-style: normal;
                font-weight: normal;
                color: #329932;
            }

            #ya-site-results .b-serp-item__links-link
            {
                font-size: 13px;
                font-style: normal;
                font-weight: normal;
                color: #000000 !important;
            }

            #ya-site-results .b-pager__inactive,
            #ya-site-results .b-serp-item__from,
            #ya-site-results .b-direct__head-link,
            #ya-site-results .b-image__title,
            #ya-site-results .b-video__title
            {
                color: #000000 !important;
            }

            #ya-site-results .b-pager__current,
            #ya-site-results .b-pager__select
            {
                background: #E0E0E0;
            }

            #ya-site-results .b-foot,
            #ya-site-results .b-line
            {
                border-top-color: #E0E0E0;
            }

            #ya-site-results .b-dropdown__popup .b-dropdown__list,
            .b-popupa .b-popupa__content
            {
                background-color: #ffffff;
            }

            .b-popupa .b-popupa__tail
            {
                border-color: #E0E0E0 transparent;
            }

            .b-popupa .b-popupa__tail-i
            {
                border-color: #ffffff transparent;
            }

            .b-popupa_direction_left.b-popupa_theme_ffffff .b-popupa__tail-i,
            .b-popupa_direction_right.b-popupa_theme_ffffff .b-popupa__tail-i
            {
                border-color: transparent #ffffff;
            }

            #ya-site-results .b-dropdowna__popup .b-menu_preset_vmenu .b-menu__separator
            {
                border-color: #E0E0E0;
            }

            .b-specification-list,
            .b-specification-list .b-pseudo-link,
            .b-specification-item__content label,
            .b-specification-item__content .b-link,
            .b-specification-list .b-specification-list__reset .b-link
            {
                color: #000000 !important;
                font-family: Arial;
                font-size: 13px;
                font-style: normal;
                font-weight: normal;
            }

            .b-specification-item__content .b-calendar__title
            {
                font-family: Arial;
                color: #000000;
                font-size: 13px;
                font-style: normal;
                font-weight: normal;
            }

            .b-specification-item__content .b-calendar-month__day_now_yes
            {
                color: #E0E0E0;
            }

            .b-specification-item__content .b-calendar .b-pseudo-link
            {
                color: #000000;
            }

            .b-specification-item__content
            {
                font-family: Arial !important;
                font-size: 13px;
            }

            .b-specification-item__content :visited
            {
                color: #800080;
            }

            .b-specification-item__content .b-pseudo-link:hover,
            .b-specification-item__content :visited:hover
            {
                color: #FF0000 !important;
            }

            #ya-site-results .b-popupa .b-popupa__tail-i
            {
                background: #ffffff;
                border-color: #E0E0E0 !important;
            } */}
        </style>
    </>);
}

// export function ResultPage() {
//     const [plug, setPlug] = useState(<div id="ya-site-results" data-bem='{"tld":"ru","language":"ru","encoding":"","htmlcss":"1.x","updatehash":true}' style={{ display: "none" }} />);

//     useEffect(() => {
//         if(typeof Ya === "object") {
//             Ya.Site.Results.init();
//             Ya.Site.Results.triggerResultsDelivered = result => {
//                 const count = result.match(/нашёл (\d+?) ответ/);
//                 if(!count) return console.log("Ничего не найдено.");
                
//                 const parsedPages = result.match(/<yass-li.+?>(.+?)<\/yass-li>/g).map(page => ({
//                     title: page.match(/<yass-span>(.+?)<\/yass-span>/)[1],
//                     url: page.match(/b-serp-url__item">(.+?)</)[1].replace("kskvivat.com/", "").split("/"),
//                     contents: page.match(/b-serp-item__text">(.+?)<\/yass-div>/)[1]
//                 }));
                
//                 console.log("Count", count[1]);
//                 console.log("Parsed pages", parsedPages);
//                 setPlug(null);
//             }
//         }
//     }, [typeof Ya]);

//     return (<>
//         { plug }
//         {/* Здесь должна быть реальная страница с результатами */}
//     </>);
// }