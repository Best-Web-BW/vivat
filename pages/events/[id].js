import { useRouter } from "next/router";
import ContentHeader from "../../components/common/ContentHeader";
import EventSlider from "../../components/sliders/EventSlider";

export default function EventPage() {
    const { id } = useRouter().query;

    return (
        <div>
            <ContentHeader
                pages={[["events", "Мероприятия"], [`events/${id}`, `Событие с id = ${id}`]]}
                afterTitle={<EventSlider containerClass="day-events-container" />}
            />
            <div className="event-page-content content-block">
                <article className="event-article">
                    <div className="event-article-img">
                        <img src="/images/events/yael-gonzalez-jd9UEc8Sc58-unsplash.jpg" alt="" width="100%" />
                    </div>
                    <p className="event-article-p">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis voluptas in nisi et suscipit
                        ullam maiores expedita ut rem quidem saepe eveniet sit est accusamus dolor ea dolorem consequuntur,
                        iusto voluptatem beatae, cupiditate enim aliquid? Suscipit, nesciunt esse rem error dicta eveniet
                        numquam, corporis reiciendis, reprehenderit voluptas voluptatum inventore excepturi quibusdam fugit
                        iusto provident!{/*  Quas ratione repellendus labore accusantium commodi asperiores enim aliquam soluta,
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
                    </p>
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
                    <div className="documents-element">
                        <div className="documents-img">
                            <img src="/images/events/pdf-icon.png" alt="" width="100%" />
                        </div>
                        <p className="documents-title">Документы по белым лошадям часть 1</p>
                    </div>
                    <div className="documents-element">
                        <div className="documents-img">
                            <img src="/images/events/pdf-icon.png" alt="" width="100%" />
                        </div>
                        <p className="documents-title">Документы по белым лошадям часть 2</p>
                    </div>
                    <div className="documents-element">
                        <div className="documents-img">
                            <img src="/images/events/pdf-icon.png" alt="" width="100%" />
                        </div>
                        <p className="documents-title">Документы по результатам</p>
                    </div>
                </div>
            </div>
        </div>
    );
}