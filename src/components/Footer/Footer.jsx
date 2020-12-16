import React from "react";
import { Link } from "react-router-dom";

class Footer extends React.Component {
    render() {
        return (
            <div className="footer-container">
                <div id="map" className="footer-map-block">MAP</div>
                <div className="footer-navigation-block">
                    <p className="footer-title">Навигация</p>
                    <ul className="footer-menu-list">
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
                        <li>
                            {/* Wtf */}
                            <a href="!!privacy">Политика конфиденциальности</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-contacts-block">
                    <p className="footer-title">Контакты</p>
                    <div className="footer-contacts-wrapper">
                        <div className="phone">
                            <a href="tel:+4950000000" className="title-contacts">+495 000 00 00</a>
                            <p className="sub-contacts">Телефон</p>
                        </div>
                        <div className="email">
                            <a href="mailto:vivat@gmail.com" className="title-contacts">vivat@gmail.com</a>
                            <p className="sub-contacts">Email</p>
                        </div>
                        <div className="address">
                            <a href="!!address" className="title-contacts">г.Москва, Замечательный проезд 1</a>
                            <p className="sub-contacts">Адрес</p>
                        </div>
                        <div className="time">
                            <p className="title-contacts">ПН-ВС 10:00 - 20:00</p>
                            <p className="sub-contacts">Время работы</p>
                        </div>
                    </div>
                </div>
                <div className="footer-row flex-row">
                    <div className="footer-copyright">
                        <p>&copy; КСК "Виват, Россия!"&nbsp;<span>2020</span>&nbsp;all rights reserved</p>
                    </div>
                    <div className="footer-developer">
                        <p>Designed and template by&nbsp;<a href="!!easyweb">EasyWeb Studio</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;