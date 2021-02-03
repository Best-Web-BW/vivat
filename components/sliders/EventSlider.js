import React from "react";
import Link from "next/link";
import EventListProvider from "../providers/EventListProvider";

const daysOfWeek = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"]
const localeConfig = { day: "numeric", month: "numeric", year: "numeric" };

function convertDate(rawDate) {
    const date = new Date(rawDate);
    return `${daysOfWeek[date.getUTCDay()]}. ${date.toLocaleString("ru", localeConfig)}`;
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

export default class EventSlider extends React.Component {
    constructor() {
        super();

        this.state = {
            start: null,
            end: null
        };
        
        this.size = 4;
        this.events = [];
        this.length = 0;

        this.scrollLeft = () => {
            this.setState({
                start: Math.max(this.state.start - 1, 0),
                end: Math.max(this.state.end - 1, this.size)
            });
        }
        this.scrollRight = () => {
            this.setState({
                start: Math.min(this.state.start + 1, this.length - this.size),
                end: Math.min(this.state.end + 1, this.length)
            });
        }
    }

    async componentDidMount() {
        try {
            const events = await EventListProvider.getEventList();
            this.events = events.map(event => <EventBlock key={event.id} {...event} />);
            this.length = events.length;
            this.size = Math.min(this.size, this.length);
            this.setState({
                start: 0,
                end: this.size
            });
        } catch(e) {}
    }

    render() {
        return (
            <div className={this.props.containerClass}>
                <div className="day-events-title">
                    <p><span>События на</span>&nbsp;<span style={{ color: "#797878d1" }}>{ new Date().toLocaleString("ru", localeConfig) }</span></p>
                </div>
                <div className="events-navigation">
                    <div className="prev" onClick={this.scrollLeft}>
                        <span className={this.state.start == 0 ? "inactive" : ""} />
                    </div>
                    <div className="next" onClick={this.scrollRight}>
                        <span className={this.state.end == this.events.length ? "inactive" : ""} />
                    </div>
                </div>
                <div className="events-blocks-wrapper">
                    { this.events.slice(this.state.start, this.state.end) }
                </div>
            </div>
        );
    }
}