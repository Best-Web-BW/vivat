import ProfileMenu from "../../components/common/ProfileMenu";
import Select from "react-select";

const categoryOptions = [
    { value: "chocolate", label: "По расписанию" },
    { value: "strawberry", label: "Сначала прошедшие" },
    { value: "vanilla", label: "Сначала будущие" }
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

export default function MyEvents() {
    return (
        <div className="profile-content content-block">
            <ProfileMenu active="my-events" />
            <div className="block-title">
                <h2>Мои события</h2>
            </div>
            <div className="my-events-wrapper">
                <div className="choose-date-my-events">
                    <a className="choose-date-element active">21.03.2020</a>
                    <a className="choose-date-element">03.03.2020</a>
                    <a className="choose-date-element">01.02.2020</a>
                </div>
                <div className="my-events-container">
                    <div className="my-events-sorting-container">
                        <Select
                            defaultValue={categoryOptions[0]}
                            options={categoryOptions}
                            formatGroupLabel={formatGroupLabel}
                            theme={theme => ({ ...theme, borderRadius: 0, colors: { ...theme.colors, primary: "" } })}
                            placeholder="Выберите из списка"
                        />
                    </div>
                    <div className="my-events-element-container">
                        <a className="my-events-element">
                            <div className="my-events-programm">
                                <div className="my-events-programm-title">
                                    <p>Программа</p>
                                </div>
                                <div className="my-events-programm-name">
                                    <p>Лошади и лошадки</p>
                                </div>
                            </div>
                            <div className="my-events-categories">
                                <div className="my-events-categories-title">
                                    <p>Категория</p>
                                </div>
                                <div className="my-events-categories-name">
                                    <p>Юноши</p>
                                </div>
                            </div>
                            <div className="my-events-type">
                                <div className="my-events-type-title">
                                    <p>Тип</p>
                                </div>
                                <div className="my-events-type-name">
                                    <p>Соревнование лошадей</p>
                                </div>
                            </div>
                        </a>
                        <a className="my-events-element">
                            <div className="my-events-programm">
                                <div className="my-events-programm-title">
                                    <p>Программа</p>
                                </div>
                                <div className="my-events-programm-name">
                                    <p>Лошади и лошадки</p>
                                </div>
                            </div>
                            <div className="my-events-categories">
                                <div className="my-events-categories-title">
                                    <p>Категория</p>
                                </div>
                                <div className="my-events-categories-name">
                                    <p>Юноши</p>
                                </div>
                            </div>
                            <div className="my-events-type">
                                <div className="my-events-type-title">
                                    <p>Тип</p>
                                </div>
                                <div className="my-events-type-name">
                                    <p>Соревнование лошадей</p>
                                </div>
                            </div>
                        </a>
                        <a className="my-events-element">
                            <div className="my-events-programm">
                                <div className="my-events-programm-title">
                                    <p>Программа</p>
                                </div>
                                <div className="my-events-programm-name">
                                    <p>Лошади и лошадки</p>
                                </div>
                            </div>
                            <div className="my-events-categories">
                                <div className="my-events-categories-title">
                                    <p>Категория</p>
                                </div>
                                <div className="my-events-categories-name">
                                    <p>Юноши</p>
                                </div>
                            </div>
                            <div className="my-events-type">
                                <div className="my-events-type-title">
                                    <p>Тип</p>
                                </div>
                                <div className="my-events-type-name">
                                    <p>Соревнование лошадей</p>
                                </div>
                            </div>
                        </a>
                        <a className="my-events-element">
                            <div className="my-events-programm">
                                <div className="my-events-programm-title">
                                    <p>Программа</p>
                                </div>
                                <div className="my-events-programm-name">
                                    <p>Лошади и лошадки</p>
                                </div>
                            </div>
                            <div className="my-events-categories">
                                <div className="my-events-categories-title">
                                    <p>Категория</p>
                                </div>
                                <div className="my-events-categories-name">
                                    <p>Юноши</p>
                                </div>
                            </div>
                            <div className="my-events-type">
                                <div className="my-events-type-title">
                                    <p>Тип</p>
                                </div>
                                <div className="my-events-type-name">
                                    <p>Соревнование лошадей</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}