import { useEffect, useState } from "react";
import ContentHeader from "../components/common/ContentHeader";
import AlbumListProvider from "../components/providers/AlbumListProvider";
import Link from "next/link";

function Album({ id, image, date, title }) {
    return (
        <Link href={`/gallery/${id}`}>
            <a className="album-list-element">
                <img src={`/images/gallery/album/${image}.jpg`} alt="" width="100%" />
                <div className="flex-row">
                    <div className="album-list-date">
                        <p>{ global.reformatDate(date) }</p>
                    </div>
                    <div className="album-list-title">
                        <p>{ title }</p>
                    </div>
                </div>
            </a>
        </Link>
    );
}

export default function Gallery() {
    const [albums, setAlbums] = useState([]);

    useEffect(async () => {
        const list = await AlbumListProvider.getAlbumList();
        setAlbums(list);
    }, []);

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
                    { albums.map(album => <Album key={album.id} { ...album } />) }
                </div>
            </div>
        </div>
    );
}