import { AdminVariableComponent } from "../../utils/providers/AuthProvider";
import EventListProvider from "../../utils/providers/EventListProvider";
import DocumentLoader from "../../components/common/DocumentLoader";
import { convertDate } from "../../components/sliders/EventSlider";
import ProfileMenu from "../../components/common/ProfileMenu";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TextEditor from "../../components/common/TextEditor";
import DatePicker from "../../components/common/DatePicker";
import { sleep, toISODate } from "../../utils/common";
import Router from "next/router";
import Link from "next/link";
import { DefaultErrorModal, ErrorModal, SuccessModal, WarningModal } from "../../components/common/Modals";
// import CreatableSelect from 'react-select/creatable';
// import Select from "react-select";

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

export default function _ManageEvents() {
    const [imported, setImported] = useState();
    useEffect(async () => setImported({ CreatableSelect: (await import("react-select/creatable")).default }), []);
    return imported ? <ManageEvents {...imported} /> : null;
}

function ManageEvents({ CreatableSelect }) {
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
    const [successDeleteModalOpened, setSuccessDeleteModalOpened] = useState(false);
    const [defaultErrorModal, setDefaultErrorModal] = useState(false);
    const [errorModal, setErrorModal] = useState(null);

    const processError = useCallback(error => {
        switch(error) {
            case "db_error": return setErrorModal("Ошибка БД, попробуйте позже");
            case "event_not_exist": return setErrorModal("Такого мероприятия не существует");
            case "invalid_request": return setErrorModal("Неправильный запрос");
            case "no_category": return setErrorModal("Не выбрана категория");
            case "no_title": return setErrorModal("Не введено название");
            case "no_contents": return setErrorModal("Не введён текст");
            case "no_address": return setErrorModal("Не введён адрес");
            default: return setErrorModal("Внутренная ошибка");
        }
    }, []);

    const editEvent = async id => {
        const e = await EventListProvider.getEventDetails(id);
        console.log(id, e);
        switchEventEditor(true, "edit", e);
    }

    const [removeID, setRemoveID] = useState();
    const prepareToRemove = id => (setRemoveID(id), setDeleteModalOpened(true));
    const removeEvent = async id => {
        const result = await EventListProvider.removeEvent(id);
        if(result.success) setSuccessDeleteModalOpened(true);
        else processError(result.reason);
    }

    return (
        <AdminVariableComponent>
            <div className="profile-content content-block">
                <ProfileMenu active="manage-events" />
                <div className="admin-events-list">
                    <h2>Управление событиями</h2>
                    <div className="add-event-button-container">
                        <button className="add-event-button" onClick={() => switchEventEditor(true, "create")}>Создать событие</button>
                    </div>
                    { events.map(event => <EventBlock key={event.id} {...event} edit={editEvent} remove={prepareToRemove} />) }
                </div>
                <EventEditor
                    {...{
                        setSuccessCreateModalOpened, setSuccessEditModalOpened,
                        processError, CreatableSelect, categories
                    }}
                    eventData={editorConfig.data}
                    opened={editorConfig.opened}
                    action={editorConfig.action}
                    close={closeEditor}
                />
                <SuccessModal
                    close={() => { setSuccessCreateModalOpened(false); sleep(600).then(() => Router.reload()); }}
                    opened={successCreateModalOpened} content="Мероприятие успешно создано!"
                />
                <SuccessModal
                    close={() => { setSuccessEditModalOpened(false); sleep(600).then(() => Router.reload()); }}
                    opened={successEditModalOpened} content="Мероприятие успешно изменено!"
                />
                <SuccessModal
                    close={() => { setSuccessDeleteModalOpened(false); sleep(600).then(() => Router.reload()); }}
                    opened={successDeleteModalOpened} content="Мероприятие успешно удалено!"
                />
                <WarningModal
                    opened={deleteModalOpened} content="Вы уверены, что хотите удалить это мероприятие безвозвратно?"
                    submit={() => { removeEvent(removeID); setDeleteModalOpened(false); }}
                    cancel={() => setDeleteModalOpened(false)}
                />
                <ErrorModal opened={errorModal} content={errorModal} close={() => setErrorModal(false)} />
                <DefaultErrorModal opened={defaultErrorModal} close={() => setDefaultErrorModal(false)} />
            </div>
        </AdminVariableComponent>
    );
}

