import ContentHeader from "../components/common/ContentHeader";
import EventSlider from "../components/sliders/EventSlider";
import EventCalendar from "../components/common/EventCalendar";

export default function Events() {
    return (
        <div>
            <ContentHeader class="events" pages={[["events", "Мероприятия"]]}>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illo id beatae dolores recusandae
                    et repellat ratione! Culpa accusamus consequatur quae ipsam quidem, reiciendis distinctio
                    ratione aut dolore praesentium omnis quis nam modi ea architecto eveniet sunt exercitationem,
                    totam quas aperiam cupiditate harum vero ex nihil. Aut nisi adipisci amet fugit, aliquid vel
                    temporibus quos id provident, esse illo explicabo animi inventore at numquam? Accusantium ab
                    dolor odit repudiandae possimus tempora eveniet autem, reprehenderit voluptatum consectetur nemo
                    ipsam nesciunt consequuntur sequi fuga odio voluptatem, natus pariatur ullam temporibus sint
                    rerum consequatur. Quibusdam quod sapiente debitis nulla, ad omnis ratione minima.
                </p>
            </ContentHeader>
            <div className="calendar-wrapper content-block">
                <div className="block-title">
                    <h2>Календарь событий</h2>
                </div>
                <div className="event-calendar-wrapper">
                    <EventCalendar />
                </div>
            </div>
            <div className="day-events-content-wrapper content-block">
                <EventSlider containerClass="day-events-container" />
            </div>
        </div>
    );
}