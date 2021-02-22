import AuthProvider, { AuthVariableComponent, useAuth } from "../../utils/providers/AuthProvider";
import { QueryInput } from "../common/YandexSearch";
import React, { useMemo, useState } from "react";
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

    const name = useAuth()?.name;
    const profilePreviewName = useMemo(() => name ? `${name.second} ${name.first} ${name.middle}` : null, [name])
    
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
                        <AuthVariableComponent>
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
                            <button
                                onClick={() => setAuthFormOpened(now => !now)}
                                id="open-enter-form" className="login-button"
                            >Войти</button>
                        </AuthVariableComponent>
                        <AuthVariableComponent>
                            <ProfileMenu
                                logout={() => { AuthProvider.deauthenticate(); closeProfileMenu(); }}
                                opened={profileMenuOpened} username={profilePreviewName}
                                open={openProfileMenu} close={closeProfileMenu}
                            />
                            { null }
                        </AuthVariableComponent>
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

export class _Header extends React.Component {
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
        };

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

        this.doLogout = () => {
            AuthProvider.deauthenticate();
            this.closeProfileMenu();
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
                            <button name="search" className="search-button" onClick={this.toggleSearch}>
                                <span className="search-icon" />
                            </button>
                            <AuthVariableComponent>
                                <Link href="/account/profile">
                                    <a>
                                        <button name="profile" className="profile-button" onMouseEnter={this.openProfileMenu} onMouseLeave={this.closeProfileMenu}>
                                            <span className="profile-icon" />
                                        </button>
                                    </a>
                                </Link>
                                <button id="open-enter-form" className="login-button" onClick={this.toggleSignForm}>Войти</button>
                            </AuthVariableComponent>
                            <AuthVariableComponent>
                                <UserInfo
                                    showed={this.state.isProfileMenuShowed}
                                    opened={this.state.isProfileMenuOpened}
                                    username={profilePreviewName}
                                    open={this.openProfileMenu}
                                    close={this.closeProfileMenu}
                                    logout={this.doLogout}
                                />
                                { null }
                            </AuthVariableComponent>
                        </div>
                    </div>
                </div>
                <Menu opened={this.state.isMenuOpened} close={this.toggleMenu} />
                <AuthForm
                    opened={this.state.isSignFormOpened}
                    close={() => this.toggleSignForm(false)}
                    active={this.state.isLoginFormOpened ? "login" : "register"}
                    setActive={active => this.switchSignForm(active !== "login")}
                />
                <div className={`search-wrapper ${this.state.isSearchOpened && "opened"}`}>
                    <div className="search-container">
                        <QueryInput />
                    </div>
                    <span className="close-modal" onClick={this.toggleSearch}>x</span>
                </div>
            </header>
        );
    }
}