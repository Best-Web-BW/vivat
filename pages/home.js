import EventListProvider from "../utils/providers/EventListProvider";
import EventCalendar from "../components/common/EventCalendar";
import ServicesList from "../components/common/ServicesList";
import EventSlider from "../components/sliders/EventSlider";
import Translator from "../components/common/Translator";
import { useEffect, useState } from "react";
import Head from "next/head";

let translator = new Translator({
    ru: {
        "language": "RU",
        "vivat": "Виват, Россия!",
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
        "language": "EN",
        "vivat": "Vivat, Russia!",
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

export default function Home({ events }) {
    const [calendar, setCalendar] = useState(null);
    useEffect(() => setCalendar(
        <div className="calendar-wrapper content-block">
            <div className="block-title">
                <h2>{translator.get("calendar_title")}</h2>
            </div>
            <div className="event-calendar-wrapper">
                <EventCalendar events={events} />
            </div>
        </div>
    ), [events]);

    return (
        <div>
            <Head>
                <title>{translator.get("header")} "{translator.get("vivat")}"</title>
            </Head>
            <div className="header-content-wrapper content-block">
                <div className="video-background desktop">
                    <video preload="auto" autoPlay loop muted>
                        <source src="/images/horse.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
                    </video>
                </div>
                <div className="video-background mobile">
                    <video preload="auto" autoPlay loop muted>
                        <source src="/images/horse_m.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
                    </video>
                </div>
                <div>
                    <div className="header-bg" />
                    <div className="blur-1" />
                    <div className="blur-2" />
                    <div className="blur-3" />
                    <div className="header-title-wrapper">
                        <div className="header-navigation">{translator.get("language")} | Russia, Moscow</div>
                        <div className="header-title">
                            <h1>{translator.get("vivat")}</h1>
                            <h2>{translator.get("header")}</h2>
                        </div>
                    </div>
                </div>
                <EventSlider events={events} containerClass="events-wrapper" />
            </div>
            { calendar }
            <ServicesList containerClass="services-wrapper" />
        </div>
    );
}

export async function getServerSideProps() {
    const result = { props: { events: [] } };
    try { result.props.events = await EventListProvider.getEventList() }
    catch(e) { console.error(e) }
    finally { return result }
}