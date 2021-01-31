import ContentHeader from "../components/common/ContentHeader";

export default function Services() {
    return (
        <div>
            <ContentHeader class="services" address="services" title="Аренда и услуги">
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