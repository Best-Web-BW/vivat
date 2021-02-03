import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentHeader from "../../components/common/ContentHeader";

export default function AlbumPage() {
    const { id } = useRouter().query;
    const [album, setAlbum] = useState({});

    useEffect(async () => {
        if(id) {
            const album = {};
            setAlbum(album);
        }
    }, [id]);

    console.log(album);

    return (
        <div>
            <ContentHeader
                pages={[["gallery", "Галерея"], [`gallery/${id}`, `Альбом с id = ${id}`]]}
            >
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
                    <h2>Скачки белых лошадей 2020</h2>
                </div>
                <div className="album-container">
                    <div className="album">
                        <div className="album-element">
                            <img src="/images/gallery/album/akshat-vats-l_GAWl6q7LI-unsplash.jpg" alt="" width="100%" />
                        </div>
                        <div className="album-element">
                            <img src="/images/gallery/album/augustine-wong-T0BYurbDK_M-unsplash.jpg" alt="" width="100%" />
                        </div>
                        <div className="album-element">
                            <img src="/images/gallery/album/christine-benton-2dz2-jcfuZY-unsplash.jpg" alt="" width="100%" />
                        </div>
                        <div className="album-element">
                            <img src="/images/gallery/album/elegant-girl-farm-wiith-horse.jpg" alt="" width="100%" />
                        </div>
                        <div className="album-element">
                            <img src="/images/gallery/album/karin-zabret-W7vc1_6dQZE-unsplash.jpg" alt="" width="100%" />
                        </div>
                        <div className="album-element">
                            <img src="/images/gallery/album/kirsten-drew-fQ2n2lRV0dw-unsplash.jpg" alt="" width="100%" />
                        </div>
                        <div className="album-element">
                            <img src="/images/gallery/album/kirsten-drew-fQ2n2lRV0dw-unsplash2.jpg" alt="" width="100%" />
                        </div>
                        <div className="album-element">
                            <img src="/images/gallery/album/marylou-fortier-mjXm9gYP4wE-unsplash.jpg" alt="" width="100%" />
                        </div>
                        <div className="album-element">
                            <img src="/images/gallery/album/olga-thelavart-1nrY9CLAGcI-unsplash.jpg" alt="" width="100%" />
                        </div>
                        <div className="album-element">
                            <img src="/images/gallery/album/yael-gonzalez-8qqHbE8_SmE-unsplash.jpg" alt="" width="100%" />
                        </div>
                        <div className="album-element">
                            <img src="/images/gallery/album/yael-gonzalez-jd9UEc8Sc58-unsplash.jpg" alt="" width="100%" />
                        </div>
                        <div className="album-element">
                            <img src="/images/gallery/album/yael-gonzalez-kr1W1SxjaMA-unsplash.jpg" alt="" width="100%" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-gallery-wrapper">
                <span className="close-modal">x</span>
                <div className="modal-gallery-slider">
                    <div className="modal-gallery-slide">
                        <img src="/images/gallery/album/akshat-vats-l_GAWl6q7LI-unsplash.jpg" alt="" width="100%" />
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