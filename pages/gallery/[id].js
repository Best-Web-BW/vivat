import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentHeader from "../../components/common/ContentHeader";
import AlbumListProvider from "../../utils/providers/AlbumListProvider";
import ModalImageSlider from "../../components/sliders/ModalImageSlider";

function Image({ index, image, openSlider }) {
    return (
        <div className="album-element" onClick={() => openSlider(index)}>
            <img src={image.url} alt="" width="100%" />
        </div>
    );
}

function Album({ images, openSlider }) {
    return (
        <div className="album">
            { images ? images.map((image, index) => <Image key={index} index={index} image={image} openSlider={openSlider} />) : [] }
        </div>
    );
}

export default function AlbumPage() {
    const { id } = useRouter().query;
    const [album, setAlbum] = useState({ });
    const [isSliderOpened, setIsSliderOpened] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(async () => {
        if(id) {
            const album = await AlbumListProvider.getAlbumDetails(+id);
            setAlbum(album);
        }
    }, [id]);

    return (
        <div>
            <ContentHeader pages={[["gallery", "Галерея"], [`gallery/${id}`, album.title]]}>
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
                    <h2>{ album.title }</h2>
                </div>
                <div className="album-container">
                    <Album images={album.images} openSlider={(index) => { setActiveSlide(index); setIsSliderOpened(true); }} />
                </div>
            </div>
            <ModalImageSlider
                images={album.images}
                active={activeSlide}
                opened={isSliderOpened}
                switchSlide={setActiveSlide}
                closeSlider={() => setIsSliderOpened(false)}
            />
        </div>
    );
}