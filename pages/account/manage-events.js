import ProfileMenu from "../../components/common/ProfileMenu";
import Link from "next/link";
import Select from "react-select";

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
    justifyContent: "space-between"
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

export default function ManageEvents() {
    return (
        <div className="profile-content content-block">
            <ProfileMenu active="manage-events" />
            <div className="admin-events-list">
                <h2>Управление событиями</h2>
                <div className="add-event-button-container">
                    <button className="add-event-button">Создать событие</button>
                </div>
                <div className="events-block">
                    <div className="events-title">
                        <a href="#">Мероприятие 1</a>
                    </div>
                    <div className="events-date">
                        <a>СБ. 06.02.2021</a>
                    </div>
                    <div className ="events-edit-wrapper">
                        <span className="edit"></span>  
                        <button className="delete">X</button>
                    </div>
                </div>
                <div className="events-block">
                    <div className="events-title">
                        <a href="#">Мероприятие 1</a>
                    </div>
                    <div className="events-date">
                        <a>СБ. 06.02.2021</a>
                    </div>
                    <div className ="events-edit-wrapper">
                        <span className="edit"></span>  
                        <button className="delete">X</button>
                    </div>
                </div>
            </div>
            <div className="edit-event-modal">
                <div className="edit-event-modal-content">
                    <div className="edit-event-modal-header">
                        <h2>Создать/изменить событие</h2>
                    </div>
                    <div className="edit-event-modal-body">
                        <div className="edit-event-modal-name">
                            <label htmlFor="">Название события</label>
                            <input type="text" placeholder="Введите название собыия"/>
                        </div>
                        <div className="edit-event-modal-col-left">
                            <div className="edit-event-modal-place">
                                <label htmlFor="">Место проведения</label>
                                <input type="text" placeholder="Введите адрес"/>
                            </div>
                            <div className="edit-event-modal-date">
                                <label htmlFor="">Дата начала</label>
                                <input type="text" placeholder="Введите адрес"/>
                                <label htmlFor="">Дата окончания</label>
                                <input type="text" placeholder="Введите адрес"/>
                            </div>
                        </div>
                        <div className="edit-event-modal-col-right">
                            <div className="edit-event-modal-edit-text">
                                <textarea name="" id="" cols="30" rows="10" placeholder="Введите описание"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="edit-event-modal-footer">
                        <div className="col-1-3">
                            <p>Выберите категорию</p>
                            <Select
                                // defaultValue={colourOptions[1]}
                                options={categoryOptions}
                                formatGroupLabel={formatGroupLabel}
                                theme={theme => ({ ...theme, borderRadius: 0, colors: { ...theme.colors, primary: "" } })}
                                placeholder="Выберите из списка"
                            />
                            <div className="add-article-add-new-category"> 
                                <input type="text" placeholder="Добавить категорию"/>
                                <button className="add-article-add-new-category-button">Добавить</button>
                            </div>
                        </div>
                        <div className="col-1-3">
                            <div className="edit-event-add-document">
                                <button className="edit-event-add-document-button">Выбрать документ</button>
                                <div className="edit-event-add-document-preview-list">
                                    <ul>
                                        <li>
                                            <div className="documents-element">
                                                <div className="documents-img">
                                                    <img src="/images/events/pdf-icon.png" alt="" width="100%" />
                                                </div>
                                                <p className="documents-title">Документы по белым лошадям часть 1</p>
                                                <div className ="events-edit-wrapper">
                                                    <button className="delete">X</button>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="documents-element">
                                                <div className="documents-img">
                                                    <img src="/images/events/pdf-icon.png" alt="" width="100%" />
                                                </div>
                                                <p className="documents-title">Документы по белым лошадям часть 1</p>
                                                <div className ="events-edit-wrapper">
                                                    <button className="delete">X</button>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="documents-element">
                                                <div className="documents-img">
                                                    <img src="/images/events/pdf-icon.png" alt="" width="100%" />
                                                </div>
                                                <p className="documents-title">Документы по белым лошадям часть 1</p>
                                                <div className ="events-edit-wrapper">
                                                    <button className="delete">X</button>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-1-3">
                            <button className="edit-event-save-button">Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}