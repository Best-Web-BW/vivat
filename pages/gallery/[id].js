import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentHeader from "../../components/common/ContentHeader";
import AlbumListProvider from "../../utils/providers/AlbumListProvider";
import ModalImageSlider from "../../components/sliders/ModalImageSlider";

function Image({ index, image, openSlider }) {
    return (
        <div className="album-element" onClick={() => openSlider(index)}>
            <img src={`/images/gallery/album/webp/${image}.webp`} alt="" width="100%" />
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
                <p>{ album.desc }</p>
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