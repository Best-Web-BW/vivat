import Translator from "../components/common/Translator";

let translator = new Translator({
    ru: {
        "header": "Конно-спортивный клуб",
        "calendar_title": "Календарь событий",
        "our_services": "Наши услуги",
        "main_horse_stable": "Основная конюшня",
        "guest_horse_stable": "Гостевая конюшня",
        "personal_lessons": "Персональные занятия",
        "rent": "Аренда",
        "services": "Услуги"
    },
    en: {
        "header": "Equestrian club",
        "calendar_title": "Calendar of events",
        "our_services": "Our services",
        "main_horse_stable": "Main horse stable",
        "guest_horse_stable": "Guest horse stable",
        "personal_lessons": "Personal lessons",
        "rent": "Rent",
        "services": "Services"
    }
});

export default function Home() {
    return (
        <div>
            <div className="header-content-wrapper content-block">
                <div>
                    <div className="header-bg" />
                    <div className="blur-1" />
                    <div className="blur-2" />
                    <div className="blur-3" />
                    <div className="header-title-wrapper">
                        <div className="header-navigation">{"RU" /* global.language.toUpperCase() */} | Russia, Moscow</div>
                        <div className="header-title">
                            <h1>Виват, Россия!</h1>
                            <h2>{translator.get("header")}</h2>
                        </div>
                    </div>
                </div>
                <div className="events-wrapper">
                    <div className="events-navigation">
                        <div className="prev">
                            <span />
                        </div>
                        <div className="next">
                            <span />
                        </div>
                    </div>
                    <div className="events-blocks-wrapper">
                        <div className="events-block">
                            <div className="events-title">
                                <a href="Pages/events/event-page.html">Скачки белых лошадей в этот четверг</a>
                            </div>
                            <div className="events-date">
                                <a href="!!???">ЧТ. 21.01.2020</a>
                            </div>
                        </div>
                        <div className="events-block">
                            <div className="events-title">
                                <a href="Pages/events/event-page.html">Конкурс "Гарцующий пони", маленькие лошадки и не только!</a>
                            </div>
                            <div className="events-date">
                                <a href="!!???">ПН. 08.02.2020</a>
                            </div>
                        </div>
                        <div className="events-block">
                            <div className="events-title">
                                <a href="Pages/events/event-page.html">Самые быстрые скакуны только в феврале</a>
                            </div>
                            <div className="events-date">
                                <a href="!!???">СБ. 16.01.2020</a>
                            </div>
                        </div>
                        <div className="events-block">
                            <div className="events-title">
                                <a href="Pages/events/event-page.html">Конкурс "самая длинная грива 2020"</a>
                            </div>
                            <div className="events-date">
                                <a href="!!???">ПТ. 01.03.2020</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="calendar-wrapper content-block">
                <div className="block-title">
                    <h2>{translator.get("calendar_title")}</h2>
                </div>
                <div id="calendar">CALENDAR</div>
            </div>
            <div className="services-wrapper content-block">
                <div className="block-title">
                    <h2>{translator.get("our_services")}</h2>
                </div>
                <div className="services-blocks-wrapper">
                    <div className="services-block">
                        <a href="Pages/services/main-horsestable.html">
                            <div className="service-img">
                                <img src="/images/home/services/evan-wise-O1S18WAol3w-unsplash.jpg" alt="" height="100%" />
                            </div>
                        </a>
                        <div className="service-category">
                            <a href="!!???">{translator.get("rent")}</a>
                        </div>
                        <div className="service-title">
                            <a href="Pages/services/main-horsestable.html">{translator.get("main_horse_stable")}</a>
                        </div>
                    </div>
                    <div className="services-block">
                        <a href="Pages/services/guest-horsestable.html">
                            <div className="service-img">
                                <img src="/images/home/services/gabriella-clare-marino-O_jE3p48m44-unsplash.jpg" alt="" height="100%" />
                            </div>
                        </a>
                        <div className="service-category">
                            <a href="!!???">{translator.get("rent")}</a>
                        </div>
                        <div className="service-title">
                            <a href="Pages/services/guest-horsestable.html">{translator.get("guest_horse_stable")}</a>
                        </div>
                    </div>
                    <div className="services-block">
                        <a href="Pages/services/personal-lessons.html">
                            <div className="service-img">
                                <img src="images/home/services/matthew-lancaster-B5KfPvpVe-c-unsplash.jpg" alt="" height="100%" />
                            </div>
                        </a>
                        <div className="service-category">
                            <a href="!!???">{translator.get("services")}</a>
                        </div>
                        <div className="service-title">
                            <a href="Pages/services/personal-lessons.html">{translator.get("personal_lessons")}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}