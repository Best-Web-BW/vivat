import { useState, useEffect, useMemo } from "react";
import Router from "next/router";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import EventListProvider from "../../utils/providers/EventListProvider";
import { currentISODate } from "../../utils/common";

export default function EventCalendar() {
    const localizer = useMemo(() => momentLocalizer(moment), []);
    const [config, setConfig] = useState({ localizer, events: [] });

    useEffect(async () => {
        const json = await EventListProvider.getEventList();
        const date = currentISODate(new Date());

        const config = {
            localizer,
            views: ["month"],
            events: json.map(({ id, title, dates: [start, end] }) => ({ id, title, start, end })),
            startAccessor: event => moment.utc(event.start).toDate(),
            endAccessor: event => moment.utc(event.end).toDate(),
            onSelectEvent: event => Router.push(`/events/${event.id}`)
        };

        setConfig(config);
    }, []);

    return <Calendar {...config} />;
}