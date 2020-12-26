import React from "react";
import { Link } from "react-router-dom";
// import Translator from "../../Translator";
// import ContentHeader from "../../ContentHeader";

// let translator = new Translator({ ru: {}, en: {} });

class About extends React.Component {
    render() {
        return (
            <div>
                <div className="header-content-wrapper about content-block">
                    <div className="header-bg" />
                    <div className="blur-1" />
                    <div className="blur-2" />
                    <div className="blur-3" />
                    <div className="header-title-wrapper">
                        <div className="header-navigation">
                            <Link to="/home" className="header-link-prev">Главная</Link>
                            <Link to="/about" className="header-link-current">О нас</Link>
                        </div>
                        <div className="header-title">
                            <h1>О нас</h1>
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
                            <p className="page-title-2">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet non esse est suscipit ipsa a
                                provident officia aliquam eligendi ab perferendis omnis, consequuntur debitis ullam nisi,
                                voluptas id totam exercitationem inventore et natus quod quis. Illum quia repudiandae quasi vero
                                libero necessitatibus incidunt quae nemo iste, dolorum officia architecto culpa voluptatibus
                                perspiciatis cum corporis doloribus ratione ea laboriosam quas voluptas molestias ut. Minima
                                veniam corporis, labore cupiditate nobis repellendus veritatis et, dolorem suscipit mollitia non
                                deleniti ullam consequuntur expedita placeat id aut quis sapiente eveniet excepturi! Corrupti,
                                labore. Perferendis facere a molestias molestiae incidunt quae harum omnis maxime natus
                                necessitatibus.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="about-slider-wrapper content-block">
                    <div className="about-slider-container">
                        <div className="about-slide">
                            <img src="/images/about/slider/philippe-oursel-8jFnojODWjc-unsplash.jpg" alt="" width="100%" />
                        </div>
                        <div className="dots-container">
                            <div className="dot active" />
                            <div className="dot" />
                            <div className="dot" />
                            <div className="dot" />
                            <div className="dot" />
                        </div>
                        <div className="alt-text-container">
                            <p className="alt-p">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere quisquam, quasi distinctio
                                alias nisi corrupti at ratione, delectus aut minima ducimus iusto repellat sed nam facilis vitae
                                possimus sapiente vero magni laboriosam officia perferendis. Minus officia libero modi ipsa illo
                                cupiditate quae nam dolorem porro sint, iusto saepe facere velit. Sequi itaque sint voluptates
                                minima ipsam quas quidem tempore culpa odio, nulla, ad, accusamus quod asperiores excepturi
                                repellat laboriosam eveniet laudantium eum! Eius nam, neque consequatur quibusdam officiis
                                beatae tempora illum vel voluptatum, architecto omnis sequi repudiandae? Nemo porro obcaecati,
                                quos esse placeat distinctio laboriosam aspernatur exercitationem numquam, aut fuga?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;