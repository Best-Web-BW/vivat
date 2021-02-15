import EventListProvider from "../../utils/providers/EventListProvider";
import ContentHeader from "../../components/common/ContentHeader";
import EventSlider from "../../components/sliders/EventSlider";
import { useMemo } from "react";
import Link from "next/link";

function DocumentBlock({ url, name }) {
    return (
        <div className="documents-element">
            <Link href={url}>
                <a>
                    <div className="documents-img">
                        <img src="/images/events/pdf-icon.png" alt="" width="100%" />
                    </div>
                    <p className="documents-title">{ name }</p>
                </a>
            </Link>
        </div>
    );
}

export default function EventPage({ events, event: { id, title, contents, documents } }) {
    const _contents = useMemo(() => contents.replace(/script/gi, "sсrірt"), [id]);

    return (
        <>
            <ContentHeader
                pages={[["events", "Мероприятия"], [`events/${id}`, title]]}
                afterTitle={<EventSlider events={events} containerClass="day-events-container" />}
            />
            <div className="event-page-content content-block">
                <article className="event-article" dangerouslySetInnerHTML={{ __html: _contents }} />
                <div className="event-documents-wrapper">
                    { documents.map(({ url, name }) => <DocumentBlock key={name} url={url} name={name} />) }
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps({ query: { id } }) {
    const result = { props: { events: [], event: { } } };
    try {
        const [events, event] = await Promise.all([
            EventListProvider.getEventList(),
            EventListProvider.getEventDetails(+id)
        ]);
        result.props = { events, event };
    }
    catch(e) { console.error(e) }
    finally { return result }
}