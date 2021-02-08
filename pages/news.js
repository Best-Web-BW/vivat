import Link from "next/link";
import { useEffect, useState } from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import ContentHeader from "../components/common/ContentHeader";
import PostListProvider from "../utils/providers/PostListProvider";
import { css, cx } from '@emotion/css'

const options = [
    { value: 'chocolate', label: 'Лошади' },
    { value: 'strawberry', label: 'Белые' },
    { value: 'vanilla', label: 'Призы' },
    { value: 'vanilla', label: 'Результаты' },
    { value: 'vanilla', label: 'Полезное питание' },
]

const categoryOptions = [
    { value: 'chocolate', label: 'Лошади' },
    { value: 'strawberry', label: 'Eзда' },
    { value: 'vanilla', label: 'Конкур' },
    { value: 'vanilla', label: 'Соревнования' },
    { value: 'vanilla', label: 'Пони' },
]

const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
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
        <Link href={`/news/${name}`}>
            <a className="blog-page-keywords">{ name }</a>
        </Link>
    );
}

function Post({ id, title, paragraphs, tags }) {
    const [opened, setOpened] = useState(false);
    const narrow = () => setOpened(false);
    const expand = () => setOpened(true);

    return (
        <div className="blog-card">
            <div className ="article-edit-wrapper">
                <span className="edit"></span>  
                <button className="delete">X</button>
            </div>
            <div className="blog-img">
                { paragraphs && <img src={`/images/news/${paragraphs[0].image}.jpg`} alt="" width="100%" /> }
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

export default function News() {
    const [posts, setPosts] = useState([]);

    useEffect(async () => {
        const posts = await PostListProvider.getPostList();
        setPosts(posts);
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
                    { posts && posts.map(post => <Post key={post.id} { ...post } paragraphs={paragraphs} />) }
                </div>
                <div className="right-column">
                    <div className="blog-menu-wrapper">
                        <div className="blog-menu-section">
                            <form className="blog-form-search" action="">
                                <div className="blog-search-input-container">
                                    <input type="text" className="blog-search" placeholder="Поиск" />
                                </div>
                                <button className="blog-search-button">Поиск</button>
                            </form>
                        </div>
                        <div className="blog-menu-section">
                            <div className="blog-categories-wrapper">
                                <h2>Категории</h2>
                                <button className="blog-categories-button">Лошади&nbsp;(<span className="news-count">0</span>)</button>
                                <button className="blog-categories-button">Езда&nbsp;(<span className="news-count">0</span>)</button>
                                <button className="blog-categories-button">Конкур&nbsp;(<span className="news-count">0</span>)</button>
                                <button className="blog-categories-button">Соревнования&nbsp;(<span className="news-count">0</span>)</button>
                                <button className="blog-categories-button">Пони&nbsp;(<span className="news-count">0</span>)</button>
                            </div>
                        </div>
                        <div className="blog-menu-section">
                            <div className="blog-keywords-wrapper">
                                <form action="" className="flex wrap">
                                    <label className="blog-keywords-button">
                                        <input type="checkbox" />
                                        <span>Лошади</span>
                                    </label>
                                    <label className="blog-keywords-button">
                                        <input type="checkbox" />
                                        <span>Белые</span>
                                    </label>
                                    <label className="blog-keywords-button">
                                        <input type="checkbox" />
                                        <span>Призы</span>
                                    </label>
                                    <label className="blog-keywords-button">
                                        <input type="checkbox" />
                                        <span>Результаты</span>
                                    </label>
                                    <label className="blog-keywords-button">
                                        <input type="checkbox" />
                                        <span>Полезное питание</span>
                                    </label>
                                </form>
                            </div>
                        </div>
                        <div className="blog-menu-section admin">
                            <button className="blog-menu-section-add-article-button">Создать новость</button>
                        </div>
                    </div>
                </div>
                <div className="add-article-modal">
                    <div className="add-article-modal-content">
                        <div className="add-article-modal-header">
                            <h2>Создать новость/изменить{/* Создать/изменить выбирается исходя из того, что делает пользователь - изменяет статью или создает новую */}</h2>
                        </div>
                        <div className="add-article-modal-body">
                            <div className="add-article-modal-text-editor-wrapper">
                                <textarea name="" id="" cols="30" rows="10" placeholder="введите что-нибудь интересное"></textarea>
                            </div>
                        </div>
                        <div className="add-article-modal-footer">
                            <div className="col-1-3">
                                <p>Выберите категорию</p>
                                <Select
                                    // defaultValue={colourOptions[1]}
                                    options={categoryOptions}
                                    formatGroupLabel={formatGroupLabel}
                                    theme={theme => ({
                                        ...theme,
                                        borderRadius: 0,
                                        colors: {
                                          ...theme.colors,
                                          primary: '',
                                        },
                                      })}
                                      placeholder='Выберите из списка'
                                />
                                <div className="add-article-add-new-category"> 
                                    <input type="text" placeholder="Добавить категорию"/>
                                    <button className="add-article-add-new-category-button">Добавить</button>
                                </div>
                            </div>
                            <div className="col-1-3">
                                <p>Выберите ключевые слова</p>
                                    <Select 
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={options}
                                    // styles={customStyles}
                                    theme={theme => ({
                                        ...theme,
                                        borderRadius: 0,
                                        colors: {
                                          ...theme.colors,
                                          primary: '',
                                        },
                                      })}
                                      placeholder='Выберите из списка'
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
                                        <label htmlFor="chooseVisibility-yes">Видимый</label>
                                        <input type="radio" name="chooseVisibility" id="chooseVisibility-yes"/>
                                        <input type="radio" name="chooseVisibility" id="chooseVisibility-no"/>
                                        <label htmlFor="chooseVisibility-no">Скрытый</label>
                                    </div>
                                </div>
                                <div className="col-1-2">
                                    <button className="add-article-save-button">Сохранить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}