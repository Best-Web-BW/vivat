import AuthProvider, { ForGuest, ForUser } from "../../utils/providers/AuthProvider";
import { QueryInput } from "../common/YandexSearch";
import React, { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import AuthForm from "./AuthForm";
import Link from "next/link";
import Menu from "./Menu";

export default function Header() {
    const [menuOpened, setMenuOpened] = useState();
    const [searchOpened, setSearchOpened] = useState();
    const [authFormOpened, setAuthFormOpened] = useState();
    const [authFormMode, setAuthFormMode] = useState("login");
    const [profileMenuOpened, setProfileMenuOpened] = useState(false);
    const openProfileMenu = () => setProfileMenuOpened(true);
    const closeProfileMenu = () => setProfileMenuOpened(false);
    
    return (
        <header>
            <div className="header-container">
                <div className="flex-row">
                    <div className="col-1-2 menu-button-container">
                        <button
                            className={`menu-button ${menuOpened && "active"}`}
                            onClick={() => setMenuOpened(now => !now)}
                        >
                            <div className="menu-ind">
                                <div className="line" />
                                <div className="line" />
                            </div>
                            <span>Меню</span>
                        </button>
                    </div>
                    <div className="col-1-2 login-button-container">
                        <button
                            onClick={() => setSearchOpened(now => !now)}
                            name="search" className="search-button"
                        >
                            <span className="search-icon" />
                        </button>
                        <ForUser>
                            <Link href="/account/profile">
                                <a>
                                    <button
                                        name="profile" className="profile-button"
                                        onMouseLeave={closeProfileMenu}
                                        onMouseEnter={openProfileMenu}
                                    >
                                        <span className="profile-icon" />
                                    </button>
                                </a>
                            </Link>
                            <ProfileMenu
                                logout={() => { AuthProvider.deauthenticate(); closeProfileMenu(); }}
                                open={openProfileMenu} close={closeProfileMenu}
                                opened={profileMenuOpened}
                            />
                        </ForUser>
                        <ForGuest>
                            <button
                                onClick={() => setAuthFormOpened(now => !now)}
                                id="open-enter-form" className="login-button"
                            >Войти</button>
                        </ForGuest>
                    </div>
                </div>
            </div>
            <Menu opened={menuOpened} close={() => setMenuOpened()} />
            <AuthForm
                opened={authFormOpened} close={() => setAuthFormOpened()}
                active={authFormMode} setActive={setAuthFormMode}
            />
            <div className={`search-wrapper ${searchOpened && "opened"}`}>
                <div className="search-container">
                    <QueryInput />
                </div>
                <span className="close-modal" onClick={() => setSearchOpened()}>x</span>
            </div>
        </header>
    );
}