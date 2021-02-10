import { useEffect, useState } from "react";
import Link from "next/link";
import ContentHeader from "../components/common/ContentHeader";
import AlbumListProvider from "../utils/providers/AlbumListProvider";
import { AdminVariableComponent } from "../utils/providers/AuthProvider";
import { reformatDate } from "../utils/common";
import ImageUploader from "react-images-upload";

function Album({ id, image, date, title, edit, remove }) {
    return (
        <div className="album-list-element">
            <AdminVariableComponent>
                <div className ="gallery-edit-wrapper">
                    <span className="edit"></span>  
                    <button className="delete">X</button>
                </div>    
            </AdminVariableComponent>
            <Link href={`/gallery/${id}`}>
                <a className="album-list-link">
                    <img src={`/images/gallery/album/webp/${image}.webp`} alt="" width="100%" />
                    <div className="flex-row">
                        <div className="album-list-date">
                            <p>{ reformatDate(date) }</p>
                        </div>
                        <div className="album-list-title">
                            <p>{ title }</p>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    );
}

export default function Gallery() {
    const [albums, setAlbums] = useState([]);

    useEffect(async () => {
        const list = await AlbumListProvider.getAlbumList();
        setAlbums(list);
    }, []);

    
    const [isAlbumEditorOpened, setIsAlbumEditorOpened] = useState(false);
    const [albumEditorAction, setAlbumEditorAction] = useState("create");
    const [albumEditorData, setAlbumEditorData] = useState();
    const switchAlbumEditor = (opened, action, data) => {
        setIsAlbumEditorOpened(opened);
        setAlbumEditorAction(action);
        setAlbumEditorData(data);
    }
    
    const editAlbum = id => {
        const album = albums.find(album => album.id === id);
        switchAlbumEditor(true, "edit", album);
    }

    const removeAlbum = async id => {
        const response = await AlbumListProvider.removeAlbum(id);
        alert(response.success ? "Альбом успешно удалён" : response.reason);
    }

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
                <div className="gallery block-title">
                    <h2>Альбомы</h2>
                    <AdminVariableComponent>
                        <button className="add-gallery-button" onClick={() => switchAlbumEditor(true, "create")}>
                            <p className="add-gallery-button-description">Добавить галерею</p>
                            <p className="add-gallery-button-icon">+</p>
                        </button>
                    </AdminVariableComponent>
                </div>
                <AdminVariableComponent>
                    <AlbumEditor opened={isAlbumEditorOpened} action={albumEditorAction} albumData={albumEditorData} close={() => setIsAlbumEditorOpened(false)} />
                </AdminVariableComponent>
                <div className="album-list-container">
                    { albums.map(album => <Album key={album.id} { ...album } edit={editAlbum} remove={removeAlbum} />) }
                </div>
            </div>
        </div>
    );
}

function ImageContainer({ isMulti, text, defaultImages }) {
    const [pictures, setPictures] = useState([]);
    const [files, setFiles] = useState([]);
    const filterFiles = files => files.filter(file => !(/^data:/.test(file)));

    return (
        <ImageUploader
            withIcon={false}
            withLabel={false}
            withPreview={true}
            singleImage={!isMulti}
            buttonText={text}
            onChange={(pictures, files) => (console.log(pictures, files), setPictures(pictures), setFiles(files))}
            imgExtension={[".jpg", ".jpeg", ".png"]}
            maxFileSize={10485760}
            defaultImages={defaultImages}
        />
    );
}

