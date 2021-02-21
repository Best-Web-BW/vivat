import { useEffect, useMemo, useState } from "react";

export function QueryInput() {
    const [text, setText] = useState("");
    const onSubmit = evt => {
        evt.preventDefault();
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

export function ResultPage() {
    const [plug, setPlug] = useState(<div id="ya-site-results" data-bem='{"tld":"ru","language":"ru","encoding":"","htmlcss":"1.x","updatehash":true}' style={{ display: "none" }} />);

    useEffect(() => {
        if(typeof Ya === "object") {
            Ya.Site.Results.init();
            Ya.Site.Results.triggerResultsDelivered = result => {
                const count = result.match(/нашёл (\d+?) ответ/);
                if(!count) return console.log("Ничего не найдено.");
                
                const parsedPages = result.match(/<yass-li.+?>(.+?)<\/yass-li>/g).map(page => ({
                    title: page.match(/<yass-span>(.+?)<\/yass-span>/)[1],
                    url: page.match(/b-serp-url__item">(.+?)</)[1].replace("kskvivat.com/", "").split("/"),
                    contents: page.match(/b-serp-item__text">(.+?)<\/yass-div>/)[1]
                }));
                
                console.log("Count", count[1]);
                console.log("Parsed pages", parsedPages);
                setPlug(null);
            }
        }
    }, [typeof Ya]);

    return (<>
        { plug }
        {/* Здесь должна быть реальная страница с результатами */}
    </>);
}