import ContentHeader from "../components/common/ContentHeader";

export default function About() {
    return (
        <div>
            <ContentHeader class="about" address="about" title="О нас">
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