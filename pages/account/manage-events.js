import ProfileMenu from "../../components/common/ProfileMenu";
import Link from "next/link";
import Select from "react-select";
import Router from "next/router";
import CreatableSelect from 'react-select/creatable';
import { convertDate } from "../../components/sliders/EventSlider";
import { AdminVariableComponent } from "../../utils/providers/AuthProvider";
import { useEffect, useMemo, useRef, useState } from "react";
import EventListProvider from "../../utils/providers/EventListProvider";
import TextEditor from "../../components/common/TextEditor";
import DatePicker from "react-datepicker";
import DocumentLoader from "../../components/common/DocumentLoader";
import { toISODate } from "../../utils/common";

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

function EventBlock({ id, title, dates: [start, end], edit, remove }) {
    const link = `/events/${id}`;
    return (
        <div className="events-block">
            <div className="events-title">
                <Link href={link}>
                    <a>{ title }</a>
                </Link>
            </div>
            <div className="events-date">
                <Link href={link}>
                    <a>{ convertDate(start) } - { convertDate(end) }</a>
                </Link>
            </div>
            <div className ="events-edit-wrapper">
                <span className="edit" onClick={() => edit(id)}></span>  
                <button className="delete" onClick={() => remove(id)}>X</button>
            </div>
        </div>
    );
}

export default function ManageEvents() {
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(async () => {
        const events = await EventListProvider.getEventList();
        const categories = [...new Set(events.map(({ category }) => category))];

        setEvents(events);
        setCategories(categories);
    }, []);

    const [editorConfig, setEditorConfig] = useState({
        opened: false,
        action: "create",
        data: undefined
    });
    const switchEventEditor = (opened, action, data) => setEditorConfig({ opened, action, data })
    const closeEditor = () => setEditorConfig(({ action, data }) => ({ action, data, opened: false }));

    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const [successCreateModalOpened, setSuccessCreateModalOpened] = useState(false);
    const [successEditModalOpened, setSuccessEditModalOpened] = useState(false);

    const editEvent = async id => {
        const e = await EventListProvider.getEventDetails(id);
        console.log(id, e);
        switchEventEditor(true, "edit", e);
    }

    const [removeID, setRemoveID] = useState();
    const prepareToRemove = id => {
        setRemoveID(id);
        setDeleteModalOpened(true);
    };
    const removeEvent = async id => {
        const result = await EventListProvider.removeEvent(id);
        if(result.success) {
            alert("Мероприятие успешно удалено");
            Router.reload();
        } else switch(result.reason) {
            case "db_error": return alert("Ошибка БД, попробуйте позже");
            case "event_not_exist": return alert("Такого мероприятия не существует");
            case "invalid_request": return alert("Неправильный запрос");
            default: return alert("Внутренная ошибка");
        }
    }

    return (
        <AdminVariableComponent>
            <div className="profile-content content-block">
                <ProfileMenu active="manage-events" />
                
                 <div className={`warning-delete-modal ${deleteModalOpened && "opened"}`}>
                    <div className="warning-delete-modal-content">
                        <p>Вы уверены, что хотите удалить это событие безвозвратно?</p>
                        <button
                            className="warning-delete-button"
                            onClick={() => {
                                removeEvent(removeID);
                                setDeleteModalOpened(false);
                            }}
                        >Да</button>
                        <button className="warning-delete-button-no" onClick={() => setDeleteModalOpened(false)}>Нет</button>
                    </div>
                </div>

                <div className={`warning-success-modal ${successCreateModalOpened && "opened"}`}>
                    <div className="warning-success-modal-content">
                        <span
                            className="close-modal"
                            onClick={() => {
                                setSuccessCreateModalOpened(false);
                                setTimeout(() => Router.reload(), 600);
                            }}
                        >X</span>
                        <p>Событие успешно создано!</p>
                        <button
                            className="warrning-success-modal-button"
                            onClick={() => {
                                setSuccessCreateModalOpened(false);
                                setTimeout(() => Router.reload(), 600);
                            }}
                        >Ок</button>
                    </div>
                </div>

                <div className={`warning-success-modal ${successEditModalOpened && "opened"}`}>
                    <div className="warning-success-modal-content">
                        <span
                            className="close-modal"
                            onClick={() => {
                                setSuccessEditModalOpened(false);
                                setTimeout(() => Router.reload(), 600);
                            }}
                        >X</span>
                        <p>Событие успешно изменено!</p>
                        <button
                            className="warrning-success-modal-button"
                            onClick={() => {
                                setSuccessEditModalOpened(false);
                                setTimeout(() => Router.reload(), 600);
                            }}
                        >Ок</button>
                    </div>
                </div>

                <div className="admin-events-list">
                    <h2>Управление событиями</h2>
                    <div className="add-event-button-container">
                        <button className="add-event-button" onClick={() => switchEventEditor(true, "create")}>Создать событие</button>
                    </div>
                    { events.map(event => <EventBlock key={event.id} {...event} edit={editEvent} remove={prepareToRemove} />) }
                </div>
                <EventEditor categories={categories} opened={editorConfig.opened} action={editorConfig.action} eventData={editorConfig.data} close={closeEditor} {...{ setSuccessCreateModalOpened, setSuccessEditModalOpened }} />
            </div>
        </AdminVariableComponent>
    );
}

