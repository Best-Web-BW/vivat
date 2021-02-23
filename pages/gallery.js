import { DefaultErrorModal, ErrorModal, SuccessModal, WarningModal } from "../components/common/Modals";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AlbumListProvider from "../utils/providers/AlbumListProvider";
import ContentHeader from "../components/common/ContentHeader";
import { ForAdmin } from "../utils/providers/AuthProvider";
import ImageLoader from "../components/common/ImageLoader";
import DBProvider from "../utils/providers/DBProvider";
import { toRuDate, sleep } from "../utils/common";
import Router from "next/router";
import Link from "next/link";

const DO_LOG = false;

function Album({ id, cover, cdate, title, edit, remove }) {
    return (
        <div className="album-list-element">
            <ForAdmin>
                <div className ="gallery-edit-wrapper">
                    <span className="edit" onClick={() => edit(id)}></span>  
                    <button className="delete" onClick={() => remove(id)}>X</button>
                </div>    
            </ForAdmin>
            <Link href={`/gallery/${id}`}>
                <a className="album-list-link">
                    <img src={cover ? cover.url : ""} alt="" width="100%" />
                    <div className="flex-row">
                        <div className="album-list-date">
                            <p>{ toRuDate(cdate) }</p>
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
    try { result.props.albums = await DBProvider.getAlbumList() }
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
            case "no_desc": return setErrorModal("Не введено описание.");
            case "no_cover": return setErrorModal("Не выбрана обложка.");
            case "no_images": return setErrorModal("Не выбрано ни одного изображения.");
            case "no_category": return setErrorModal("Не выбрана категория.");
            case "no_tags": return setErrorModal("Не выбрано ни одного тега.");
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
    }

    return (
        <div>
            <ContentHeader wrapperClass="gallery" pages={[["gallery", "Галерея"]]}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illo id beatae dolores recusandae
                et repellat ratione! Culpa accusamus consequatur quae ipsam quidem, reiciendis distinctio
                ratione aut dolore praesentium omnis quis nam modi ea architecto eveniet sunt exercitationem,
                totam quas aperiam cupiditate harum vero ex nihil. Aut nisi adipisci amet fugit, aliquid vel
                temporibus quos id provident, esse illo explicabo animi inventore at numquam? Accusantium ab
                dolor odit repudiandae possimus tempora eveniet autem, reprehenderit voluptatum consectetur nemo
                ipsam nesciunt consequuntur sequi fuga odio voluptatem, natus pariatur ullam temporibus sint
                rerum consequatur. Quibusdam quod sapiente debitis nulla, ad omnis ratione minima.
            </ContentHeader>
            <div className="gallery-content-wrapper content-block">
                <div className="gallery block-title">
                    <h2>Альбомы</h2>
                    <ForAdmin>
                        <button className="add-gallery-button" onClick={() => switchEditor(true, "create")}>
                            <p className="add-gallery-button-description">Добавить галерею</p>
                            <p className="add-gallery-button-icon">+</p>
                        </button>
                    </ForAdmin>
                </div>
                <ForAdmin>
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
                </ForAdmin>
                <div className="album-list-container">
                    { albums.map(album => <Album key={album.id} { ...album } edit={editAlbum} remove={prepareToRemove} />) }
                </div>
            </div>
        </div>
    );
}

export function AlbumEditor(props) {
    const [imported, setImported] = useState();
    useEffect(async () => {
        const Select = (await import("react-select/creatable")).default;
        const animatedComponents = ((await import("react-select/animated")).default)();
        setImported({ Select, animatedComponents });
    }, []);

    return imported ? <RawAlbumEditor {...imported} {...props} /> : null;
}

