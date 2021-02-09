import { useState, useEffect } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import EventListProvider from "../../utils/providers/EventListProvider";

export default function EventCalendar() {
    const events = [
        {
            start: moment().toDate(),
            end: moment().add(1, "days").toDate(),
            title: "Hello world!"
        }
    ];
    const [calendar, setCalendar] = useState(null);

    useEffect(async () => {
        global.ev = () => EventListProvider.getEventList();
        const json = await EventListProvider.getEventList();
        console.log(json);

        setCalendar(<Calendar localizer={momentLocalizer(moment)} events={events} />);
    }, []);

    return calendar;
}