export default function Album() {
    return (
        <div>
            <div className="header-content-wrapper content-block">
                <div className="header-bg"></div>
                <div className="blur-1"></div>
                <div className="blur-2"></div>
                <div className="blur-3"></div>
                <div className="header-title-wrapper">
                    <div className="header-navigation">
                        <a href="/index.html" className="header-link-prev">Главная</a>
                        <a href="/Pages/gallery.html" className="header-link-prev">Галерея</a>
                        <a href="#" className="header-link-current">Скачки белых лошадей 2020</a>
                    </div>
                    <div className="header-title">
                        <h1>Скачки белых лошадей 2020</h1>
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
                    <h2>Скачки белых лошадей 2020</h2>
                </div>
                <div className="albom-container">
                    <div className="albom">
                        <div className="albom-element">
                            <img src="/images/gallery/Albom/akshat-vats-l_GAWl6q7LI-unsplash.jpg" alt="" width="100%" />
                        </div>
                        <div className="albom-element">
                            <img src="/images/gallery/Albom/augustine-wong-T0BYurbDK_M-unsplash.jpg" alt="" width="100%" />
                        </div>
                        <div className="albom-element">
                            <img src="/images/gallery/Albom/christine-benton-2dz2-jcfuZY-unsplash.jpg" alt="" width="100%" />
                        </div>
                        <div className="albom-element">
                            <img src="/images/gallery/Albom/elegant-girl-farm-wiith-horse.jpg" alt="" width="100%" />
                        </div>
                        <div className="albom-element">
                            <img src="/images/gallery/Albom/karin-zabret-W7vc1_6dQZE-unsplash.jpg" alt="" width="100%" />
                        </div>
                        <div className="albom-element">
                            <img src="/images/gallery/Albom/kirsten-drew-fQ2n2lRV0dw-unsplash.jpg" alt="" width="100%" />
                        </div>
                        <div className="albom-element">
                            <img src="/images/gallery/Albom/kirsten-drew-fQ2n2lRV0dw-unsplash2.jpg" alt="" width="100%" />
                        </div>
                        <div className="albom-element">
                            <img src="/images/gallery/Albom/marylou-fortier-mjXm9gYP4wE-unsplash.jpg" alt="" width="100%" />
                        </div>
                        <div className="albom-element">
                            <img src="/images/gallery/Albom/olga-thelavart-1nrY9CLAGcI-unsplash.jpg" alt="" width="100%" />
                        </div>
                        <div className="albom-element">
                            <img src="/images/gallery/Albom/yael-gonzalez-8qqHbE8_SmE-unsplash.jpg" alt="" width="100%" />
                        </div>
                        <div className="albom-element">
                            <img src="/images/gallery/Albom/yael-gonzalez-jd9UEc8Sc58-unsplash.jpg" alt="" width="100%" />
                        </div>
                        <div className="albom-element">
                            <img src="/images/gallery/Albom/yael-gonzalez-kr1W1SxjaMA-unsplash.jpg" alt="" width="100%" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-gallery-wrapper">
                <span className="close-modal">x</span>
                <div className="modal-gallery-slider">
                    <div className="modal-gallery-slide">
                        <img src="/images/gallery/Albom/akshat-vats-l_GAWl6q7LI-unsplash.jpg" alt="" width="100%" />
                    </div>
                    <div className="modal-gallery-navigation">
                        <div className="prev">
                            <span></span>
                        </div>
                        <div className="next">
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}