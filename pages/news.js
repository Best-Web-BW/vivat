import Router, { useRouter } from "next/router"
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import Select from "react-select";
import ContentHeader from "../components/common/ContentHeader";
import DBProvider from "../utils/providers/DBProvider";
import PostListProvider from "../utils/providers/PostListProvider";
import { AdminVariableComponent } from "../utils/providers/AuthProvider";
import TextEditor from "../components/common/TextEditor";
import { DefaultErrorModal, ErrorModal, SuccessModal, WarningModal } from "../components/common/Modals";
import { sleep } from "../utils/common";
// import { css, cx } from "@emotion/css"

const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
};

const groupBadgeStyles = {
    backgroundColor: "#EBECF0",
    borderRadius: "2em",
    color: "#172B4D",
    display: "inline-block",
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: "1",
    minWidth: 1,
    padding: "0.16666666666667em 0.5em",
    textAlign: "center"
};
  
const formatGroupLabel = data => (
    <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
);

export function Tag({ name }) {
    return (
        <Link href={`/news?tags=${name}`}>
            <a className="blog-page-keywords">{ name }</a>
        </Link>
    );
}

function Post({ id, title, image, contents, tags, edit, remove }) {
    const _contents = useMemo(() => contents.replaceAll(/<div class="se-component se-image-container.+?\/div>/gi, "").replaceAll("script", "sсrірt"), []);
    const [opened, setOpened] = useState(false);
    const narrow = () => setOpened(false);
    const expand = () => setOpened(true);

    return (
        <div className="blog-card">
            <AdminVariableComponent>
                <div className ="article-edit-wrapper">
                    <span className="edit" onClick={() => edit(id)}></span>
                    <button className="delete" onClick={() => remove(id)}>X</button>
                </div>
            </AdminVariableComponent>
            <div className="blog-img">
                { image && <img src={`${image}`} alt="" width="100%" /> }
            </div>
            <div className="blog-card-content" style={{ height: opened ? "max-content" : "40vh" }}>
                <h2 className="blog-card-title">{ title }</h2>
                <article className="blog-card-content-article" dangerouslySetInnerHTML={{ __html: _contents }} />
            </div>
            <div className="blog-card-footer">
                <div className="blog-card-keywords-wrapper">
                    { tags && tags.map((tag, index) => <Tag key={index} name={tag} />) }
                </div>
                <div className="blog-card-button-wrapper">
                    <button className="hide-blog" onClick={narrow} style={{ display: opened ? "block" : "none" }}>Скрыть</button>
                    <button className="read-more" onClick={expand} style={{ display: opened ? "none" : "block" }}>Показать полностью</button>
                    <button className="read">
                        <Link href={`/news/${id}`}>
                            <a>Читать далее</a>
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

function CategoryButton({ text, count, turn, defaultActive }) {
    const [active, setActive] = useState(defaultActive);
    const toggle = () => setActive(prev => (turn(!prev, text), !prev));

    return (
        <button className={`blog-categories-button ${active && "active"}`} onClick={toggle}>
            { text }&nbsp;(<span className="news-count">{ count }</span>)
        </button>
    );
}

function TagButton({ text, turn, defaultActive }) {
    const [active, setActive] = useState(defaultActive);
    const toggle = () => setActive(prev => (turn(!prev, text), !prev));

    return <span className={`blog-keywords-button ${active && "active"}`} onClick={toggle}>{ text }</span>;
}

const parseURL = (raw, defaultValue) => {
    try { return raw.split(","); }
    catch(e) { return defaultValue; }
};

const stringifyURL = raw => {
    try { return raw.join(","); }
    catch(e) { return raw; }
};

const switchInArray = (array, state, value) => {
    const newArray = array.filter(entry => entry !== value);
    return state ? [...newArray, value] : newArray;
};

const getPostsByParams = async (categories, tags, search) => await PostListProvider.getPostList(categories, tags, search);

export default function News({ query: { categories: _categories, tags: _tags, search: _search } }) {
    const searchRef = useRef();
    const [posts, setPosts] = useState([]);
    
    const updateQueryParams = params => updateQuery({ categories, tags, search, ...params });

    const [categories, setCategories] = useState([]);
    const updateCategory = (state, name) => updateQueryParams({ categories: switchInArray(categories, state, name) });

    const [tags, setTags] = useState([]);
    const updateTag = (state, name) => updateQueryParams({ tags: switchInArray(tags, state, name) });

    const [search, setSearch] = useState("");
    const updateSearch = (search) => updateQueryParams({ search });
    
    const updateQuery = ({ categories, tags, search }) => {
        const query = {};
        if(categories && categories.length) query.categories = stringifyURL(categories);
        if(tags && tags.length) query.tags = stringifyURL(tags);
        if(search && search.length > 3) query.search = search;

        Router.push({ pathname: "/news", query }, undefined, { shallow: true });
    };
    
    const setStateFromURL = ({ categories, tags, search }) => {
        setCategories(parseURL(categories, []));
        setTags(parseURL(tags, []));
        setSearch(search ?? "");
        searchRef.current.value = search ?? "";
    }
    
    const router = useRouter();
    useEffect(() => setStateFromURL(router.query), [_categories, _tags, _search, router.query]);

    useEffect(async () => setPosts(await getPostsByParams(categories, tags, search)), [categories, tags, search]);

    const [uniqueTags, setUniqueTags] = useState([]);
    const [counts, setCounts] = useState([]);
    useEffect(async () => {
        const { tags, counts } = await DBProvider.getPostStats();
        setUniqueTags(tags);
        setCounts(Object.entries(counts));
    }, []);
    
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const [successCreateModalOpened, setSuccessCreateModalOpened] = useState(false);
    const [successEditModalOpened, setSuccessEditModalOpened] = useState(false);
    const [successDeleteModalOpened, setSuccessDeleteModalOpened] = useState(false);
    const [defaultErrorModal, setDefaultErrorModal] = useState(false);
    const [errorModal, setErrorModal] = useState(null);

    const processError = useCallback(error => {
        switch(error) {
            case "db_error": return setErrorModal("Ошибка БД, попробуйте позже.");
            case "post_not_exist": return setErrorModal("Такой статьи не существует.");
            case "invalid_request": return setErrorModal("Неправильный запрос.");
            case "no_tags": return setErrorModal("Не выбрано ни одного тега.");
            case "no_category": return setErrorModal("Не выбрана категория.");
            case "no_title": return setErrorModal("Не введено название.");
            case "no_contents": return setErrorModal("Не введён текст.");
            default: return setDefaultErrorModal(true);
        }
    }, []);

    const [editorConfig, setEditorConfig] = useState({
        opened: false,
        action: "create",
        data: undefined
    });
    const switchEditor = (opened, action, data) => setEditorConfig({ opened, action, data })
    const closeEditor = () => setEditorConfig(({ action, data }) => ({ action, data, opened: false }));

    const editPost = id => {
        const p = posts.find(post => post.id === id);
        console.log(id, p);
        switchEditor(true, "edit", p);
    }

    const [removeID, setRemoveID] = useState();
    const prepareToRemove = id => (setRemoveID(id), setDeleteModalOpened(true));
    const removePost = async id => {
        const result = await PostListProvider.removePost(id);
        if(result.success) setSuccessDeleteModalOpened(true);
        else processError(result.reason);
    }
    
    return (
        <div>
            <ContentHeader class="news" pages={[["news", "Новости"]]}>
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
            <div className="blog-content content-block">
                <div className="modile-blog-menu">
                    <div className="mobile-blog-menu-wrapper">
                        <div className="mobile-nav-button">
                            <img src="/images/news/button.png" alt="" width="100%" /> 
                        </div>
                    </div>
                </div>
                <div className="left-column">
                    { posts.map(post => <Post key={post.id} { ...post } edit={editPost} remove={prepareToRemove} />) }
                </div>
                <div className="right-column">
                    <div className="blog-menu-wrapper">
                        <div className="blog-menu-section">
                            <div className="blog-form-search">
                                <div className="blog-search-input-container">
                                    <input ref={searchRef} type="text" className="blog-search" placeholder="Поиск" />
                                </div>
                                <button className="blog-search-button" onClick={() => updateSearch(searchRef.current.value)}>Поиск</button>
                            </div>
                        </div>
                        <div className="blog-menu-section">
                            <div className="blog-categories-wrapper">
                                <h2>Категории</h2>
                                { counts.map(([text, count]) => <CategoryButton key={text} text={text} count={count} turn={updateCategory} defaultActive={categories.includes(text)} />) }
                            </div>
                        </div>
                        <div className="blog-menu-section">
                            <div className="blog-keywords-wrapper">
                                <div className="flex wrap">
                                    { uniqueTags.map(tag => <TagButton key={tag} text={tag} turn={updateTag} defaultActive={tags.includes(tag)} />) }
                                </div>
                            </div>
                        </div>
                        <AdminVariableComponent>
                            <div className="blog-menu-section admin">
                                <button className="blog-menu-section-add-article-button" onClick={() => switchEditor(true, "create")}>Создать новость</button>
                            </div>
                        </AdminVariableComponent>
                    </div>
                </div>
                <AdminVariableComponent>
                    <PostEditor tags={uniqueTags} categories={counts} {...editorConfig} close={() => closeEditor(false)} {...{ setSuccessCreateModalOpened, setSuccessEditModalOpened, processError }} />
                    <SuccessModal
                        close={() => { setSuccessCreateModalOpened(false); sleep(600).then(() => Router.reload()); }}
                        opened={successCreateModalOpened} content="Статья успешно создана!"
                    />
                    <SuccessModal
                        close={() => { setSuccessEditModalOpened(false); sleep(600).then(() => Router.reload()); }}
                        opened={successEditModalOpened} content="Статья успешно изменена!"
                    />
                    <SuccessModal
                        close={() => { setSuccessDeleteModalOpened(false); sleep(600).then(() => Router.reload()); }}
                        opened={successDeleteModalOpened} content="Статья успешно удалена!"
                    />
                    <WarningModal
                        opened={deleteModalOpened} content="Вы уверены, что хотите удалить эту статью безвозвратно?"
                        submit={() => { removePost(removeID); setDeleteModalOpened(false); }}
                        cancel={() => setDeleteModalOpened(false)}
                    />
                    <ErrorModal opened={errorModal} content={errorModal} close={() => setErrorModal(false)} />
                    <DefaultErrorModal opened={defaultErrorModal} close={() => setDefaultErrorModal(false)} />
                </AdminVariableComponent>
            </div>
        </div>
    );
}

News.getInitialProps = ({ query }) => ({ query });
// export async function getServerSideProps({ query: { categories, tags, search } }) {
//     const result = { props: { originalPosts: [], uniqueTags: [], uniqueCategories: [] } };
//     try {
//         const [originalPosts, { tags: uniqueTags, counts }] = await Promise.all([
//             getPostsByParams(categories, tags, search),
//             DBProvider.getPostStats()
//         ]);
//         result.props = { originalPosts, uniqueTags, uniqueCategories: Object.entries(counts) };
//     } catch(e) { console.error(e) }
//     finally { return result }
// }

export function PostEditor(props) {
    const [imported, setImported] = useState();
    useEffect(async () => {
        const CreatableSelect = (await import("react-select/creatable")).default;
        const animatedComponents = ((await import("react-select/animated")).default)();
        setImported({ CreatableSelect, animatedComponents });
    }, []);

    return imported ? <RawPostEditor {...imported} {...props} /> : null;
}

function RawPostEditor({ CreatableSelect, animatedComponents, opened, action, data, close, categories, tags, setSuccessCreateModalOpened, setSuccessEditModalOpened, processError }) {
    const [actionMap] = useState({ "create": ["Создать", () => setPost(undefined)], "edit": ["Изменить", data => setPost(data)] });
    const [post, setPost] = useState();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const updateTags = tags => setSelectedTags([... new Set(tags)]);
    
    useEffect(() => opened && actionMap[action][1](data), [opened]);
    
    useEffect(() => { setSelectedCategory(post?.category ?? ""); setSelectedTags(post?.tags ?? []); }, [post]);
    
    const titleRef = useRef();
    const textEditorRef = useRef();
    
    const defaultValue = useMemo(() => post ? post.contents.replace(/script/gi, "sсrірt") : "", [post]);
    useEffect(() => textEditorRef.current?.editor.setContents(defaultValue), [post]);

    const crawl = () => ({
        title: titleRef.current.value,
        contents: textEditorRef.current.editor.getContents(),
        category: selectedCategory,
        tags: selectedTags
    });

    const validate = data => {
        if(data.contents.length <= 11) return { success: 0, error: "no_contents" };
        else if(!data.category.length) return { success: 0, error: "no_category" };
        else if(!data.title.length) return { success: 0, error: "no_title" };
        else if(!data.tags.length) return { success: 0, error: "no_tags" };
        else return { success: 1 };
    };

    const submit = async () => {
        const data = crawl();
        const validated = validate(data);
        if(!validated.success) return processError(validated.error);
        return data;
    };

    const createPost = async () => {
        const data = await submit();
        if(data) {
            const result = await PostListProvider.createPost({ ...data, date: new Date().toISOString() });
            console.log(result);
            if(result.success) setSuccessCreateModalOpened(true);
            else processError(result.reason);
        }
    };

    const editPost = async id => {
        const data = await submit();
        if(data) {
            const result = await PostListProvider.editPost(id, data);
            if(result.success) setSuccessEditModalOpened(true);
            else processError(result.reason);
        }
    };

    return (
        <div className={`add-article-modal ${opened && "opened"}`}>
            <div className="add-article-modal-content">
                <div className="article-edit-wrapper">
                    <button className="delete" onClick={close}>X</button>
                </div>
                <div className="add-article-modal-header">
                    <h2 onClick={() => console.log(crawl())}>{actionMap[action][0]} новость</h2>
                </div>
                <div className="add-article-modal-body">
                    <div className="edit-event-modal-name">
                        <span onClick={() => console.log(validate(crawl()))}>Название новости</span>
                        <input ref={titleRef} type="text" placeholder="Введите название новости" defaultValue={post ? post.title : ""} />
                    </div>
                    <div className="add-article-modal-text-editor-wrapper">
                        <TextEditor editorRef={textEditorRef} imageType="news" />
                    </div>
                </div>
                <div className="add-article-modal-footer">
                    <div className="col-1-3">
                        <p>Выберите категорию</p>
                        {/* <Select
                            // defaultValue={colourOptions[1]}
                            options={categoryOptions}
                            formatGroupLabel={formatGroupLabel}
                            theme={theme => ({ ...theme, borderRadius: 0, colors: { ...theme.colors, primary: "" } })}
                            placeholder="Выберите из списка"
                        /> */}
                        <CreatableSelect
                            theme={theme => ({ ...theme, borderRadius: 0, colors: { ...theme.colors, primary: "" } })}
                            options={categories.map(([category]) => ({ value: category, label: category }))}
                            onChange={option => setSelectedCategory(option?.label ?? "")}
                            value={{ value: selectedCategory, label: selectedCategory }}
                            formatCreateLabel={value => `Создать категорию "${value}"`}
                            placeholder="Выберите из списка"
                            formatGroupLabel={formatGroupLabel}
                            menuPlacement="top"
                            isClearable
                        />
                        <div className="add-article-add-new-category"> 
                            {/* <input type="text" placeholder="Категория" defaultValue={post ? post.category : ""} /> */}
                            <input type="text" placeholder="Добавить категорию"/>
                            <button className="add-article-add-new-category-button">Добавить</button>
                        </div>
                    </div>
                    <div className="col-1-3">
                        <p>Выберите ключевые слова</p>
                        <CreatableSelect 
                            theme={theme => ({ ...theme, borderRadius: 0, colors: { ...theme.colors, primary: "" } })}
                            onChange={tags => (console.log(tags), updateTags(tags.map(({ value }) => value)))}
                            noOptionsMessage={() => "Тегов больше нет, но вы можете создать новые"}
                            value={selectedTags.map(tag => ({ value: tag, label: tag }))}
                            options={tags.map(tag => ({ value: tag, label: tag }))}
                            formatCreateLabel={value => `Создать тег "${value}"`}
                            placeholder="Выберите из списка или создайте новый"
                            components={animatedComponents}
                            closeMenuOnSelect={false}
                            menuPlacement="top"
                            isClearable
                            isMulti
                            // styles={customStyles}
                        />
                        <div className="add-article-add-new-keyword"> 
                            <input type="text" placeholder="Добавить ключевое слово"/>
                            <button className="add-article-add-new-keyword-button">Добавить</button>
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
                        <div className="col-1-2">
                            <button className="add-article-save-button" onClick={post ? () => editPost(post.id) : createPost}>Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}