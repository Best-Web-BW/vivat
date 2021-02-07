import { useState } from "react";
import Link from "next/link";

function ProfileMenuItem({ active, name, title }) {
    return (
        <li className={`profile-menu-list-element ${active === name ? "active" : ""}`}>
            <Link href={`/account/${name}`}>
                <a>{ title }</a>
            </Link>
        </li>
    );
}

export default function ProfileMenu({ active }) {
    const [isOpened, toggle] = useState(false);

    return (
        <div className={`profile-menu-container ${isOpened ? "active" : ""}`}>
            <div className="profile-menu-content">
                <ul className="profile-menu-list">
                    <ProfileMenuItem active={active} name="profile" title="Профиль" />
                    <ProfileMenuItem active={active} name="registration" title="Регистрация на событие" />
                    <ProfileMenuItem active={active} name="my-events" title="Мои события" />
                </ul>
            </div>
            <div className="profile-menu-button" onClick={() => toggle(prev => !prev)}>
                <p>Меню профиля</p>
            </div>
        </div>
    );
}