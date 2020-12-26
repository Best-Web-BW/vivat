import React from "react";
import { Link } from "react-router-dom";

class Gallery extends React.Component {
    render() {
        return (
            <div>
                <div className="header-content-wrapper gallery content-block">
                    <div className="header-bg" />
                    <div className="blur-1" />
                    <div className="blur-2" />
                    <div className="blur-3" />
                    <div className="header-title-wrapper">
                        <div className="header-navigation">
                            <Link to="/home" className="header-link-prev">Главная</Link>
                            <Link to="/gallery" className="header-link-current">Галерея</Link>
                        </div>
                        <div className="header-title">
                            <h1>Галерея</h1>
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
                <div className="gallery-content-wrapper content-block">
                    <div className="block-title">
                        <h2>Альбомы</h2>
                    </div>
                    <div className="albom-list-container">
                        <a href="/Pages/alboms/albom-page.html" className="albom-list-element">
                            <img src="/images/gallery/yael-gonzalez-8qqHbE8_SmE-unsplash.jpg" alt="" width="100%" />
                            <div className="flex-row">
                                <div className="albom-list-date">
                                    <p>03.10.2020</p>
                                </div>
                                <div className="albom-list-title">
                                    <p>Скачки белых лошадей 2020</p>
                                </div>
                            </div>
                        </a>
                        <a href="/Pages/alboms/albom-page.html" className="albom-list-element">
                            <img src="/images/gallery/yael-gonzalez-8qqHbE8_SmE-unsplash.jpg" alt="" width="100%" />
                            <div className="flex-row">
                                <div className="albom-list-date">
                                    <p>03.10.2020</p>
                                </div>
                                <div className="albom-list-title">
                                    <p>Скачки белых лошадей 2020</p>
                                </div>
                            </div>
                        </a>
                        <a href="/Pages/alboms/albom-page.html" className="albom-list-element">
                            <img src="/images/gallery/yael-gonzalez-8qqHbE8_SmE-unsplash.jpg" alt="" width="100%" />
                            <div className="flex-row">
                                <div className="albom-list-date">
                                    <p>03.10.2020</p>
                                </div>
                                <div className="albom-list-title">
                                    <p>Скачки белых лошадей 2020</p>
                                </div>
                            </div>
                        </a>
                        <a href="/Pages/alboms/albom-page.html" className="albom-list-element">
                            <img src="/images/gallery/yael-gonzalez-8qqHbE8_SmE-unsplash.jpg" alt="" width="100%" />
                            <div className="flex-row">
                                <div className="albom-list-date">
                                    <p>03.10.2020</p>
                                </div>
                                <div className="albom-list-title">
                                    <p>Скачки белых лошадей 2020</p>
                                </div>
                            </div>
                        </a>
                        <a href="/Pages/alboms/albom-page.html" className="albom-list-element">
                            <img src="/images/gallery/yael-gonzalez-8qqHbE8_SmE-unsplash.jpg" alt="" width="100%" />
                            <div className="flex-row">
                                <div className="albom-list-date">
                                    <p>03.10.2020</p>
                                </div>
                                <div className="albom-list-title">
                                    <p>Скачки белых лошадей 2020</p>
                                </div>
                            </div>
                        </a>
                        <a href="/Pages/alboms/albom-page.html" className="albom-list-element">
                            <img src="/images/gallery/yael-gonzalez-8qqHbE8_SmE-unsplash.jpg" alt="" width="100%" />
                            <div className="flex-row">
                                <div className="albom-list-date">
                                    <p>03.10.2020</p>
                                </div>
                                <div className="albom-list-title">
                                    <p>Скачки белых лошадей 2020</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Gallery;