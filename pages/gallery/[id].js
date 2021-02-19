import { useMemo, useState } from "react";
import ContentHeader from "../../components/common/ContentHeader";
import AlbumListProvider from "../../utils/providers/AlbumListProvider";
import ModalImageSlider from "../../components/sliders/ModalImageSlider";

export default function AlbumPage({ album: { id, title, images, desc, tags, category } }) {
    const [active, switchSlide] = useState(0);
    const [opened, setOpened] = useState(false);
    const description = useMemo(() => `${desc.substring(0, 140)}`, [desc]);
    const keywords = useMemo(() => [...tags, category, "альбом", "галерея", "кск", "Виват", "Россия"].join(", "), [tags, category]);

    return (
        <>
            <ContentHeader pages={[["gallery", "Галерея"], [`gallery/${id}`, title]]} {...{ description, keywords }}>
                <p>{ desc }</p>
            </ContentHeader>
            <div className="gallery-content-wrapper content-block">
                <div className="block-title">
                    <h2>{ title }</h2>
                </div>
                <div className="album-container">
                    <div className="album">
                    {
                        images.map(({ url }, index) => (
                            <div key={index} className="album-element" onClick={() => { switchSlide(index); setOpened(true) }}>
                                <img src={url} alt="" width="100%" />
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
            <ModalImageSlider {...{ switchSlide, images, active, opened }} closeSlider={() => setOpened(false)} />
        </>
    );
}

export async function getServerSideProps({ query: { id } }) {
    const result = { props: { album: { } } };
    try { result.props.album = await AlbumListProvider.getAlbumDetails(+id) }
    catch(e) { console.error(e) }
    finally { return result }
}