import React, { useEffect, useState } from "react";
import Link from "next/link";
import EventListProvider from "../../utils/providers/EventListProvider";
import { reformatDate } from "../../utils/common";

const daysOfWeek = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

function convertDate(rawDate) {
    const date = new Date(rawDate);
    return `${daysOfWeek[date.getUTCDay()]}. ${reformatDate(date)}`;
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

export default function EventSlider({ containerClass }) {
    const [position, setPosition] = useState({ start: 0, end: 0 });
    const [events, setEvents] = useState([]);
    const [size, setSize] = useState(4);
    const [length, setLength] = useState(0);

    const scrollLeft = () => {
        setPosition(prev => ({
            start: Math.max(prev.start - 1, 0),
            end: Math.max(prev.end - 1, size)
        }));
    };
    const scrollRight = () => {
        setPosition(prev => ({
            start: Math.min(prev.start + 1, length - size),
            end: Math.min(prev.end + 1, length)
        }));
    }

    useEffect(async () => {
        const date = EventListProvider.currentDate;

        let _events;
        try { _events = await EventListProvider.getEventList(); }
        catch(e) {}

        _events = _events.filter(event => event.dates[0] <= date && date <= event.dates[1]);
        _events = _events.map(event => <EventBlock key={event.id} {...event} />);

        setEvents(_events);

        const _length = _events.length;
        const _size = Math.min(size, _length);

        setLength(_length);
        setSize(_size);
        setPosition({
            start: 0,
            end: _size
        });
    }, []);

    return (
        <div className={containerClass}>
            <div className="day-events-title">
                <p><span>События на</span>&nbsp;<span style={{ color: "#797878d1" }}>{ reformatDate(new Date())  }</span></p>
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