import { AuthVariableComponent, useAuth } from "../../utils/providers/AuthProvider";
import EventListProvider from "../../utils/providers/EventListProvider";
import ProfileMenu from "../../components/common/ProfileMenu";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
// import Select from "react-select";

const categoryOptions = [
    { value: "chocolate", label: "По расписанию" },
    { value: "strawberry", label: "Сначала прошедшие" },
    { value: "vanilla", label: "Сначала будущие" }
]

const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
};

const groupBadgeStyles = {
    backgroundColor: "#EBECF0",
    borderRadius: "2em",
    color: "#172B4D",
    display: "inline-block",
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: "1",
    minWidth: 1,
    padding: "0.16666666666667em 0.5em",
    textAlign: "center"
};
  
const formatGroupLabel = data => (
    <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
);

function EventEntry({ id, title, category, type }) {
    return (
        <Link href={`/events/${id}`}>
            <a className="my-events-element">
                <div className="my-events-programm">
                    <div className="my-events-programm-title">
                        <p>Программа</p>
                    </div>
                    <div className="my-events-programm-name">
                        <p>{ title }</p>
                    </div>
                </div>
                <div className="my-events-categories">
                    <div className="my-events-categories-title">
                        <p>Категория</p>
                    </div>
                    <div className="my-events-categories-name">
                        <p>{ category }</p>
                    </div>
                </div>
                <div className="my-events-type">
                    <div className="my-events-type-title">
                        <p>Тип</p>
                    </div>
                    <div className="my-events-type-name">
                        <p>{ type }</p>
                    </div>
                </div>
            </a>
        </Link>
    );
}

const DateButton = ({ date, turn, active }) => <a className={`choose-date-element ${active && "active"}`} onClick={turn}>{ date }</a>;

function EventEntryContainer({ Select }) {
    const [events, setEvents] = useState([]);
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState();
    const currentDate = useMemo(() => new Date().toISOString(), []);
    const user = useAuth();
    
    useEffect(async () => {
        if(!user) return;

        const events = await Promise.all(user.events.map(({ event_id }) => EventListProvider.getEventDetails(event_id)));
        const dates = [...new Set(events.map(event => event.dates[0]))];

        setEvents(events);
        setDates(dates);
        if(dates.includes(currentDate)) setSelectedDate(currentDate);
    }, [user]);

    return (
        <div className="my-events-wrapper">
            <div className="choose-date-my-events">
                { dates.map(date => <DateButton key={date} date={date} turn={() => setSelectedDate(date)} active={date === selectedDate} />) }
            </div>
            <div className="my-events-container">
                <div className="my-events-sorting-container">
                    <Select
                        theme={theme => ({ ...theme, borderRadius: 0, colors: { ...theme.colors, primary: "" } })}
                        formatGroupLabel={formatGroupLabel}
                        defaultValue={categoryOptions[0]}
                        placeholder="Выберите из списка"
                        options={categoryOptions}
                    />
                </div>
                <div className="my-events-element-container">{
                    events.filter(event => event.dates[0] === selectedDate).map(event => <EventEntry key={event.id} {...event} />)
                }</div>
            </div>
        </div>
    );
}

export default function _MyEvents() {
    const [imported, setImported] = useState();
    useEffect(async () => setImported({ Select: (await import("react-select")).default }), []);
    return imported ? <MyEvents {...imported} /> : null;
}

function MyEvents({ Select }) {
    return (
        <AuthVariableComponent>
            <div className="profile-content content-block">
                <ProfileMenu active="my-events" />
                <div className="block-title">
                    <h2>Мои события</h2>
                </div>
                <EventEntryContainer Select={Select} />
            </div>
            <div />
        </AuthVariableComponent>
    );
}