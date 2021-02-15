import Router from "next/router";
import { useState, useEffect, useMemo } from "react";

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
    const config = useMemo(() => ({
        events: props.events.map(({ id, title, dates: [start, end] }) => ({ id, title, start, end })),
        startAccessor: ({ dates: [start] }) => moment.utc(start).toDate(),
        endAccessor: ({ dates: [, end] }) => moment.utc(end).toDate(),
        onSelectEvent: ({ id }) => Router.push(`/events/${id}`),
        localizer: momentLocalizer(moment),
        views: ["month"]
    }), [props]);

    return <Calendar {...config} {...props} />;
}