export function EventEditor({ CreatableSelect, opened, action, eventData, close, categories, setSuccessCreateModalOpened, setSuccessEditModalOpened, processError }) {
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
    
    const defaultValue = useMemo(() => event ? event.contents.replace(/script/gi, "sсrірt") : "", [event]);
    useEffect(() => refs.textEditor.current?.editor.setContents(defaultValue), [event]);
    
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
        if(!validated.success) return processError(validated.error);
        return data;
    };

    const createEvent = async () => {
        const data = await submit();
        if(data) {
            const result = await EventListProvider.createEvent(data);
            if(result.success) setSuccessCreateModalOpened(true);
            else processError(result.reason);
        }
    };

    const editEvent = async id => {
        const data = await submit();
        if(data) {
            const result = await EventListProvider.editEvent(id, data);
            if(result.success) setSuccessEditModalOpened(true);
            else processError(result.reason);
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
                            <TextEditor editorRef={refs.textEditor} imageType="events" />
                        </div>
                    </div>
                </div>
                <div className="edit-event-modal-footer">
                    <div className="col-1-3">
                        <p>Выберите категорию</p>
                        <CreatableSelect
                            // theme={theme => ({ ...theme, borderRadius: 0, colors: { ...theme.colors, primary: "" } })}
                            // options={categories.map(category => ({ value: category, label: category }))}
                            // value={{ value: selectedCategory, label: selectedCategory }}
                            // onChange={option => setSelectedCategory(option?.label ?? "")}
                            // formatCreateLabel={value => `Создать категорию "${value}"`}
                            // placeholder="Выберите из списка или создайте новую"
                            // formatGroupLabel={formatGroupLabel}
                            // menuPlacement="top"
                            // isClearable
                        />
                        <div className="add-article-add-new-category"> 
                            <input type="text" placeholder="Добавить категорию"/>
                            <button className="add-article-add-new-category-button">Добавить</button>
                        </div>
                    </div>
                    <div className="col-1-3">
                        <p>Выберите ключевые слова</p>
                        <CreatableSelect 
                            // theme={theme => ({ ...theme, borderRadius: 0, colors: { ...theme.colors, primary: "" } })}
                            // onChange={tags => (console.log(tags), updateTags(tags.map(({ value }) => value)))}
                            // noOptionsMessage={() => "Тегов больше нет, но вы можете создать новые"}
                            // value={selectedTags.map(tag => ({ value: tag, label: tag }))}
                            // options={tags.map(tag => ({ value: tag, label: tag }))}
                            // formatCreateLabel={value => `Создать тег "${value}"`}
                            // placeholder="Выберите из списка или создайте новый"
                            // components={animatedComponents}
                            // closeMenuOnSelect={false}
                            // menuPlacement="top"
                            // isClearable
                            // isMulti
                            // // styles={customStyles}
                        />
                        <div className="add-article-add-new-keyword"> 
                            <input type="text" placeholder="Добавить ключевое слово"/>
                            <button className="add-article-add-new-keyword-button">Добавить</button>
                        </div>
                    </div>
                    <div className="col-1-3">
                        <div className="edit-event-add-document">
                            <DocumentLoader type="events" onChange={setDocuments} defaultDocuments={defaultDocuments} />
                        </div>
                    </div>
                    <button className="edit-event-save-button" onClick={event ? () => editEvent(event.id) : createEvent}>Сохранить</button>
                </div>
            </div>
        </div>
    );
}