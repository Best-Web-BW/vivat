import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import EventListProvider from "../../utils/providers/EventListProvider";
import { toRuDate } from "../../utils/common";

const daysOfWeek = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

export function convertDate(rawDate) {
    const date = new Date(rawDate);
    return `${daysOfWeek[date.getUTCDay()]}. ${toRuDate(date)}`;
}

function EventBlock({ id, title, dates }) {
    const link = `/events/${id}`;
    return (
        <div className="events-block">
            <div className="events-title">
                <Link href={link}>
                    <a>{title}</a>
                </Link>
            </div>
            <div className="events-date">
                <Link href={link}>
                    <a>{convertDate(dates[0])}</a>
                </Link>
            </div>
        </div>
    );
}

export default function EventSlider({ events: _events, containerClass }) {
    const events = useMemo(() => {
        const date = EventListProvider.currentDate;
        return (
            _events
                .filter(({ dates: [start, end] }) => start <= date && date <= end)
                .map(event => <EventBlock key={event.id} {...event} />)
        );
    }, [_events])
    const length = useMemo(() => events.length, [events.length]);
    const size = useMemo(() => Math.min(4, length), [length]);
    const [position, setPosition] = useState({ start: 0, end: size });

    const scrollLeft = () => setPosition(({ start, end }) => ({ start: Math.max(--start, 0), end: Math.max(--end, size) }))
    const scrollRight = () => setPosition(({ start, end }) => ({ start: Math.min(++start, length - size), end: Math.min(++end, length) }))

    return (
        <div className={containerClass}>
            <div className="day-events-title">
                <p><span>События на</span>&nbsp;<span style={{ color: "#797878d1" }}>{ toRuDate(new Date()) }</span></p>
            </div>
            <div className="events-navigation">
                <div className="prev" onClick={scrollLeft}>
                    <span className={position.start == 0 ? "inactive" : ""} />
                </div>
                <div className="next" onClick={scrollRight}>
                    <span className={position.end == events.length ? "inactive" : ""} />
                </div>
            </div>
            <div className="events-blocks-wrapper">
                { events.slice(position.start, position.end) }
            </div>
        </div>
    );
}