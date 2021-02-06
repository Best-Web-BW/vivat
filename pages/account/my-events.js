import ProfileMenu from "../../components/common/ProfileMenu";

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
                        <select className="sorting-events">
                            <option value="1" selected>
                                <p>По расписанию</p>
                            </option>
                            <option value="2">
                                <p>Сначала прошедшие</p>
                            </option>
                            <option value="3">
                                <p>Сначала будущие</p>
                            </option>
                        </select>
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