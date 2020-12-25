import React from "react";
import { Link } from "react-router-dom";

class Events extends React.Component {
    render() {
        return (
            <div>
                <div className="header-content-wrapper content-block">
                    <div className="header-bg" />
                    <div className="blur-1" />
                    <div className="blur-2" />
                    <div className="blur-3" />
                    <div className="header-title-wrapper">
                        <div className="header-navigation">
                            <Link to="/home" className="header-link-prev">Главная</Link>
                            <Link to="/events" className="header-link-current">Мероприятия</Link>
                        </div>
                        <div className="header-title">
                            <h1>Мероприятия</h1>
                            <h2>Конно-спортивный клуб "Виват, Россия!"</h2>
                        </div>
                        <div className="page-title-container">
                            <p className="page-title-1">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illo id beatae dolores recusandae
                                et repellat ratione! Culpa accusamus consequatur quae ipsam quidem, reiciendis distinctio
                                ratione aut dolore praesentium omnis quis nam modi ea architecto eveniet sunt exercitationem,
                                totam quas aperiam cupiditate harum vero ex nihil. Aut nisi adipisci amet fugit, aliquid vel
                                temporibus quos id provident, esse illo explicabo animi inventore at numquam? Accusantium ab
                                dolor odit repudiandae possimus tempora eveniet autem, reprehenderit voluptatum consectetur nemo
                                ipsam nesciunt consequuntur sequi fuga odio voluptatem, natus pariatur ullam temporibus sint
                                rerum consequatur. Quibusdam quod sapiente debitis nulla, ad omnis ratione minima.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="calendar-wrapper content-block">
                    <div className="block-title">
                        <h2>Календарь событий</h2>
                    </div>
                    <div id="calendar">CALENDAR</div>
                </div>
                <div className="day-events-content-wrapper content-block">
                    <div className="day-events-container">
                        <div className="day-events-title">
                            <p><span>События на</span>&nbsp;<span style={{ color: "#797878d1" }}>21.03.2020</span></p>
                        </div>
                        <div className="events-navigation">
                            <div className="prev">
                                <span />
                            </div>
                            <div className="next">
                                <span />
                            </div>
                        </div>
                        <div className="events-blocks-wrapper">
                            <div className="events-block">
                                <div className="events-title">
                                    <a href="/Pages/events/event-page.html">Скачки белых лошадей в этот четверг</a>
                                </div>
                                <div className="events-date">
                                    <a href="!!???">ЧТ. 21.01.2020</a>
                                </div>
                            </div>
                            <div className="events-block">
                                <div className="events-title">
                                    <a href="/Pages/events/event-page.html">Конкурс "Гарцующий пони", маленькие лошадки и не только!</a>
                                </div>
                                <div className="events-date">
                                    <a href="!!???">ПН. 08.02.2020</a>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Events;