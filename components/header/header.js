import AuthProvider, { AuthVariableComponent } from "../../utils/providers/AuthProvider";
import Unicorn, { UnicornFollowInput, UnicornShyInput } from "./Unicorn";
import { QueryInput } from "../common/YandexSearch";
import DatePicker from "../common/DatePicker";
import Link from "next/link";
import React from "react";

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
            isRegisterFormSecondPageOpened: false,
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
        this.toggleSignForm = (newState) => {
            if(typeof newState !== "boolean") newState = !this.state.isSignFormOpened;
            this.setState({
                isSignFormOpened: newState,
                isLoginFormOpened: newState,
                isRegisterFormOpened: false,
                isRegisterFormFirstPageOpened: true
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
                birthdate: React.createRef(),
                password1: React.createRef(),
                password2: React.createRef()
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
                else if(reason === "not_verified") alert("Пользователь не подтвердил свой email");
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
            const birthdate = this.state.selectedRegisterDate.toISOString();
            const password1 = this.authRefs.register.password1.current.value;
            const password2 = this.authRefs.register.password2.current.value;
            const errorMap = {
                invalid_email: "Некорректный email",
                invalid_first_name: "Некорректное имя",
                invalid_second_name: "Некорректная фамилия",
                invalid_middle_name: "Некорректное отчество",
                invalid_birthdate: "Некорректная дата рождения",
                invalid_password: "Пароль не соответствует требованиям",
                different_passwords: "Пароли не совпадают"
            };

            if(!/@/.test(email)) alert(errorMap.invalid_email);
            else if(!/^[a-zа-яё]{2,}$/gi.test(name.first)) alert(errorMap.invalid_first_name);
            else if(!/^[a-zа-яё]{2,}$/gi.test(name.second)) alert(errorMap.invalid_second_name);
            else if(!/^[a-zа-яё]{2,}$/gi.test(name.middle)) alert(errorMap.invalid_middle_name);
            else if(!/./.test(birthdate)) alert(errorMap.invalid_birthdate);
            else if(!(
                /[A-Z]/.test(password1) &&
                /[a-z]/.test(password1) &&
                /[0-9]/.test(password1) &&
                password1.length >= 8
            )) alert(errorMap.invalid_password);
            else if(password1 !== password2) alert(errorMap.different_passwords);
            else {
                const [success, reasons] = await AuthProvider.register(email, name, birthdate, password1);

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
                            <button className={`menu-button ${this.state.isMenuOpened && "active"}`} onClick={this.toggleMenu}>
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
                            <AuthVariableComponent>
                                <div
                                    className={`profile-preview-wrapper ${this.state.isProfileMenuShowed && "showed"}`}
                                    style={{ display: this.state.isProfileMenuOpened ? "block" : "none" }}
                                    onMouseEnter={this.openProfileMenu}
                                    onMouseLeave={this.closeProfileMenu}
                                >
                                    <div className="profile-preview-row">
                                        <div className="profile-preview-photo">
                                            <img src="/images/profile/avatar_placeholder.webp" alt="" width="100%" />
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
                                { null }
                            </AuthVariableComponent>
                        </div>
                    </div>
                </div>
                <div className={`modal-menu ${this.state.isMenuOpened && "opened"}`} style={{ paddingTop: "6vh" }}>
                    <div className="menu-list-wrapper">
                        <ul className="menu-list">
                            {
                                [
                                    [    "/home", "Главная"        ],
                                    [   "/about", "О нас"          ],
                                    [ "/gallery", "Галерея"        ],
                                    ["/services", "Услуги и аренда"],
                                    [  "/events", "Мероприятия"    ],
                                    [    "/news", "Новости"        ],
                                    ["/contacts", "Контакты"       ]
                                ].map(([    name, title            ]) => (
                                    <li key={name}>
                                        <Link href={name}>
                                            <a onClick={this.toggleMenu}>{ title }</a>
                                        </Link>
                                    </li>
                                ))
                            }
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
                                <a href="vk.com" className="vk-button" />
                            </li>
                            <li>
                                <a href="facebook.com" className="facebook-icon" />
                            </li>
                            <li>
                                <a href="instagram.com" className="instagram-icon" />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={`modal-enter-wrapper ${this.state.isSignFormOpened && "opened"}`}>
                    <div className="unicorn-wrapper">
                        <div className="unicorn-content">
                            <Unicorn setListeners={listeners => this.setState(listeners)} />
                        </div>
                    </div>
                    <div className="modal-enter-content">
                        <span className="close-modal" onClick={this.toggleSignForm}>x</span>
                        <div className="modal-enter-header">
                            <button
                                className={`modal-enter-choose ${this.state.isLoginFormOpened && "active"}`}
                                onClick={() => { this.switchSignForm(false); }}
                            >Войти</button>
                            <button
                                className={`modal-enter-choose ${this.state.isRegisterFormOpened && "active"}`}
                                onClick={() => { this.switchSignForm(true); }}
                            >Регистрация</button>
                        </div>
                        <div
                            ref={this.loginFormRef} className={`modal-enter-content-wrapper`}
                            style={{ height: `${this.state.isLoginFormOpened ? this.loginFormRef.current.scrollHeight : 0}px` }}
                        >
                            <p className={`login-title ${this.state.isLoginFormOpened && "active"}`}>Войти</p>
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
                            <div className="forgot-password-wrapper" onClick={() => this.toggleSignForm(false)}>
                                <Link href="/forgot-password">
                                    <a className="forgot-password">Забыли пароль?</a>
                                </Link>
                            </div>
                            <button className="login-button" onClick={this.doLogin}>Войти</button>
                        </div>
                        <div
                            ref={this.registerFormRef} className="modal-register-content-wrapper"
                            style={{ height: (this.state.isRegisterFormOpened ? this.registerFormRef.current.scrollHeight : 0) + "px" }}
                        >
                            <div className={`modal-register-content-1 ${this.state.isRegisterFormSecondPageOpened && "disable"}`}>
                                <p className={`register-title ${this.state.isRegisterFormOpened && "active"}`}>Регистрация</p>
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
                                <button className="login-button" onClick={() => this.setState({ isRegisterFormSecondPageOpened: true })}>Далее &gt;</button>
                            </div>
                            <div className={`modal-register-content-2 ${this.state.isRegisterFormSecondPageOpened && "active"}`}>
                                <div className="password-label">
                                    <span>Придумайте пароль</span>&nbsp;<span className="required">*</span>
                                    <UnicornShyInput
                                        props={{ className: "password-input", type:"password", name: "password", autoComplete:"current-password" }}
                                        inputRef={this.authRefs.register.password1} shy={this.state.shyUnicorn} rest={this.state.restUnicorn}
                                    />
                                </div>
                                <div className="password-label">
                                    <span>Подтвердите пароль</span>&nbsp;<span className="required">*</span>
                                    <UnicornShyInput
                                        props={{ className: "password-input", type:"password", name: "password", autoComplete:"current-password" }}
                                        inputRef={this.authRefs.register.password2} shy={this.state.shyUnicorn} rest={this.state.restUnicorn}
                                    />
                                </div>
                                <button className="login-button" onClick={() => this.setState({ isRegisterFormSecondPageOpened: false })}>&lt; Назад</button>
                                <button className="login-button" onClick={this.doRegister}>Регистрация</button>
                            </div>
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