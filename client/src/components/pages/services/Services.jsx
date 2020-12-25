import React from "react";
import { Link } from "react-router-dom";

class Services extends React.Component {
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
                            <Link to="/services" className="header-link-current">Аренда и услуги</Link>
                        </div>
                        <div className="header-title">
                            <h1>Аренда и услуги</h1>
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
                <div className="services-content-wrapper content-block">
                    <div className="block-title">
                        <h2>Наши услуги</h2>
                    </div>
                    <div className="services-blocks-wrapper">
                        <div className="services-block">
                            <a href="services/main-horsestable.html">
                                <div className="service-img">
                                    <img src="/images/home/services/evan-wise-O1S18WAol3w-unsplash.jpg" alt="" height="100%" />
                                </div>
                            </a>
                            <div className="service-category">
                                <a href="!!???">Аренда</a>
                            </div>
                            <div className="service-title">
                                <a href="services/main-horsestable.html">Основная конюшня</a>
                            </div>
                        </div>
                        <div className="services-block">
                            <a href="services/guest-horsestable.html">
                                <div className="service-img">
                                 <img src="/images/home/services/gabriella-clare-marino-O_jE3p48m44-unsplash.jpg" alt="" height="100%" />
                                </div>
                            </a>
                            <div className="service-category">
                                <a href="!!???">Аренда</a>
                            </div>
                            <div className="service-title">
                                <a href="services/guest-horsestable.html">Гостевая конюшня</a>
                            </div>
                        </div>
                        <div className="services-block">
                            <a href="services/personal-lessons.html">
                                <div className="service-img">
                                    <img src="/images/home/services/matthew-lancaster-B5KfPvpVe-c-unsplash.jpg" alt="" height="100%" />
                                </div>
                            </a>
                            <div className="service-category">
                                <a href="!!???">Услуги</a>
                            </div>
                            <div className="service-title">
                                <a href="services/personal-lessons.html">Персональные занятия</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Services;