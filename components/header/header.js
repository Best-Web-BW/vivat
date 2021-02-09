import React from "react";
import Link from "next/link";
import Unicorn, { UnicornFollowInput, UnicornShyInput } from "../common/Unicorn";
import AuthProvider, { AuthVariableComponent } from "../../utils/providers/AuthProvider";

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
            profilePreviewName: ""
        };
        global.header = this;

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
                    window.unicorn?.directlyUpdateProps({
                        mode: this.unicorn.mode,
                        angle: this.unicorn.followAngle
                    });
                }, doTimeout ? 200 : 0);
            }
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

                if(success) (this.toggleSignForm(), alert("Успешный вход!"));
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
            const firstName = this.authRefs.register.name.first.current.value;
            const secondName = this.authRefs.register.name.second.current.value;
            const middleName = this.authRefs.register.name.middle.current.value;
            const birthdate = this.authRefs.register.birthdate.current.value;
            const errorMap = {
                invalid_email: "Некорректный email",
                invalid_first_name: "Некорректное имя",
                invalid_second_name: "Некорректная фамилия",
                invalid_middle_name: "Некорректное отчество",
                invalid_birthdate: "Некорректная дата рождения"
            };

            if(!/@/.test(email)) alert(errorMap.invalid_email);
            else if(!/^[a-zа-яё]{2,}$/gi.test(firstName)) alert(errorMap.invalid_first_name);
            else if(!/^[a-zа-яё]{2,}$/gi.test(secondName)) alert(errorMap.invalid_second_name);
            else if(!/^[a-zа-яё]{2,}$/gi.test(middleName)) alert(errorMap.invalid_middle_name);
            else if(!/./.test(birthdate)) alert(errorMap.invalid_birthdate);
            else {
                const [success, reasons] = await AuthProvider.register(email, { first: firstName, second: secondName, middle: middleName }, birthdate);

                if(success) (this.toggleSignForm(), alert("Успешная регистрация!"));
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
                            {<AuthVariableComponent>
                                <button className="profile-button" onMouseEnter={this.openProfileMenu} onMouseLeave={this.closeProfileMenu}>
                                    <span className="profile-icon" />
                                </button>
                                <button id="open-enter-form" className="login-button" onClick={this.toggleSignForm}>Войти</button>
                            </AuthVariableComponent>}
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
                                    inputRef={this.authRefs.login.email}
                                    onChange={this.unicorn.onFollow}
                                    onBlur={this.unicorn.onBlur}
                                    inputClassName="login-input"
                                    type="email"
                                    name="email"
                                    placeholder="example@gmail.com"
                                />
                            </label>
                            <label className="password-label">Пароль
                                <UnicornShyInput
                                    inputRef={this.authRefs.login.password}
                                    onFocus={this.unicorn.onShy}
                                    onBlur={this.unicorn.onBlur}
                                    inputClassName="password-input"
                                    type="password"
                                    name="password"
                                    autoComplete="current-password"
                                />
                            </label>
                            <div className="forgot-password-wrapper">
                                <a href="!!forgot" className="forgot-password">Забыли пароль?</a>
                            </div>
                            <button className="login-button" onClick={this.doLogin}>Войти</button>
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
                                    inputRef={this.authRefs.register.name.first}
                                    onChange={this.unicorn.onFollow}
                                    onBlur={this.unicorn.onBlur}
                                    inputClassName="surname-input"
                                    type="text"
                                    name="firstname"
                                    placeholder="Иванов"
                                />
                            </label>
                            <label className="name-label">
                                Фамилия
                                <span className="required">*</span>
                                <UnicornFollowInput
                                    inputRef={this.authRefs.register.name.second}
                                    onChange={this.unicorn.onFollow}
                                    onBlur={this.unicorn.onBlur}
                                    inputClassName="name-input"
                                    type="text"
                                    name="surname"
                                    placeholder="Иван"
                                />
                            </label>
                            <label className="middle-name-label">
                                Отчество
                                <span className="required">*</span>
                                <UnicornFollowInput
                                    inputRef={this.authRefs.register.name.middle}
                                    onChange={this.unicorn.onFollow}
                                    onBlur={this.unicorn.onBlur}
                                    inputClassName="middle-name-input"
                                    type="text"
                                    name="middlename"
                                    placeholder="Иванович"
                                />
                            </label>
                            <label className="birth-date-label">
                                Дата рождения
                                <span className="required">*</span>
                                <input ref={this.authRefs.register.birthdate} type="date" name="birthdate" className="datepicker-here" />
                            </label>
                            <label className="email-label">
                                Адрес электронной почты
                                <span className="required">*</span>
                                <UnicornFollowInput
                                    inputRef={this.authRefs.register.email}
                                    onChange={this.unicorn.onFollow}
                                    onBlur={this.unicorn.onBlur}
                                    inputClassName="email-input"
                                    type="email"
                                    name="email"
                                    placeholder="example@gmail.com"
                                />
                            </label>
                            <button className="login-button" onClick={this.doRegister}>Регистрация</button>
                        </div>
                    </div>
                </div>
                <div className={`search-wrapper ${this.state.isSearchOpened ? "opened" /*wtf*/ : ""}`}>
                    <div className="search-container">
                        <input type="text" className="search-input" placeholder="Введите поисковой запрос" />
                        <span className="search-icon" />
                    </div>
                    <span className="close-modal" onClick={this.toggleSearch}>x</span>
                </div>
            </header>
        );
    }
}