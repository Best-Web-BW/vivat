import { useState, useEffect } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import EventListProvider from "../../utils/providers/EventListProvider";
import { currentISODate } from "../../utils/common";

export default function EventCalendar() {
    const [calendar, setCalendar] = useState(null);

    useEffect(async () => {
        const json = await EventListProvider.getEventList();
        const date = currentISODate(new Date());
        const events = [];
        for(let { title, dates: [start, end] } of json) {
            if(date <= end) events.push({
                start: moment.utc(start),
                end: moment.utc(end),
                title: title,
            });
        }
        setCalendar(<Calendar localizer={momentLocalizer(moment)} events={events} views={["month"]} />
        );
    }, []);

    return calendar;
}