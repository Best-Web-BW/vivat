import { DefaultErrorModal, SuccessModal, WarningModal } from "../components/common/Modals";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AdminVariableComponent } from "../utils/providers/AuthProvider";
import AlbumListProvider from "../utils/providers/AlbumListProvider";
import ContentHeader from "../components/common/ContentHeader";
import ImageLoader from "../components/common/ImageLoader";
import { reformatDate, sleep } from "../utils/common";
import Router from "next/router";
import Link from "next/link";

function Album({ id, cover, date, title, edit, remove }) {
    return (
        <div className="album-list-element">
            <AdminVariableComponent>
                <div className ="gallery-edit-wrapper">
                    <span className="edit" onClick={() => edit(id)}></span>  
                    <button className="delete" onClick={() => remove(id)}>X</button>
                </div>    
            </AdminVariableComponent>
            <Link href={`/gallery/${id}`}>
                <a className="album-list-link">
                    <img src={cover ? cover.url : ""} alt="" width="100%" />
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

export async function getServerSideProps() {
    const result = { props: { albums: [] } };
    try { result.props.albums = await AlbumListProvider.getAlbumList() }
    catch(e) { console.error(e) }
    finally { return result }
}

export default function Gallery({ albums }) {
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const [successCreateModalOpened, setSuccessCreateModalOpened] = useState(false);
    const [successEditModalOpened, setSuccessEditModalOpened] = useState(false);
    const [successDeleteModalOpened, setSuccessDeleteModalOpened] = useState(false);
    const [defaultErrorModal, setDefaultErrorModal] = useState(false);
    const [errorModal, setErrorModal] = useState(null);

    const processError = useCallback(error => {
        switch(error) {
            case "db_error": return setErrorModal("Ошибка БД, попробуйте позже.");
            case "album_not_exist": return setErrorModal("Такого альбома не существует.");
            case "invalid_request": return setErrorModal("Неправильный запрос.");
            case "no_title": return setErrorModal("Не введено название.");
            case "no_cover": return setErrorModal("Не выбрана обложка.");
            case "no_images": return setErrorModal("Не выбрано ни одного изображения.");
            default: return setDefaultErrorModal(true);
        }
    }, []);

    const [editorConfig, setEditorConfig] = useState({ opened: false, action: "create", data: undefined });
    const switchEditor = (opened, action, data) => setEditorConfig({ opened, action, data })
    const closeEditor = () => setEditorConfig(({ action, data }) => ({ action, data, opened: false }));

    const editAlbum = async id => switchEditor(true, "edit", await AlbumListProvider.getAlbumDetails(id));

    const [removeID, setRemoveID] = useState();
    const prepareToRemove = id => (setRemoveID(id), setDeleteModalOpened(true));
    const removeAlbum = async id => {
        const result = await AlbumListProvider.removeAlbum(id);
        if(result.success) setSuccessDeleteModalOpened(true);
        else processError(result.reason);
        // else switch(result.reason) {
        //     case "db_error": return setErrorModal("Ошибка БД, попробуйте позже.");
        //     case "album_not_exist": return setErrorModal("Такого альбома не существует.");
        //     case "invalid_request": return setErrorModal("Неправильный запрос, возможно ошибка сервера, обратитесь к разработчику.");
        //     default: return setDefaultErrorModal(true);
        // }
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
                        <button className="add-gallery-button" onClick={() => switchEditor(true, "create")}>
                            <p className="add-gallery-button-description">Добавить галерею</p>
                            <p className="add-gallery-button-icon">+</p>
                        </button>
                    </AdminVariableComponent>
                </div>
                <AdminVariableComponent>
                    <AlbumEditor {...editorConfig} close={closeEditor} {...{ setSuccessCreateModalOpened, setSuccessEditModalOpened, processError }} />
                    <SuccessModal
                        close={() => { setSuccessCreateModalOpened(false); sleep(600).then(() => Router.reload()); }}
                        opened={successCreateModalOpened} content="Альбом успешно создан!"
                    />
                    <SuccessModal
                        close={() => { setSuccessEditModalOpened(false); sleep(600).then(() => Router.reload()); }}
                        opened={successEditModalOpened} content="Альбом успешно изменён!"
                    />
                    <SuccessModal
                        close={() => { setSuccessDeleteModalOpened(false); sleep(600).then(() => Router.reload()); }}
                        opened={successDeleteModalOpened} content="Альбом успешно удалён!"
                    />
                    <WarningModal
                        opened={deleteModalOpened} content="Вы уверены, что хотите удалить этот альбом безвозвратно?"
                        submit={() => { removeAlbum(removeID); setDeleteModalOpened(false); }}
                        cancel={() => setDeleteModalOpened(false)}
                    />
                    <ErrorModal opened={errorModal} content={errorModal} close={() => setErrorModal(false)} />
                    <DefaultErrorModal opened={defaultErrorModal} close={() => setDefaultErrorModal(false)} />
                </AdminVariableComponent>
                <div className="album-list-container">
                    { albums.map(album => <Album key={album.id} { ...album } edit={editAlbum} remove={prepareToRemove} />) }
                </div>
            </div>
        </div>
    );
}

export function AlbumEditor({ opened, action, data, close, setSuccessCreateModalOpened, setSuccessEditModalOpened, processError }) {
    const [actionMap] = useState({ "create": ["Создать", () => setAlbum(undefined)], "edit": ["Изменить", data => setAlbum(data)] });
    const [album, setAlbum] = useState();
    const [cover, setCover] = useState();
    const [images, setImages] = useState([]);
    const defaultImages = useMemo(() => album ? album.images : [], [album]);
    const defaultCover = useMemo(() => album ? [album.cover] : [], [album]);
    
    useEffect(() => opened && actionMap[action][1](data), [opened]);

    useEffect(() => setCover(album ? album.cover : undefined), [album]);
    useEffect(() => setImages(album ? album.images : []), [album]);
    
    const titleRef = useRef();

    const crawl = () => ({
        title: titleRef.current.value,
        cover, images
    });

    const validate = data => {
        if(!data.title.length) return { success: 0, error: "no_title" };
        else if(!data.cover) return { success: 0, error: "no_cover" };
        else if(!data.images.length) return { success: 0, error: "no_images" };
        else return { success: 1 };
    };

    const submit = async () => {
        const data = crawl();
        const validated = validate(data);
        if(!validated.success) return processError(validated.error);
        // if(!validated.success) switch (validated.error) {
        //     case "no_title": return alert("Не введено название");
        //     case "no_cover": return alert("Не выбрана обложка альбома");
        //     case "no_images": return alert("Не выбраны фото");
        //     default: return alert("Внутренняя ошибка");
        // }
        return data;
    };

    const createAlbum = async () => {
        const data = await submit();
        if(data) {
            const result = await AlbumListProvider.createAlbum({ ...data, date: new Date().toISOString() });
            console.log(result);
            if(result.success) setSuccessCreateModalOpened(true);
            else processError(result.reason);
            // else switch(result.reason) {
            //     case "db_error": return alert("Ошибка БД, попробуйте позже");
            //     case "album_not_exist": return alert("Такого альбома не существует");
            //     case "invalid_request": return alert("Неправильный запрос");
            //     default: return alert("Внутренная ошибка");
            // }
        }
    };

    const editAlbum = async id => {
        const data = await submit();
        if(data) {
            const result = await AlbumListProvider.editAlbum(id, data);
            if(result.success) setSuccessEditModalOpened(true);
            else processError(result.reason);
            // else switch(result.reason) {
            //     case "db_error": return alert("Ошибка БД, попробуйте позже");
            //     case "album_not_exist": return alert("Такого альбома не существует");
            //     case "invalid_request": return alert("Неправильный запрос");
            //     default: return alert("Внутренная ошибка");
            // }
        }
    };

    return (
        <div className={`add-gallery-modal ${opened && "opened"}`}>
            <div className="add-gallery-modal-content">
                <span className="close-modal" onClick={close}>X</span>
                <h2 onClick={() => console.log(crawl())}>{actionMap[action][0]} альбом</h2>
                <div className="add-gallery-modal-nameinput">
                    <label onClick={() => console.log(validate(crawl()))}>
                        Название
                        <input ref={titleRef} type="text" placeholder="Введите название" defaultValue={album ? album.title : ""} />
                    </label>
                </div>
                <div className="add-gallery-modal-choose-cover-wrapper">
                    <p>Выберите обложку для альбома</p>
                    <ImageLoader isSingle type="gallery" onChange={([cover]) => setCover(cover)} defaultImages={defaultCover} />
                </div>
                <div className="add-gallery-modal-choose-img-wrapper">
                    <p>Выберите фотографии для альбома</p>
                    <ImageLoader type="gallery" onChange={setImages} defaultImages={defaultImages} />
                </div>
                <button className="add-gallery-modal-save-button" onClick={album ? () => editAlbum(album.id) : createAlbum}>Сохранить</button>
            </div>
        </div>
    );
}