import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import ContentHeader from "../../components/common/ContentHeader";
import EventListProvider from "../../utils/providers/EventListProvider";
import EventSlider from "../../components/sliders/EventSlider";
import Link from "next/link";
// import { reformatDate } from "../../utils/common";

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

export default function EventPage() {
    const { id } = useRouter().query;
    const [event, setEvent] = useState();
    const contents = useMemo(() => event ? event.contents.replaceAll("script", "sсrірt") : "", [event]);
    console.log("Event", event);
    console.log("Contents", contents);

    useEffect(async () => {
        if(id) {
            const event = await EventListProvider.getEventDetails(+id);
            setEvent(event);
        }
    }, [id]);

    return (
        <div>
            <ContentHeader
                pages={[["events", "Мероприятия"], [`events/${id}`, event ? event.title : ""]]}
                afterTitle={<EventSlider containerClass="day-events-container" />}
            />
            <div className="event-page-content content-block">
                <article className="event-article" dangerouslySetInnerHTML={{ __html: contents }}>
                    {/* <div className="event-article-img">
                        <img src="/images/events/yael-gonzalez-jd9UEc8Sc58-unsplash.jpg" alt="" width="100%" />
                    </div> */}
                    {/* <p className="event-article-p"> */}
                        {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis voluptas in nisi et suscipit
                        ullam maiores expedita ut rem quidem saepe eveniet sit est accusamus dolor ea dolorem consequuntur,
                        iusto voluptatem beatae, cupiditate enim aliquid? Suscipit, nesciunt esse rem error dicta eveniet
                        numquam, corporis reiciendis, reprehenderit voluptas voluptatum inventore excepturi quibusdam fugit
                        iusto provident!  Quas ratione repellendus labore accusantium commodi asperiores enim aliquam soluta,
                        molestiae distinctio suscipit eligendi magni earum illum omnis. Unde voluptatem numquam, amet maxime
                        facere fugiat optio in voluptas. Modi placeat natus nulla? Quas aut aspernatur ullam inventore ex
                        maxime voluptatibus ut quisquam rem itaque asperiores nam nihil odio mollitia consectetur vero
                        autem, ea in praesentium cumque delectus. Adipisci reiciendis laudantium illum harum ad animi
                        accusantium fuga sapiente provident rem. Rem ad veniam adipisci itaque eligendi sequi beatae
                        voluptatibus vitae cum totam! Blanditiis fugit itaque unde vel explicabo nostrum eum, sint amet
                        eaque, ab, deleniti officiis assumenda a quasi maxime. Cumque modi animi temporibus harum ipsum
                        aliquam accusamus culpa nam sint repellendus doloribus dignissimos minima quod labore aliquid
                        praesentium deleniti, dolorum non saepe rem! Beatae obcaecati, harum assumenda dignissimos quo, ea,
                        dolores hic accusamus tempora ad maxime. Repudiandae quis molestias in veritatis fugit dolorum,
                        ratione, sequi eaque ex accusamus ut laboriosam soluta quibusdam mollitia perspiciatis. Quo
                        laudantium sed deserunt officiis necessitatibus enim, libero incidunt eum, odit magnam modi? Beatae
                        eaque delectus cum repellat. Ullam accusamus animi quidem harum dolor necessitatibus, qui odit,
                        repellendus ut, vel eum illo ad nihil modi! Nemo doloremque itaque molestias ipsam saepe. Aliquam! */}
                    {/* </p> */}
                    {/* <p className="event-article-p">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis voluptas in nisi et suscipit
                        ullam maiores expedita ut rem quidem saepe eveniet sit est accusamus dolor ea dolorem consequuntur,
                        iusto voluptatem beatae, cupiditate enim aliquid? Suscipit, nesciunt esse rem error dicta eveniet
                        numquam, corporis reiciendis, reprehenderit voluptas voluptatum inventore excepturi quibusdam fugit
                        iusto provident! Quas ratione repellendus labore accusantium commodi asperiores enim aliquam soluta,
                        molestiae distinctio suscipit eligendi magni earum illum omnis. Unde voluptatem numquam, amet maxime
                        facere fugiat optio in voluptas. Modi placeat natus nulla? Quas aut aspernatur ullam inventore ex
                        maxime voluptatibus ut quisquam rem itaque asperiores nam nihil odio mollitia consectetur vero
                        autem, ea in praesentium cumque delectus. Adipisci reiciendis laudantium illum harum ad animi
                        accusantium fuga sapiente provident rem. Rem ad veniam adipisci itaque eligendi sequi beatae
                        voluptatibus vitae cum totam! Blanditiis fugit itaque unde vel explicabo nostrum eum, sint amet
                        eaque, ab, deleniti officiis assumenda a quasi maxime. Cumque modi animi temporibus harum ipsum
                        aliquam accusamus culpa nam sint repellendus doloribus dignissimos minima quod labore aliquid
                        praesentium deleniti, dolorum non saepe rem! Beatae obcaecati, harum assumenda dignissimos quo, ea,
                        dolores hic accusamus tempora ad maxime. Repudiandae quis molestias in veritatis fugit dolorum,
                        ratione, sequi eaque ex accusamus ut laboriosam soluta quibusdam mollitia perspiciatis. Quo
                        laudantium sed deserunt officiis necessitatibus enim, libero incidunt eum, odit magnam modi? Beatae
                        eaque delectus cum repellat. Ullam accusamus animi quidem harum dolor necessitatibus, qui odit,
                        repellendus ut, vel eum illo ad nihil modi! Nemo doloremque itaque molestias ipsam saepe. Aliquam!
                    </p> */}
                </article>
                <div className="event-documents-wrapper">
                    { event && event.documents.map(document => <DocumentBlock key={document.name} {...document} />) }
                </div>
            </div>
        </div>
    );
}