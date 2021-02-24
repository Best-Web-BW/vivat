import ModalImageSlider from "../../components/sliders/ModalImageSlider";
import ContentHeader from "../../components/common/ContentHeader";
import SSRProvider from "../../utils/providers/SSRProvider";
import { removeTagsFromText } from "../../utils/common";
import { useMemo, useState } from "react";

export default function AlbumPage({ album: { id, title, images, desc, tags, category } }) {
    const [active, switchSlide] = useState(0);
    const [opened, setOpened] = useState(false);
    const open = index => { switchSlide(index); setOpened(true); };
    const description = useMemo(() => removeTagsFromText(desc), [desc]);
    const keywords = useMemo(() => [...tags, category, "альбом", "галерея", "кск", "Виват", "Россия"], [tags, category]);

    return (<>
        <ContentHeader pages={[["gallery", "Галерея"], [`gallery/${id}`, title]]} {...{ description, keywords }}>
            { desc }
        </ContentHeader>
        <div className="gallery-content-wrapper content-block">
            <div className="block-title">
                <h2>{ title }</h2>
            </div>
            <div className="album-container">
                <div className="album">
                {
                    images.map(({ url }, index) => (
                        <div key={index} className="album-element" onClick={() => open(index)}>
                            <img src={url} alt="" width="100%" />
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
        <ModalImageSlider {...{ switchSlide, images, active, opened }} closeSlider={() => setOpened(false)} />
    </>);
}

export const getServerSideProps = async ({ query: { id } }) => ({ props: { album: await SSRProvider.getAlbumDetails(+id) } });

// export async function get_ServerSideProps({ query: { id } }) {
//     const result = { props: { album: { id: 0, title: "", images: [], desc: "", tags: [], category: ""} } };
//     try { result.props.album = await SSRProvider.getAlbumDetails(+id) }
//     catch(e) { console.error(e) }
//     finally { return result }
// }