export function AlbumEditor({ opened, action, albumData, close }) {
    const [actionMap] = useState({ "create": ["Создать", () => setAlbum(undefined)], "edit": ["Изменить", (data) => setAlbum(data)] });
    const [album, setAlbum] = useState();
    
    useEffect(() => opened && actionMap[action][1](albumData), [opened]);

    const crawl = () => console.log("Data crawled");
    const submit = () => console.log("Album " + action);

    return (<>
        <div className={`add-gallery-modal ${opened && "opened"}`}>
            <div className="add-gallery-modal-content">
                <span className="close-modal" onClick={close}>X</span>
                <h2>{actionMap[action][0]} альбом</h2>
                <div className="add-gallery-modal-nameinput">
                    <label>
                        Название
                        <input type="text" placeholder="Введите название" defaultValue={album ? album.title : ""} />
                    </label>
                </div>
                <div className="add-gallery-modal-choose-cover-wrapper">
                    <ImageContainer isMulti={false} text="Выберите обложку альбома" />
                    {/* <div className="add-gallery-modal-preview-cover">
                        <img src="/images/gallery/album/webp/akshat-vats-l_GAWl6q7LI-unsplash.webp" alt="" width="100%" />
                    </div> */}
                    {/* <button className="add-gallery-modal-choose-cover">Выберите обложку альбома</button> */}
                </div>
                <div className="add-gallery-modal-choose-img-wrapper">
                    <ImageContainer isMulti={true} text="Выберите фотографии" defaultImages={["/images/gallery/album/webp/akshat-vats-l_GAWl6q7LI-unsplash.webp"]} />
                    {/* <button className="add-gallery-modal-choose-imgs">Выберите фотографии</button> */}
                    {/* <div className="add-gallery-modal-imgs-list">
                        <ul>
                            <li>
                                <img src="/images/gallery/album/webp/akshat-vats-l_GAWl6q7LI-unsplash.webp" alt="" width="100%"/>
                                <button className="delete">X</button>
                            </li>
                            <li>
                                <img src="/images/gallery/album/webp/akshat-vats-l_GAWl6q7LI-unsplash.webp" alt="" width="100%"/>
                                <button className="delete">X</button>
                            </li>
                        </ul>
                    </div> */}
                </div>
                <button className="add-gallery-modal-save-button" onClick={submit}>Сохранить</button>
            </div>
        </div>
        {/* <div className="edit-gallery-modal">
            <div className="edit-gallery-modal-content">
                <span className="close-modal">X</span>
                <h2>Изменить альбом</h2>
                <div className="edit-gallery-modal-name-wrapper">
                    <label>Название:</label>
                    <input type="text" placeholder="Альбом с лошадьми, красивыми" />
                </div>
                <div className="edit-gallery-modal-imgs-wrapper">
                    <ul>
                        <li>
                            <img src="/images/gallery/album/webp/akshat-vats-l_GAWl6q7LI-unsplash.webp" alt="" width="100%"/>
                            <button className="delete">X</button>
                        </li>
                        <li>
                            <img src="/images/gallery/album/webp/akshat-vats-l_GAWl6q7LI-unsplash.webp" alt="" width="100%"/>
                            <button className="delete">X</button>
                        </li>
                    </ul>
                </div>
                <div className="add-gallery-modal-choose-img-wrapper">
                    <button className="add-gallery-modal-choose-imgs">Выберите фотографии</button>
                </div>
                <button className="edit-gallery-modal-save-button">Сохарнить</button>
            </div>
        </div> */}
        <div className="warning-delete-modal">
            <div className="warning-delete-modal-content">
                <p>Вы уверены, что хотите удалить этот альбом безвовзратно?</p>
                <button className="warning-delete-button">Да</button><button className="warning-delete-button-no">Нет</button>
            </div>
        </div>
        <div className="warning-success-modal">
            <div className="warning-success-modal-content">
                <span className="close-modal">X</span>
                <p>Альбом успешно создан!</p>
                <button className="warrning-success-modal-button">Ок</button>
            </div>
        </div>
        <div className="warning-success-modal">
            <div className="warning-success-modal-content">
                <span className="close-modal">X</span>
                <p>Альбом успешно изменен!</p>
                <button className="warrning-success-modal-button">Ок</button>
            </div>
        </div>
    </>);
}