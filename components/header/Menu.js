import Link from "next/link";

const menuPages = [
    [    "/home", "Главная"        ],
    [   "/about", "О нас"          ],
    [ "/gallery", "Галерея"        ],
    ["/services", "Услуги и аренда"],
    [  "/events", "Мероприятия"    ],
    [    "/news", "Новости"        ],
    ["/contacts", "Контакты"       ]
];

function MenuItem({ url, title, close }) {
    return (
        <li>
            <Link href={url}>
                <a onClick={close}>{ title }</a>
            </Link>
        </li>
    );
}

export default function Menu({ opened, close }) {
    return (
        <div className={`modal-menu ${opened && "opened"}`} style={{ paddingTop: "6vh" }}>
            <div className="menu-list-wrapper">
                <ul className="menu-list">
                    { menuPages.map(([url, title]) => <MenuItem key={url} {...{ url, title, close }} />) }
                </ul>
            </div>
            <div className="menu-contacts-wrapper">
                <ul className="contacts-list">
                    <li>
                        <a href="tel:+7900000000">+7 900 000 000</a>
                    </li>
                    <li>
                        <a href="mailto:info@vivat.ru">info@vivat.ru</a>
                    </li>
                    <li>
                        <a href="!!address">г.Москва, Замечательный проспект 1</a>
                    </li>
                </ul>
                <ul className="social-links">
                    <li>
                        <a href="vk.com" className="vk-button" />
                    </li>
                    <li>
                        <a href="facebook.com" className="facebook-icon" />
                    </li>
                    <li>
                        <a href="instagram.com" className="instagram-icon" />
                    </li>
                </ul>
            </div>
        </div>
    );
}