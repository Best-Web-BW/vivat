import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <div>
                <div className="header-container">
                    <div className="flex-row">
                        <div className="col-1-2 menu-button-container">
                            <button className="menu-button">
                                <div className="menu-ind">
                                    <div className="line" />
                                    <div className="line" />
                                </div>
                                <span>Меню</span>
                            </button>
                        </div>
                        <div className="col-1-2 login-button-container">
                            <button className="search-button">
                                <span className="search-icon" />
                            </button>
                            <button className="profile-button">
                                <span className="profile-icon" />
                            </button>
                            <button id="open-enter-form" className="login-button">Войти</button>
                            <div className="profile-preview-wrapper">
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
                <div className="modal-menu">
                    <div className="menu-list-wrapper">
                        <ul className="menu-list">
                            <li>
                                <Link to="/home">Главная</Link>
                            </li>
                            <li>
                                <Link to="/about">О нас</Link>
                            </li>
                            <li>
                                <Link to="/gallery">Галерея</Link>
                            </li>
                            <li>
                                <Link to="/services">Услуги и аренда</Link>
                            </li>
                            <li>
                                <Link to="/events">Мероприятия</Link>
                            </li>
                            <li>
                                <Link to="/news">Новости</Link>
                            </li>
                            <li>
                                <Link to="/contacts">Контакты</Link>
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
                <div className="modal-enter-wrapper">
                    <div className="unicorn-wrapper">
                        <div className="unicorn-content">
                            <img src="/images/unicorn/1.png" alt="" width="100%" />
                        </div>
                    </div>
                    <div className="modal-enter-content">
                        <span className="close-modal">x</span>
                        <div className="modal-enter-header">
                            <button className="modal-enter-choose">Войти</button>
                            <button className="modal-enter-choose">Регистрация</button>
                        </div>
                        <div className="modal-enter-content-wrapper">
                            <p className="login-title">Войти</p>
                            <label className="login-label">
                                Логин/email
                                <input className="login-input" type="text" placeholder="example@gmail.com" />
                            </label>
                            <label className="password-label">Пароль
                                <input type="text" className="password-input" />
                            </label>
                            <div className="forgot-password-wrapper">
                                <a href="!!forgot" className="forgot-password">Забыли пароль?</a>
                            </div>
                            <button className="login-button">Войти</button>
                        </div>
                        <div className="modal-register-content-wrapper">
                            <p className="register-title">Регистрация</p>
                            <label className="surname-label">
                                Имя
                                <span className="required">*</span>
                                <input type="text" className="surname-input" placeholder="Иванов" />
                            </label>
                            <label className="name-label">
                                Фамилия
                                <span className="required">*</span>
                                <input type="text" className="name-input" placeholder="Иван" />
                            </label>
                            <label className="middle-name-label">
                                Отчество
                                <span className="required">*</span>
                                <input type="text" className="middle-name-input" placeholder="Иванович" />
                            </label>
                            <label className="birth-date-label">
                                Дата рождения
                                <span className="required">*</span>
                                <input type="text" className="datepicker-here" />
                            </label>
                            <label className="email-label">
                                Адрес электронной почты
                                <span className="required">*</span>
                                <input type="text" className="email-input" placeholder="example@gmail.com" />
                            </label>
                            <button className="login-button">Регистрация</button>
                        </div>
                    </div>
                </div>
                <div className="search-wrapper">
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