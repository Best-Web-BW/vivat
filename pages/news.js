import Router, { useRouter } from "next/router"
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ContentHeader from "../components/common/ContentHeader";
import DBProvider from "../utils/providers/DBProvider";
import PostListProvider from "../utils/providers/PostListProvider";
import AuthProvider, { AdminVariableComponent } from "../utils/providers/AuthProvider";
// import { css, cx } from "@emotion/css"

const options = [
    { value: "chocolate", label: "Лошади" },
    { value: "strawberry", label: "Белые" },
    { value: "vanilla", label: "Призы" },
    { value: "vanilla", label: "Результаты" },
    { value: "vanilla", label: "Полезное питание" }
]

const categoryOptions = [
    { value: "chocolate", label: "Лошади" },
    { value: "strawberry", label: "Eзда" },
    { value: "vanilla", label: "Конкур" },
    { value: "vanilla", label: "Соревнования" },
    { value: "vanilla", label: "Пони" }
]

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

const animatedComponents = makeAnimated();

export function Tag({ name }) {
    return (
        <Link href={`/news?tags=${name}`}>
            <a className="blog-page-keywords">{ name }</a>
        </Link>
    );
}

function Post({ id, title, paragraphs, tags, edit, remove }) {
    const [opened, setOpened] = useState(false);
    const narrow = () => setOpened(false);
    const expand = () => setOpened(true);

    return (
        <div className="blog-card">
            {<AdminVariableComponent>
                <div className ="article-edit-wrapper">
                    <span className="edit" onClick={() => edit(id)}></span>  
                    <button className="delete" onClick={() => remove(id)}>X</button>
                </div>
            </AdminVariableComponent>}
            <div className="blog-img">
                { paragraphs && <img src={`/images/news/${paragraphs[0].image.name}.jpg`} alt="" width="100%" /> }
            </div>
            <div className="blog-card-content" style={{ height: opened ? "max-content" : "40vh" }}>
                <h2 className="blog-card-title">{ title }</h2>
                <article className="blog-card-content-article">
                    { paragraphs && paragraphs.map((paragraph, index) => <p key={index}>{ paragraph.text }</p>) }
                </article>
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

function News({ query: { categories: _categories, tags: _tags, search: _search } }) {
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

    useEffect(async () => {
        const posts = await PostListProvider.getPostList(categories, tags, search);
        setPosts(posts);
    }, [categories, tags, search]);

    const [uniqueTags, setUniqueTags] = useState([]);
    const [counts, setCounts] = useState([]);
    useEffect(async () => {
        const { tags, counts } = await DBProvider.getPostStats();
        setUniqueTags(tags);
        setCounts(Object.entries(counts));
    }, []);
    
    const paragraphs = [
        {
            image: "yael-gonzalez-jd9UEc8Sc58-unsplash",
            text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit maxime hic repellat! Dolores culpa quae et debitis? Tenetur aut ut ab harum, repellendus et ducimus eos provident praesentium totam! Ullam enim sunt ipsum? Nam, dolor ex placeat dignissimos molestiae repellendus quaerat velit maxime aperiam vel voluptatum perspiciatis praesentium officiis quidem maiores minus consectetur nesciunt in deleniti ipsa quas ea! Incidunt, officia! Labore nostrum, dolor ut voluptatum adipisci, distinctio temporibus dignissimos, tempora praesentium architecto aut quia! Fuga atque nihil eius, cumque tenetur in quo quibusdam rerum repellendus, magnam veniam obcaecati consequuntur ipsam necessitatibus perspiciatis iure voluptatum asperiores debitis quasi fugiat delectus ullam ducimus? Quam repellendus reiciendis nisi corrupti error rerum ullam pariatur laborum eum assumenda repudiandae maiores beatae, velit libero tenetur perspiciatis, atque saepe est ut, id voluptas voluptatibus tempore commodi molestias. Inventore quam iusto obcaecati quibusdam, corrupti omnis ipsam consectetur dolorum non nesciunt possimus impedit suscipit amet accusamus, explicabo voluptates. Alias nostrum aperiam repellendus, numquam, quis quidem hic pariatur voluptatum omnis autem sit architecto optio dicta provident, officiis odio quisquam temporibus excepturi sunt voluptatem consectetur eos dolore harum animi. Voluptate, a delectus? Harum eius, expedita eos aut aliquam quis aspernatur exercitationem veritatis, dolorem sunt ducimus eveniet similique nam cum, culpa voluptatem consectetur voluptatum quisquam itaque distinctio consequatur. Repudiandae nihil deleniti ipsam vel aut consequatur odit reiciendis veniam ad autem voluptatum alias pariatur et quia, ab laborum consectetur earum, delectus voluptas. Perferendis neque ratione magni voluptatibus veniam debitis consequatur tempore eos autem nihil impedit magnam ipsa, molestias amet aspernatur facilis iste!"
        },
        {
            image: "yael-gonzalez-jd9UEc8Sc58-unsplash",
            text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit maxime hic repellat! Dolores culpa quae et debitis? Tenetur aut ut ab harum, repellendus et ducimus eos provident praesentium totam! Ullam enim sunt ipsum? Nam, dolor ex placeat dignissimos molestiae repellendus quaerat velit maxime aperiam vel voluptatum perspiciatis praesentium officiis quidem maiores minus consectetur nesciunt in deleniti ipsa quas ea! Incidunt, officia! Labore nostrum, dolor ut voluptatum adipisci, distinctio temporibus dignissimos, tempora praesentium architecto aut quia! Fuga atque nihil eius, cumque tenetur in quo quibusdam rerum repellendus, magnam veniam obcaecati consequuntur ipsam necessitatibus perspiciatis iure voluptatum asperiores debitis quasi fugiat delectus ullam ducimus? Quam repellendus reiciendis nisi corrupti error rerum ullam pariatur laborum eum assumenda repudiandae maiores beatae, velit libero tenetur perspiciatis, atque saepe est ut, id voluptas voluptatibus tempore commodi molestias. Inventore quam iusto obcaecati quibusdam, corrupti omnis ipsam consectetur dolorum non nesciunt possimus impedit suscipit amet accusamus, explicabo voluptates. Alias nostrum aperiam repellendus, numquam, quis quidem hic pariatur voluptatum omnis autem sit architecto optio dicta provident, officiis odio quisquam temporibus excepturi sunt voluptatem consectetur eos dolore harum animi. Voluptate, a delectus? Harum eius, expedita eos aut aliquam quis aspernatur exercitationem veritatis, dolorem sunt ducimus eveniet similique nam cum, culpa voluptatem consectetur voluptatum quisquam itaque distinctio consequatur. Repudiandae nihil deleniti ipsam vel aut consequatur odit reiciendis veniam ad autem voluptatum alias pariatur et quia, ab laborum consectetur earum, delectus voluptas. Perferendis neque ratione magni voluptatibus veniam debitis consequatur tempore eos autem nihil impedit magnam ipsa, molestias amet aspernatur facilis iste!"
        }
    ];

    const [isPostEditorOpened, setIsPostEditorOpened] = useState(false);
    const [postEditorAction, setPostEditorAction] = useState("create");
    const [postEditorData, setPostEditorData] = useState();
    const switchPostEditor = (opened, action, data) => {
        setIsPostEditorOpened(opened);
        setPostEditorAction(action);
        setPostEditorData(data);
    }

    const editPost = id => {
        const p = posts.find(post => post.id === id);
        console.log(id, p);
        switchPostEditor(true, "edit", p);
    }
    const removePost = async id => {
        const response = await PostListProvider.removePost(id);
        alert(response.success ? "Новость успешно удалена" : response.reason);
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
                    { posts.map(post => <Post key={post.id} { ...post } edit={editPost} remove={removePost} />) }
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
                        {<AdminVariableComponent>
                            <div className="blog-menu-section admin">
                                <button className="blog-menu-section-add-article-button" onClick={() => switchPostEditor(true, "create")}>Создать новость</button>
                            </div>
                        </AdminVariableComponent>}
                    </div>
                </div>
                {<AdminVariableComponent>
                    <PostEditor opened={isPostEditorOpened} action={postEditorAction} postData={postEditorData} close={() => setIsPostEditorOpened(false)} />
                </AdminVariableComponent>}
            </div>
        </div>
    );
}

News.getInitialProps = ({ query }) => ({ query });

export default News;

export function PostEditor({ opened, action, postData, close }) {
    const [actionMap] = useState({ "create": ["Создать", () => setPost(undefined)], "edit": ["Изменить", (data) => setPost(data)] });
    const [post, setPost] = useState();
    
    useEffect(() => opened && actionMap[action][1](postData), [opened]);

    const crawl = () => console.log("Data crawled");
    const createPost = () => console.log("Post created");

    return (
        <div className={`add-article-modal ${opened && "opened"}`}>
            <div className="add-article-modal-content">
                <div className ="article-edit-wrapper">
                    <button className="delete" onClick={close}>X</button>
                </div>
                <div className="add-article-modal-header">
                    <h2>{actionMap[action][0]} новость</h2>
                </div>
                <div className="add-article-modal-body">
                    <div className="edit-event-modal-name">
                        <label>
                            Название события
                            <input type="text" placeholder="Введите название события" defaultValue={post ? post.title : ""} />
                        </label>
                    </div>
                    <div className="add-article-modal-text-editor-wrapper">
                        <textarea cols="30" rows="10" placeholder="введите что-нибудь интересное" />
                    </div>
                </div>
                <div className="add-article-modal-footer">
                    <div className="col-1-3">
                        <p>Введите категорию</p>
                        {/* <p>Выберите категорию</p> */}
                        {/* <Select
                            // defaultValue={colourOptions[1]}
                            options={categoryOptions}
                            formatGroupLabel={formatGroupLabel}
                            theme={theme => ({ ...theme, borderRadius: 0, colors: { ...theme.colors, primary: "" } })}
                            placeholder="Выберите из списка"
                        /> */}
                        <div className="add-article-add-new-category"> 
                            <input type="text" placeholder="Категория" defaultValue={post ? post.category : ""} />
                            {/* <input type="text" placeholder="Добавить категорию"/>
                            <button className="add-article-add-new-category-button">Добавить</button> */}
                        </div>
                    </div>
                    <div className="col-1-3">
                        <p>Выберите ключевые слова</p>
                        <Select 
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti={true}
                            options={options}
                            // styles={customStyles}
                            theme={theme => ({ ...theme, borderRadius: 0, colors: { ...theme.colors, primary: "" } })}
                            placeholder="Выберите из списка"
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
                            <button className="add-article-save-button" onClick={() => createPost(crawl())}>Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}