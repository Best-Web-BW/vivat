import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../utils/providers/AuthProvider";

export default function ProfileMenu({ opened: newOpened, open, close, logout }) {
    const [opened, setOpened] = useState(false);
    const [showed, setShowed] = useState(false);
    
    const animationDuration = 600;
    const [openTimeout, setOpenTimeout] = useState();
    const [closeTimeouts, setCloseTimeouts] = useState([]);

    const clearTimeouts = useCallback(() => {
        clearTimeout(openTimeout);
        clearTimeout(closeTimeouts[0]);
        clearTimeout(closeTimeouts[1]);
    }, [openTimeout, closeTimeouts]);

    useEffect(() => {
        clearTimeouts();
        if(newOpened) {
            setOpened(true);
            setOpenTimeout(setTimeout(() => setShowed(true), animationDuration));
        } else {
            setCloseTimeouts([
                setTimeout(() => setShowed(false), animationDuration),
                setTimeout(() => setOpened(false), animationDuration * 2)
            ]);
        }
        return clearTimeouts;
    }, [opened === newOpened]);

    const user = useAuth();
    const name = user?.name;

    return (
        <div
            className={`profile-preview-wrapper ${showed && "showed"}`}
            style={{ display: opened ? "block" : "none" }}
            onMouseEnter={open} onMouseLeave={close}
        >
            <div className="profile-preview-row">
                <div className="profile-preview-photo">
                    <img src={user && user.image.url} alt="" width="100%" />
                </div>
                <div className="profile-preview-data">
                    <div className="profile-preview-name">
                        <p>{ name && `${name.second} ${name.first} ${name.middle}` }</p>
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
                <button className="profile-preview-button" onClick={logout}>Выйти</button>
            </div>
        </div>
    );
}