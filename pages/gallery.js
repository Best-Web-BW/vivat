import ContentHeader from "../components/common/ContentHeader";

export default function Gallery() {
    return (
        <div>
            <ContentHeader class="gallery" pages={[["gallery", "Галерея"]]}>
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
            <div className="gallery-content-wrapper content-block">
                <div className="block-title">
                    <h2>Альбомы</h2>
                </div>
                <div className="album-list-container">
                    <a href="/Pages/albums/album-page.html" className="album-list-element">
                        <img src="/images/gallery/yael-gonzalez-8qqHbE8_SmE-unsplash.jpg" alt="" width="100%" />
                        <div className="flex-row">
                            <div className="album-list-date">
                                <p>03.10.2020</p>
                            </div>
                            <div className="album-list-title">
                                <p>Скачки белых лошадей 2020</p>
                            </div>
                        </div>
                    </a>
                    <a href="/Pages/albums/album-page.html" className="album-list-element">
                        <img src="/images/gallery/yael-gonzalez-8qqHbE8_SmE-unsplash.jpg" alt="" width="100%" />
                        <div className="flex-row">
                            <div className="album-list-date">
                                <p>03.10.2020</p>
                            </div>
                            <div className="album-list-title">
                                <p>Скачки белых лошадей 2020</p>
                            </div>
                        </div>
                    </a>
                    <a href="/Pages/albums/album-page.html" className="album-list-element">
                        <img src="/images/gallery/yael-gonzalez-8qqHbE8_SmE-unsplash.jpg" alt="" width="100%" />
                        <div className="flex-row">
                            <div className="album-list-date">
                                <p>03.10.2020</p>
                            </div>
                            <div className="album-list-title">
                                <p>Скачки белых лошадей 2020</p>
                            </div>
                        </div>
                    </a>
                    <a href="/Pages/albums/album-page.html" className="album-list-element">
                        <img src="/images/gallery/yael-gonzalez-8qqHbE8_SmE-unsplash.jpg" alt="" width="100%" />
                        <div className="flex-row">
                            <div className="album-list-date">
                                <p>03.10.2020</p>
                            </div>
                            <div className="album-list-title">
                                <p>Скачки белых лошадей 2020</p>
                            </div>
                        </div>
                    </a>
                    <a href="/Pages/albums/album-page.html" className="album-list-element">
                        <img src="/images/gallery/yael-gonzalez-8qqHbE8_SmE-unsplash.jpg" alt="" width="100%" />
                        <div className="flex-row">
                            <div className="album-list-date">
                                <p>03.10.2020</p>
                            </div>
                            <div className="album-list-title">
                                <p>Скачки белых лошадей 2020</p>
                            </div>
                        </div>
                    </a>
                    <a href="/Pages/albums/album-page.html" className="album-list-element">
                        <img src="/images/gallery/yael-gonzalez-8qqHbE8_SmE-unsplash.jpg" alt="" width="100%" />
                        <div className="flex-row">
                            <div className="album-list-date">
                                <p>03.10.2020</p>
                            </div>
                            <div className="album-list-title">
                                <p>Скачки белых лошадей 2020</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}