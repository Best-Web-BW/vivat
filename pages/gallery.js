import { useEffect, useState } from "react";
import Link from "next/link";
import ContentHeader from "../components/common/ContentHeader";
import AlbumListProvider from "../utils/providers/AlbumListProvider";
import { AdminVariableComponent } from "../utils/providers/AuthProvider";
import { reformatDate } from "../utils/common";

function Album({ id, image, date, title }) {
    return (
        <div className="album-list-element">
                {<AdminVariableComponent>
                    <div className ="gallery-edit-wrapper">
                        <span className="edit"></span>  
                        <button className="delete">X</button>
                    </div>    
                </AdminVariableComponent>}
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
                    {<AdminVariableComponent>
                        <button className="add-gallery-button">
                            <p className="add-gallery-button-description">Добавить галерею</p>
                            <p className="add-gallery-button-icon">+</p>
                        </button>
                    </AdminVariableComponent>}
                </div>
                {<AdminVariableComponent>
                    <div className="add-gallery-modal">
                        <div className="add-gallery-modal-content">
                            <span className="close-modal">X</span>
                            <h2>Добавить альбом</h2>
                            <div className="add-gallery-modal-nameinput">
                                <label htmlFor="">Название</label>
                                <input type="text" placeholder="Введите название"/>
                            </div>
                            <div className="add-gallery-modal-choose-cover-wrapper">
                                <div className="add-gallery-modal-preview-cover">
                                    <img src="/images/gallery/album/webp/akshat-vats-l_GAWl6q7LI-unsplash.webp" alt="" width="100%"/>
                                </div>
                                <button className="add-gallery-modal-choose-cover">Выберите обложку альбома</button>
                            </div>
                            <div className="add-gallery-modal-choose-img-wrapper">
                                <button className="add-gallery-modal-choose-imgs">Выберите фотографии</button>
                                <div className="add-gallery-modal-imgs-list">
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
                            </div>
                            <button className="add-gallery-modal-save-button">Сохранить</button>
                        </div>
                    </div>
                    <div className="edit-gallery-modal">
                        <div className="edit-gallery-modal-content">
                            <span className="close-modal">X</span>
                            <h2>Изменить альбом</h2>
                            <div className="edit-gallery-modal-name-wrapper">
                                <label htmlFor="">Название:</label>
                                <input type="text" placeholder="Альбом с лошадьми, красивыми"/>
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
                    </div>
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
                </AdminVariableComponent>}
                <div className="album-list-container">
                    { albums.map(album => <Album key={album.id} { ...album } />) }
                </div>
            </div>
        </div>
    );
}