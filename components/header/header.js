import React from "react";
import Link from "next/link";
import Unicorn, { UnicornFollowInput, UnicornShyInput } from "./Unicorn";
import AuthProvider, { AuthVariableComponent } from "../../utils/providers/AuthProvider";
import DatePicker from "../common/DatePicker";
import { toISODate } from "../../utils/common";
import { QueryInput } from "../common/YandexSearch";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isProfileMenuOpened: false,
            isProfileMenuShowed: false,
            isMenuOpened: false,
            isSearchOpened: false,
            isSignFormOpened: false,
            isLoginFormOpened: false,
            isRegisterFormOpened: false,
            profilePreviewName: "",
            selectedRegisterDate: new Date(),
            restUnicorn: undefined,
            followUnicorn: undefined,
            shyUnicorn: undefined
        };

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

        // Aw shit, here we go again...
        this.authRefs = {
            login: {
                email: React.createRef(),
                password: React.createRef()
            },
            register: {
                email: React.createRef(),
                name: {
                    first: React.createRef(),
                    second: React.createRef(),
                    middle: React.createRef()
                },
                birthdate: React.createRef()
            }
        };

        this.doLogin = async () => {
            const email = this.authRefs.login.email.current.value;
            const password = this.authRefs.login.password.current.value;

            if(!/@/.test(email)) alert("Некорректный email");
            else if(!password.length) alert("Некорректный пароль");
            else {
                const [success, reason] = await AuthProvider.authenticate(email, password);

                if(success) (alert("Успешный вход!"), this.toggleSignForm());
                else if(reason === "invalid_email") alert("Пользователь с таким email не зарегистрирован");
                else if(reason === "invalid_password") alert("Неверный пароль");
                else alert("Произошла ошибка, попробуйте позже");
            }
        };

        this.doLogout = () => {
            AuthProvider.deauthenticate();
            this.closeProfileMenu();
        }

        this.doRegister = async () => {
            const email = this.authRefs.register.email.current.value;
            const name = {
                first: this.authRefs.register.name.first.current.value,
                second: this.authRefs.register.name.second.current.value,
                middle: this.authRefs.register.name.middle.current.value
            };
            const birthdate = toISODate(this.state.selectedRegisterDate);
            const errorMap = {
                invalid_email: "Некорректный email",
                invalid_first_name: "Некорректное имя",
                invalid_second_name: "Некорректная фамилия",
                invalid_middle_name: "Некорректное отчество",
                invalid_birthdate: "Некорректная дата рождения"
            };

            if(!/@/.test(email)) alert(errorMap.invalid_email);
            else if(!/^[a-zа-яё]{2,}$/gi.test(name.first)) alert(errorMap.invalid_first_name);
            else if(!/^[a-zа-яё]{2,}$/gi.test(name.second)) alert(errorMap.invalid_second_name);
            else if(!/^[a-zа-яё]{2,}$/gi.test(name.middle)) alert(errorMap.invalid_middle_name);
            else if(!/./.test(birthdate)) alert(errorMap.invalid_birthdate);
            else {
                const [success, reasons] = await AuthProvider.register(email, name, birthdate);

                if(success) (alert("Успешная регистрация!"), this.toggleSignForm());
                else alert(reasons.map((reason, index) => `${index}. ${errorMap[reason]}`));
            }
        };
    }

    render() {
        const profilePreviewName = AuthProvider.userData ? (({ second, first, middle }) => `${second} ${first} ${middle}`)(AuthProvider.userData.name) : "";
        
        return (
            <header>
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
                            <AuthVariableComponent>
                                <Link href="/account/profile">
                                    <a>
                                        <button className="profile-button" onMouseEnter={this.openProfileMenu} onMouseLeave={this.closeProfileMenu}>
                                            <span className="profile-icon" />
                                        </button>
                                    </a>
                                </Link>
                                <button id="open-enter-form" className="login-button" onClick={this.toggleSignForm}>Войти</button>
                            </AuthVariableComponent>
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
                                            <p>{ profilePreviewName }</p>
                                        </div>
                                        <div className="profile-preview-address">RU | Moscow</div>
                                    </div>
                                </div>
                                <div className="profile-preview-row" style={{ flexWrap: "wrap" }}>
                                    <Link href="/account/profile">
                                        <a>
                                            <button className="profile-preview-button">В профиль</button>
                                        </a>
                                    </Link>
                                    <button className="profile-preview-button" onClick={this.doLogout}>Выйти</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`modal-menu ${this.state.isMenuOpened ? "opened" : ""}`} style={{ paddingTop: "6vh" }}>
                    <div className="menu-list-wrapper">
                        <ul className="menu-list">
                            <li>
                                <Link href="/home">
                                    <a onClick={this.toggleMenu}>Главная</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/about">
                                    <a onClick={this.toggleMenu}>О нас</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/gallery">
                                    <a onClick={this.toggleMenu}>Галерея</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/services">
                                    <a onClick={this.toggleMenu}>Услуги и аренда</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/events">
                                    <a onClick={this.toggleMenu}>Мероприятия</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/news">
                                    <a onClick={this.toggleMenu}>Новости</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacts">
                                    <a onClick={this.toggleMenu}>Контакты</a>
                                </Link>
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
                                <a href="vk.com" className="vk-button"></a>
                            </li>
                            <li>
                                <a href="facebook.com" className="facebook-icon"></a>
                            </li>
                            <li>
                                <a href="instagram.com" className="instagram-icon"></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={`modal-enter-wrapper ${this.state.isSignFormOpened ? "opened" : ""}`}>
                    <div className="unicorn-wrapper">
                        <div className="unicorn-content">
                            <Unicorn setListeners={listeners => this.setState(listeners)} />
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
                            ref={this.loginFormRef} className={`modal-enter-content-wrapper`}
                            style={{ height: (this.state.isLoginFormOpened ? this.loginFormRef.current.scrollHeight : 0) + "px" }}
                        >
                            <p className={`login-title ${this.isLoginFormOpened && "active"}`}>Войти</p>
                            <div className="login-label">
                                <span>Логин/email</span>
                                <UnicornFollowInput
                                    props={{ className: "login-input", type: "email", name: "email", placeholder: "example@gmail.com" }}
                                    inputRef={this.authRefs.login.email} follow={this.state.followUnicorn} rest={this.state.restUnicorn}
                                />
                            </div>
                            <div className="password-label">
                                <span>Пароль</span>
                                <UnicornShyInput
                                    props={{ className: "password-input", type:"password", name: "password", autoComplete:"current-password" }}
                                    inputRef={this.authRefs.login.password} shy={this.state.shyUnicorn} rest={this.state.restUnicorn}
                                />
                            </div>
                            <div className="forgot-password-wrapper">
                                <a href="!!forgot" className="forgot-password">Забыли пароль?</a>
                            </div>
                            <button className="login-button" onClick={this.doLogin}>Войти</button>
                        </div>
                        <div
                            ref={this.registerFormRef} className="modal-register-content-wrapper"
                            style={{ height: (this.state.isRegisterFormOpened ? this.registerFormRef.current.scrollHeight : 0) + "px" }}
                        >
                            <p className={`register-title ${this.isRegisterFormOpened && "active"}`}>Регистрация</p>
                            <div className="surname-label">
                                <span>Фамилия</span>&nbsp;<span className="required">*</span>
                                <UnicornFollowInput
                                    props={{ className: "surname-input", type: "text", name: "name", placeholder: "Иванов" }}
                                    inputRef={this.authRefs.register.name.second} follow={this.state.followUnicorn} rest={this.state.restUnicorn}
                                />
                            </div>
                            <div className="name-label">
                                <span>Имя</span>&nbsp;<span className="required">*</span>
                                <UnicornFollowInput
                                    props={{ className: "name-input", type: "text", name: "surname", placeholder: "Иван" }}
                                    inputRef={this.authRefs.register.name.first} follow={this.state.followUnicorn} rest={this.state.restUnicorn}
                                />
                            </div>
                            <div className="middle-name-label">
                                <span>Отчество</span>&nbsp;<span className="required">*</span>
                                <UnicornFollowInput
                                    props={{ className: "middle-name-input", type: "text", name: "middlename", placeholder: "Иванович" }}
                                    inputRef={this.authRefs.register.name.middle} follow={this.state.followUnicorn} rest={this.state.restUnicorn}
                                />
                            </div>
                            <div className="birth-date-label">
                                <span>Дата рождения</span>&nbsp;<span className="required">*</span>
                                <DatePicker
                                    dropdownMode="select" dateFormat="dd.MM.yyyy" peekNextMonth showYearDropdown
                                    onChange={date => this.setState({ selectedRegisterDate: date })}
                                    selected={this.state.selectedRegisterDate}
                                />
                            </div>
                            <div className="email-label">
                                <span>Адрес электронной почты</span>&nbsp;<span className="required">*</span>
                                <UnicornFollowInput
                                    props={{ className: "login-input", type: "email", name: "email", placeholder: "example@gmail.com" }}
                                    inputRef={this.authRefs.register.email} follow={this.state.followUnicorn} rest={this.state.restUnicorn}
                                />
                            </div>
                            <div className="password-label">
                                <span>Придумайте пароль</span>&nbsp;<span className="required">*</span>
                                <UnicornShyInput
                                    props={{ className: "password-input", type:"password", name: "password", autoComplete:"current-password" }}
                                    inputRef={this.authRefs.login.password} shy={this.state.shyUnicorn} rest={this.state.restUnicorn}
                                />
                            </div>
                            <div className="password-label">
                                <span>Подтвердите пароль</span>&nbsp;<span className="required">*</span>
                                <UnicornShyInput
                                    props={{ className: "password-input", type:"password", name: "password", autoComplete:"current-password" }}
                                    inputRef={this.authRefs.login.password} shy={this.state.shyUnicorn} rest={this.state.restUnicorn}
                                />
                            </div>
                            <button className="login-button" onClick={this.doRegister}>Регистрация</button>
                        </div>
                    </div>
                </div>
                <div className={`search-wrapper ${this.state.isSearchOpened && "opened"}`}>
                    <div className="search-container">
                        <QueryInput />
                        {/* <input type="text" className="search-input" placeholder="Введите поисковой запрос" />
                        <span className="search-icon" /> */}
                    </div>
                    <span className="close-modal" onClick={this.toggleSearch}>x</span>
                </div>
            </header>
        );
    }
}