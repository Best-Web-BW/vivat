import Router from "next/router";
import { useState, useEffect, useMemo } from "react";
import EventListProvider from "../../utils/providers/EventListProvider";

export default function _EventCalendar(props) {
    const [imported, setImported] = useState();
    useEffect(async () => {
        const moment = (await import("moment")).default;
        const { Calendar, momentLocalizer } = await import("react-big-calendar");
        setImported({ Calendar, momentLocalizer, moment });
    }, []);

    return imported ? <EventCalendar {...imported} props={props} /> : null;
}

function EventCalendar({ Calendar, momentLocalizer, moment, props }) {
    const localizer = useMemo(() => momentLocalizer(moment), []);
    const [config, setConfig] = useState({ localizer, events: [] });

    useEffect(async () => {
        const json = await EventListProvider.getEventList();

        const config = {
            localizer,
            views: ["month"],
            endAccessor: event => moment.utc(event.end).toDate(),
            startAccessor: event => moment.utc(event.start).toDate(),
            onSelectEvent: event => Router.push(`/events/${event.id}`),
            events: json.map(({ id, title, dates: [start, end] }) => ({ id, title, start, end }))
        };

        setConfig(config);
    }, []);

    return <Calendar {...config} {...props} />;
}