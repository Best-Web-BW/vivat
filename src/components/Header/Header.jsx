import React from "react";
import { Link } from "react-router-dom";
import {
    Unicorn,
    UnicornFollowInput,
    UnicornShyInput
 } from "../Unicorn";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isProfileMenuOpened: false,
            isProfileMenuShowed: false,
            isMenuOpened: false,
            isSearchOpened: false,
            isSignFormOpened: false,
            isLoginFormOpened: false,
            isRegisterFormOpened: false
        };
        window.header = this;

        this.loginFormRef = React.createRef();
        this.registerFormRef = React.createRef();

        this.profileMenuTimeout = 600;
        this.showProfileMenuTimer = undefined;
        this.hideProfileMenuTimers = [];
    
        this.clearProfileMenuTimers = () => {
            clearTimeout(this.showProfileMenuTimer);
            clearTimeout(this.hideProfileMenuTimers[0]);
            clearTimeout(this.hideProfileMenuTimers[1]);
        };
        this.openProfileMenu = () => {
            this.clearProfileMenuTimers();
            this.setState({ isProfileMenuOpened: true });
            this.showProfileMenuTimer = setTimeout(() => { this.setState({ isProfileMenuShowed: true }); }, this.profileMenuTimeout);
        };
        this.closeProfileMenu = () => {
            this.clearProfileMenuTimers();
            this.hideProfileMenuTimers[0] = setTimeout(() => { this.setState({ isProfileMenuShowed: false }); }, this.profileMenuTimeout);
            this.hideProfileMenuTimers[1] = setTimeout(() => { this.setState({ isProfileMenuOpened: false }); }, this.profileMenuTimeout * 2);
        };
        this.toggleMenu = () => { this.setState({ isMenuOpened: !this.state.isMenuOpened }); };
        this.toggleSearch = () => { this.setState({ isSearchOpened: !this.state.isSearchOpened }); };
        this.toggleSignForm = () => {
            let newState = !this.state.isSignFormOpened;
            this.setState({
                isSignFormOpened: newState,
                isLoginFormOpened: newState,
                isRegisterFormOpened: false
            });
        };
        this.switchSignForm = (isRegisterForm = false) => {
            this.setState({
                isLoginFormOpened: !isRegisterForm,
                isRegisterFormOpened: isRegisterForm
            });
        };

        this.unicorn = {
            commitTimeout: undefined,
            mode: "default",
            followAngle: 0,
            onFollow: (ratio = 0) => {
                this.unicorn.mode = "follow"
                this.unicorn.followAngle = (ratio - 0.42) * 90;
                this.unicorn.commit(false);
            },
            onShy: () => {
                clearTimeout(this.unicorn.blurTimeout);
                this.unicorn.mode = "shy";
                this.unicorn.commit();
            },
            onBlur: () => {
                this.unicorn.mode = "default";
                this.unicorn.commit();
            },
            commit: (doTimeout = true) => {
                clearTimeout(this.unicorn.commitTimeout);
                this.unicorn.commitTimeout = setTimeout(() => {
                    window.unicorn.directlyUpdateProps({
                        mode: this.unicorn.mode,
                        angle: this.unicorn.followAngle
                    });
                }, doTimeout ? 200 : 0);
            }
        };
    }

    render() {
        return (
            <div>
                <div className="header-container">
                    <div className="flex-row">
                        <div className="col-1-2 menu-button-container">
                            <button className={`menu-button ${this.state.isMenuOpened ? "active" : ""}`} onClick={this.toggleMenu}>
                                <div className="menu-ind">
                                    <div className="line" />
                                    <div className="line" />
                                </div>
                                <span>Меню</span>
                            </button>
                        </div>
                        <div className="col-1-2 login-button-container">
                            <button className="search-button" onClick={this.toggleSearch}>
                                <span className="search-icon" />
                            </button>
                            <button
                                className="profile-button"
                                onMouseEnter={this.openProfileMenu}
                                onMouseLeave={this.closeProfileMenu}
                            >
                                <span className="profile-icon" />
                            </button>
                            <button id="open-enter-form" className="login-button" onClick={this.toggleSignForm}>Войти</button>
                            <div
                                className={`profile-preview-wrapper ${this.state.isProfileMenuShowed ? "showed" : ""}`}
                                style={{ display: this.state.isProfileMenuOpened ? "block" : "none" }}
                                onMouseEnter={this.openProfileMenu}
                                onMouseLeave={this.closeProfileMenu}
                            >
                                <div className="profile-preview-row">
                                    <div className="profile-preview-photo">
                                        <img src="/images/placeholder_avatar.jpg" alt="" width="100%" />
                                    </div>
                                    <div className="profile-preview-data">
                                        <div className="profile-preview-name">
                                            <p>Иванов Иван Иванович</p>
                                        </div>
                                        <div className="profile-preview-address">RU | Moscow</div>
                                    </div>
                                </div>
                                <div className="profile-preview-row" style={{ flexWrap: "wrap" }}>
                                    <a href="Pages/profile/profile.html">
                                        <button className="profiel-preview-button">В профиль</button>
                                    </a>
                                    <a href="!!exit">
                                        <button className="profiel-preview-button">Выйти</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`modal-menu ${this.state.isMenuOpened ? "opened" : ""}`} style={{ paddingTop: "6vh" }}>
                    <div className="menu-list-wrapper">
                        <ul className="menu-list">
                            <li>
                                <Link to="/home" onClick={this.toggleMenu}>Главная</Link>
                            </li>
                            <li>
                                <Link to="/about" onClick={this.toggleMenu}>О нас</Link>
                            </li>
                            <li>
                                <Link to="/gallery" onClick={this.toggleMenu}>Галерея</Link>
                            </li>
                            <li>
                                <Link to="/services" onClick={this.toggleMenu}>Услуги и аренда</Link>
                            </li>
                            <li>
                                <Link to="/events" onClick={this.toggleMenu}>Мероприятия</Link>
                            </li>
                            <li>
                                <Link to="/news" onClick={this.toggleMenu}>Новости</Link>
                            </li>
                            <li>
                                <Link to="/contacts" onClick={this.toggleMenu}>Контакты</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="menu-contacts-wrapper">
                        <ul className="contacts-list">
                            <li>
                                <a href="tel:+7900000000">+7 900 000 000</a>
                            </li>
                            <li>
                                <a href="mailto:info@vivat.ru">info@vivat.ru</a>
                            </li>
                            <li>
                                <a href="!!address">г.Москва, Замечательный проспект 1</a>
                            </li>
                        </ul>
                        <ul className="social-links">
                            <li>
                                <a href="vk.com" className="vk-button">VK</a>
                            </li>
                            <li>
                                <a href="facebook.com" className="facebook-icon">FACEBOOK</a>
                            </li>
                            <li>
                                <a href="instagram.com" className="instagram-icon">INSTAGRAM</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={`modal-enter-wrapper ${this.state.isSignFormOpened ? "oppened" : ""}`}>
                    <div className="unicorn-wrapper">
                        <div className="unicorn-content">
                            <Unicorn />
                        </div>
                    </div>
                    <div className="modal-enter-content">
                        <span className="close-modal" onClick={this.toggleSignForm}>x</span>
                        <div className="modal-enter-header">
                            <button
                                className={`modal-enter-choose ${this.state.isLoginFormOpened ? "active" : ""}`}
                                onClick={() => { this.switchSignForm(false); }}
                            >Войти</button>
                            <button
                                className={`modal-enter-choose ${this.state.isRegisterFormOpened ? "active" : ""}`}
                                onClick={() => { this.switchSignForm(true); }}
                            >Регистрация</button>
                        </div>
                        <div
                            ref={this.loginFormRef}
                            className={`modal-enter-content-wrapper`}
                            style={{ height: (this.state.isLoginFormOpened ? this.loginFormRef.current.scrollHeight : 0) + "px" }}
                        >
                            <p className={`login-title ${this.isLoginFormOpened ? "active" : ""}`}>Войти</p>
                            <label className="login-label">
                                Логин/email
                                <UnicornFollowInput
                                    onChange={this.unicorn.onFollow}
                                    onBlur={this.unicorn.onBlur}
                                    inputClassName="login-input"
                                    type="text"
                                    placeholder="example@gmail.com"
                                />
                            </label>
                            <label className="password-label">Пароль
                                <UnicornShyInput
                                    onFocus={this.unicorn.onShy}
                                    onBlur={this.unicorn.onBlur}
                                    inputClassName="password-input"
                                    type="text"
                                />
                            </label>
                            <div className="forgot-password-wrapper">
                                <a href="!!forgot" className="forgot-password">Забыли пароль?</a>
                            </div>
                            <button className="login-button">Войти</button>
                        </div>
                        <div
                            ref={this.registerFormRef}
                            className={`modal-register-content-wrapper`}
                            style={{ height: (this.state.isRegisterFormOpened ? this.registerFormRef.current.scrollHeight : 0) + "px" }}
                        >
                            <p className={`register-title ${this.isRegisterFormOpened ? "active" : ""}`}>Регистрация</p>
                            <label className="surname-label">
                                Имя
                                <span className="required">*</span>
                                <UnicornFollowInput
                                    onChange={this.unicorn.onFollow}
                                    onBlur={this.unicorn.onBlur}
                                    inputClassName="surname-input"
                                    type="text"
                                    placeholder="Иванов"
                                />
                            </label>
                            <label className="name-label">
                                Фамилия
                                <span className="required">*</span>
                                <UnicornFollowInput
                                    onChange={this.unicorn.onFollow}
                                    onBlur={this.unicorn.onBlur}
                                    inputClassName="name-input"
                                    type="text"
                                    placeholder="Иван"
                                />
                            </label>
                            <label className="middle-name-label">
                                Отчество
                                <span className="required">*</span>
                                <UnicornFollowInput
                                    onChange={this.unicorn.onFollow}
                                    onBlur={this.unicorn.onBlur}
                                    inputClassName="middle-name-input"
                                    type="text"
                                    placeholder="Иванович"
                                />
                            </label>
                            <label className="birth-date-label">
                                Дата рождения
                                <span className="required">*</span>
                                <input type="text" className="datepicker-here" />
                            </label>
                            <label className="email-label">
                                Адрес электронной почты
                                <span className="required">*</span>
                                <UnicornFollowInput
                                    onChange={this.unicorn.onFollow}
                                    onBlur={this.unicorn.onBlur}
                                    inputClassName="email-input"
                                    type="text"
                                    placeholder="example@gmail.com"
                                />
                            </label>
                            <button className="login-button">Регистрация</button>
                        </div>
                    </div>
                </div>
                <div className={`search-wrapper ${this.state.isSearchOpened ? "oppened" /*wtf*/ : ""}`}>
                    <div className="search-container">
                        <input type="text" className="search-input" placeholder="Введите поисковой запрос" />
                        <span className="search-icon" />
                    </div>
                    <span className="close-modal">x</span>
                </div>
            </div>
        );
    }
}

export default Header;