function RawAlbumEditor({ Select, animatedComponents, opened, action, data, close, setSuccessCreateModalOpened, setSuccessEditModalOpened, processError }) {
    const [actionMap] = useState({ "create": ["Создать", () => setAlbum(undefined)], "edit": ["Изменить", data => setAlbum(data)] });
    const [album, setAlbum] = useState();
    const [cover, setCover] = useState();
    const [images, setImages] = useState([]);
    const defaultImages = useMemo(() => album ? album.images : [], [album]);
    const defaultCover = useMemo(() => album ? [album.cover] : [], [album]);
    
    useEffect(() => opened && actionMap[action][1](data), [opened]);

    useEffect(() => setCover(album ? album.cover : undefined), [album]);
    useEffect(() => setImages(album ? album.images : []), [album]);
    
    const addCategoryInputRef = useRef();
    const [editorCategories, setEditorCategories] = useState([]);
    
    const addTagInputRef = useRef();
    const [editorTags, setEditorTags] = useState([]);
    const updateEditorTags = tags => setEditorTags([...new Set(tags)]);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const updateSelectedTags = tags => setSelectedTags([...new Set(tags)]);

    useEffect(() => titleRef.current.value = album?.title ?? "", [album]);
    useEffect(() => descRef.current.value = album?.desc ?? "", [album]);
    useEffect(() => setSelectedCategory(album?.category ?? null), [album]);
    useEffect(() => setSelectedTags(album?.tags ?? []), [album]);
    useEffect(async () => {
        const { tags, categories } = await DBProvider.getAlbumStats();
        setEditorTags(tags);
        setEditorCategories(categories);
    }, []);
    
    const titleRef = useRef();
    const descRef = useRef();

    const crawl = () => ({
        title: titleRef.current.value,
        desc: descRef.current.value,
        cover, images,
        category: selectedCategory,
        tags: selectedTags
    });
    
    const validate = ({ title, desc, cover, images, category, tags }) => {
        if(!title.length) return { success: 0, error: "no_title" };
        else if(!desc.length) return { success: 0, error: "no_desc" };
        else if(!cover) return { success: 0, error: "no_cover" };
        else if(!images.length) return { success: 0, error: "no_images" };
        else if (!(category && category.length)) return { success: 0, error: "no_category" };
        else if (!tags.length) return { success: 0, error: "no_tags" };
        else return { success: 1 };
    };

    const submit = async () => {
        const data = crawl();
        const validated = validate(data);
        if(!validated.success) return processError(validated.error);
        return data;
    };

    const createAlbum = async () => {
        const data = await submit();
        if(data) {
            const currentDate = new Date().toISOString();
            const result = await AlbumListProvider.createAlbum({ ...data, cdate: currentDate, mdate: currentDate });
            DO_LOG && console.log(result);
            if(result.success) setSuccessCreateModalOpened(true);
            else processError(result.reason);
        }
    };

    const editAlbum = async id => {
        const data = await submit();
        if(data) {
            const result = await AlbumListProvider.editAlbum(id, { ...data, mdate: new Date().toISOString() });
            if(result.success) setSuccessEditModalOpened(true);
            else processError(result.reason);
        }
    };

    return (
        <div className={`add-gallery-modal ${opened && "opened"}`}>
            <div className="add-gallery-modal-content">
                <span className="close-modal" onClick={close}>X</span>
                <h2 onClick={() => DO_LOG && console.log(crawl())}>{actionMap[action][0]} альбом</h2>
                <div className="add-gallery-modal-nameinput">
                    <label>
                        Название
                        <input ref={titleRef} type="text" placeholder="Введите название" />
                    </label>
                </div>
                <div className="add-gallery-modal-description-input">
                    <label onClick={() => DO_LOG && console.log(validate(crawl()))}>
                        Введите описание
                        <textarea ref={descRef} type="text" placeholder="Введите описание" />
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
                <div className="col-1-3">
                    <p>Выберите категорию</p>
                    <Select
                        theme={theme => ({ ...theme, borderRadius: 0, colors: { ...theme.colors, primary: "" } })}
                        options={editorCategories.map(category => ({ value: category, label: category }))}
                        value={selectedCategory && { value: selectedCategory, label: selectedCategory }}
                        onChange={option => setSelectedCategory(option?.value ?? "")}
                        placeholder="Выберите из списка"
                        // formatGroupLabel={formatGroupLabel} ----- HERE IS YOUR PART -----
                        menuPlacement="top"
                        isClearable
                    />
                    <div className="add-article-add-new-category"> 
                        <input ref={addCategoryInputRef} type="text" placeholder="Добавить категорию"/>
                        <button
                            className="add-article-add-new-category-button"
                            onClick={() => {
                                const category = addCategoryInputRef.current.value;
                                if(category.length) {
                                    setEditorCategories(prev => [...prev, category]);
                                    setSelectedCategory(category);
                                }
                                addCategoryInputRef.current.value = "";
                            }}
                        >Добавить</button>
                    </div>
                </div>
                <div className="col-1-3">
                    <p>Выберите ключевые слова</p>
                    <Select 
                        theme={theme => ({ ...theme, borderRadius: 0, colors: { ...theme.colors, primary: "" } })}
                        onChange={tags => updateSelectedTags(tags.map(({ value }) => value))}
                        value={selectedTags.map(tag => ({ value: tag, label: tag }))}
                        options={editorTags.map(tag => ({ value: tag, label: tag }))}
                        placeholder="Выберите из списка или создайте новый"
                        components={animatedComponents}
                        closeMenuOnSelect={false}
                        menuPlacement="top"
                        isClearable
                        isMulti
                    />
                    <div className="add-article-add-new-keyword"> 
                        <input ref={addTagInputRef} type="text" placeholder="Добавить ключевое слово"/>
                        <button
                            className="add-article-add-new-keyword-button"
                            onClick={() => {
                                const tag = addTagInputRef.current.value;
                                if(tag.length) {
                                    updateEditorTags([...editorTags, tag]);
                                    setSelectedTags(prev => [...prev, tag]);
                                }
                                addTagInputRef.current.value = "";
                            }}
                        >Добавить</button>
                    </div>
                </div>
                <div className="col-1-3">
                    <div className="col-1-2" style={{"display" : "none"}}>
                        <div className="add-article-choose-visibility">
                            <p>Видимость</p>
                            {/* <label>
                                Видимый&nbsp;
                                <input name="visibility" type="radio" />
                            </label>
                            <label>
                                <input name="visibility" type="radio" />
                                &nbsp;Скрытый
                            </label> */}
                            {/* <label htmlFor="chooseVisibility-yes">Видимый</label>
                            <input type="radio" name="chooseVisibility" id="chooseVisibility-yes"/>
                            <input type="radio" name="chooseVisibility" id="chooseVisibility-no"/>
                            <label htmlFor="chooseVisibility-no">Скрытый</label> */}
                        </div>
                    </div>
                </div>
                <div className="col-1-2">
                    <button className="add-gallery-modal-save-button" onClick={album ? () => editAlbum(album.id) : createAlbum}>Сохранить</button>
                </div>
            </div>
        </div>
    );
}