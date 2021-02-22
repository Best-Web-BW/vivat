import { DefaultErrorModal, ErrorModal, SuccessModal, WarningModal } from "../../components/common/Modals";
import { AdminVariableComponent } from "../../utils/providers/AuthProvider";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import EventListProvider from "../../utils/providers/EventListProvider";
import DocumentLoader from "../../components/common/DocumentLoader";
import { convertDate } from "../../components/sliders/EventSlider";
import { removeTagsFromText, sleep } from "../../utils/common";
import ProfileMenu from "../../components/common/ProfileMenu";
import TextEditor from "../../components/common/TextEditor";
import DatePicker from "../../components/common/DatePicker";
import DBProvider from "../../utils/providers/DBProvider";
import Router from "next/router";
import Link from "next/link";

const DO_LOG = false;

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
    const link = useMemo(() => `/events/${id}`, [id]);

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
    useEffect(async () => setImported({
        Select: (await import("react-select/creatable")).default,
        animatedComponents: ((await import("react-select/animated")).default)()
    }), []);
    return imported ? <ManageEvents {...imported} /> : null;
}

function ManageEvents({ Select, animatedComponents }) {
    const [events, setEvents] = useState([]);
    useEffect(async () => setEvents(await EventListProvider.getEventList()), []);

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
            case "event_not_exist": return setErrorModal("Такого мероприятия не существует");
            case "db_error": return setErrorModal("Ошибка БД, попробуйте позже");
            case "invalid_request": return setErrorModal("Неправильный запрос");
            case "no_tags": return setErrorModal("Не выбрано ни одного тега");
            case "no_category": return setErrorModal("Не выбрана категория");
            case "no_title": return setErrorModal("Не введено название");
            case "no_contents": return setErrorModal("Не введён текст");
            case "no_address": return setErrorModal("Не введён адрес");
            default: return setErrorModal("Внутренная ошибка");
        }
    }, []);

    const editEvent = async id => {
        const e = await EventListProvider.getEventDetails(id);
        DO_LOG && console.log(id, e);
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
                        processError, Select, animatedComponents
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

export function EventEditor({ Select, animatedComponents, opened, action, eventData, close, setSuccessCreateModalOpened, setSuccessEditModalOpened, processError }) {
    const [actionMap] = useState({ "create": ["Создать", () => setEvent(undefined)], "edit": ["Изменить", data => setEvent(data)] });
    const [event, setEvent] = useState();
    const [documents, setDocuments] = useState([]);
    const defaultDocuments = useMemo(() => event ? event.documents : [], [event]);
    
    useEffect(() => opened && actionMap[action][1](eventData), [opened]);

    const addCategoryInputRef = useRef();
    const [editorCategories, setEditorCategories] = useState([]);
    
    const addTagInputRef = useRef();
    const [editorTags, setEditorTags] = useState([]);
    const updateEditorTags = tags => setEditorTags([...new Set(tags)]);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const updateSelectedTags = tags => setSelectedTags([...new Set(tags)]);

    useEffect(() => setSelectedCategory(event?.category ?? null), [event]);
    useEffect(() => setSelectedTags(event?.tags ?? []), [event]);
    useEffect(async () => {
        const { categories, tags } = await DBProvider.getEventStats();
        setEditorCategories(categories);
        setEditorTags(tags);
    }, []);
    
    const refs = {
        textEditor: useRef(),
        address: useRef(),
        title: useRef()
    };
    
    const defaultValue = useMemo(() => event ? event.contents.replace(/script/gi, "sсrірt") : "", [event]);
    useEffect(() => refs.textEditor.current?.editor.setContents(defaultValue), [event]);
    useEffect(() => refs.address.current.value = event?.address ?? "", [event]);
    useEffect(() => refs.title.current.value = event?.title ?? "", [event]);
    
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
        dates: [startDate.toISOString(), endDate.toISOString()],
        contents: refs.textEditor.current.editor.getContents(),
        address: refs.address.current.value,
        title: refs.title.current.value,
        category: selectedCategory,
        tags: selectedTags,
        documents
    });

    const validate = ({ title, contents, address, category, tags }) => {
        if(!title.length) return { success: 0, error: "no_title" };
        else if(!tags.length) return { success: 0, error: "no_tags" };
        else if(!address.length) return { success: 0, error: "no_address" };
        else if(!(category && category.length)) return { success: 0, error: "no_category" };
        else if(!removeTagsFromText(contents).length) return { success: 0, error: "no_contents" };
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
            const currentDate = new Date().toISOString();
            const result = await EventListProvider.createEvent({ ...data, cdate: currentDate, mdate: currentDate });
            if(result.success) setSuccessCreateModalOpened(true);
            else processError(result.reason);
        }
    };

    const editEvent = async id => {
        const data = await submit();
        if(data) {
            const result = await EventListProvider.editEvent(id, { ...data, mdate: new Date().toISOString() });
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
                    <h2 onClick={() => DO_LOG && console.log(crawl())}>{actionMap[action][0]} событие</h2>
                </div>
                <div className="edit-event-modal-body">
                    <div className="edit-event-modal-name">
                        <label onClick={() => DO_LOG && console.log(validate(crawl()))}>
                            Название события
                        </label>
                        <input ref={refs.title} type="text" placeholder="Введите название собыия" />
                    </div>
                    <div className="edit-event-modal-col-left">
                        <div className="edit-event-modal-place">
                            <label>
                                Место проведения
                            </label>
                            <input ref={refs.address} type="text" name="address" placeholder="Введите адрес" />
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
                        <Select
                            theme={theme => ({ ...theme, borderRadius: 0, colors: { ...theme.colors, primary: "" } })}
                            options={editorCategories.map(category => ({ value: category, label: category }))}
                            value={selectedCategory && { value: selectedCategory, label: selectedCategory }}
                            onChange={option => setSelectedCategory(option?.value ?? "")}
                            formatGroupLabel={formatGroupLabel}
                            placeholder="Выберите из списка"
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
                            placeholder="Выберите из списка"
                            components={animatedComponents}
                            closeMenuOnSelect={false}
                            menuPlacement="top"
                            isClearable
                            isMulti
                            // styles={customStyles}
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