export function EventEditor({ opened, action, eventData, close, categories, setSuccessCreateModalOpened, setSuccessEditModalOpened }) {
    const [actionMap] = useState({ "create": ["Создать", () => setEvent(undefined)], "edit": ["Изменить", data => setEvent(data)] });
    const [event, setEvent] = useState();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [documents, setDocuments] = useState([]);
    const defaultDocuments = useMemo(() => event ? event.documents : [], [event]);
    
    useEffect(() => opened && actionMap[action][1](eventData), [opened]);
    
    useEffect(() => setSelectedCategory(event ? event.category : ""), [event]);
    
    const refs = {
        title: useRef(),
        textEditor: useRef(),
        address: useRef()
    };
    
    const defaultValue = useMemo(() => event ? event.contents.replaceAll("script", "sсrірt") : "", [event]);
    const textEditor = useMemo(() => (<TextEditor editorRef={refs.textEditor} defaultValue={defaultValue} imageType="events" />), [event]);
    
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    useEffect(() => {
        if(event) {
            setStartDate(new Date(event.dates[0]));
            setEndDate(new Date(event.dates[1]));
        } else {
            setStartDate(new Date());
            setEndDate(new Date());
        }
    }, [event]);

    const crawl = () => ({
        title: refs.title.current.value,
        contents: refs.textEditor.current.editor.getContents(),
        address: refs.address.current.value,
        dates: [toISODate(startDate), toISODate(endDate)],
        category: selectedCategory,
        documents
    });

    const validate = data => {
        if(!data.title.length) return { success: 0, error: "no_title" };
        else if(data.contents.length <= 11) return { success: 0, error: "no_contents" };
        else if(!data.address.length) return { success: 0, error: "no_address" };
        else if(!data.category.length) return { success: 0, error: "no_category" };
        else return { success: 1 };
    };

    const submit = async () => {
        const data = crawl();
        const validated = validate(data);
        if(!validated.success) {
            switch (validated.error) {
                case "no_title": return alert("Не введено название");
                case "no_contents": return alert("Не введён текст");
                case "no_address": return alert("Не введён адрес");
                case "no_category": return alert("Не выбрана категория");
                default: return alert("Внутренняя ошибка");
            }
        }
        return data;
    };

    const createEvent = async () => {
        const data = await submit();
        if(data) {
            const result = await EventListProvider.createEvent(data);
            console.log(result);
            if(result.success) {
                setSuccessCreateModalOpened(true);
                // close();
                // Router.reload();
            } else switch(result.reason) {
                case "db_error": return alert("Ошибка БД, попробуйте позже");
                case "event_not_exist": return alert("Такого события не существует");
                case "invalid_request": return alert("Неправильный запрос");
                default: return alert("Внутренная ошибка");
            }
        }
    };

    const editEvent = async id => {
        const data = await submit();
        if(data) {
            const result = await EventListProvider.editEvent(id, data);
            if(result.success) {
                setSuccessEditModalOpened(true);
                // close();
                // Router.reload();
            } else switch(result.reason) {
                case "db_error": return alert("Ошибка БД, попробуйте позже");
                case "event_not_exist": return alert("Такого события не существует");
                case "invalid_request": return alert("Неправильный запрос");
                default: return alert("Внутренная ошибка");
            }
        }
    };

    return (
        <div className={`edit-event-modal ${opened && "opened"}`}>
            <div className="edit-event-modal-content">
                <div className="article-edit-wrapper">
                    <button className="delete" onClick={close}>X</button>
                </div>
                <div className="edit-event-modal-header">
                    <h2 onClick={() => console.log(crawl())}>{actionMap[action][0]} событие</h2>
                </div>
                <div className="edit-event-modal-body">
                    <div className="edit-event-modal-name">
                        <label onClick={() => console.log(validate(crawl()))}>
                            Название события
                        </label>
                        <input ref={refs.title} type="text" placeholder="Введите название собыия" defaultValue={event ? event.title : ""}/>
                        {/* <label htmlFor="">Название события</label> */}
                    </div>
                    <div className="edit-event-modal-col-left">
                        <div className="edit-event-modal-place">
                            <label>
                                Место проведения
                            </label>
                            <input ref={refs.address} type="text" name="address" placeholder="Введите адрес" defaultValue={event ? event.address : ""} />
                        </div>
                        <div className="edit-event-modal-date">
                            <label>
                                Дата начала
                            </label>
                            <DatePicker
                                dateFormat="dd.MM.yyyy"
                                selected={startDate} 
                                onChange={date => setStartDate(date)}
                                peekNextMonth
                                showYearDropdown
                                dropdownMode="select"
                            />
                            <label>
                                Дата окончания
                            </label>
                            <DatePicker
                                dateFormat="dd.MM.yyyy"
                                selected={endDate} 
                                onChange={date => setEndDate(date)}
                                peekNextMonth
                                showYearDropdown
                                dropdownMode="select"
                            />
                        </div>
                    </div>
                    <div className="edit-event-modal-col-right">
                        <div className="edit-event-modal-edit-text">
                            { textEditor }
                        </div>
                    </div>
                </div>
                <div className="edit-event-modal-footer">
                    <div className="col-1-3">
                        <p>Выберите категорию</p>
                        <CreatableSelect
                            theme={theme => ({ ...theme, borderRadius: 0, colors: { ...theme.colors, primary: "" } })}
                            options={categories.map(category => ({ value: category, label: category }))}
                            value={{ value: selectedCategory, label: selectedCategory }}
                            onChange={option => setSelectedCategory(option?.label ?? "")}
                            formatCreateLabel={value => `Создать категорию "${value}"`}
                            placeholder="Выберите из списка или создайте новую"
                            formatGroupLabel={formatGroupLabel}
                            menuPlacement="top"
                            isClearable
                        />
                        {/* <div className="add-article-add-new-category"> 
                            <input type="text" placeholder="Добавить категорию"/>
                            <button className="add-article-add-new-category-button">Добавить</button>
                        </div> */}
                    </div>
                    <div className="col-1-3">
                        <div className="edit-event-add-document">
                            <DocumentLoader type="events" onChange={setDocuments} defaultDocuments={defaultDocuments} />
                        </div>
                    </div>
                    <div className="col-1-3">
                        <button className="edit-event-save-button" onClick={event ? () => editEvent(event.id) : createEvent}>Сохранить</button>
                    </div>
                </div>
            </div>
        </div>
    );
}