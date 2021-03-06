import AuthProvider, { ForUser, useAuth } from "../../utils/providers/AuthProvider";
import ProfileMenu from "../../components/common/ProfileMenu";
import { ErrorModal } from "../../components/common/Modals";
import { toRuDate, sleep } from "../../utils/common";
import { useEffect, useState } from "react";
import { withRouter } from "next/router";
import Link from "next/link";

const DO_LOG = false;

export default withRouter(_Profile);

function _Profile({ router }) {
    const [errorModal, setErrorModal] = useState(false);
    const [content, setContent] = useState(null);
    useEffect(async () => {
        if(!router.isReady) return;

        const { verify_email, email, uuid } = router.query;
        if(!verify_email) { setContent(<Profile />); return; }

        const result = await AuthProvider.verifyEmail(email, uuid );
        DO_LOG && console.log(result);
        if(result.success) {
            await AuthProvider.refreshTokens();
            setContent(<Profile />);
        } else {
            console.error(result.reason);
            setErrorModal(true);
        }
    }, [router.isReady]);

    return (<>
        { content }
        <ErrorModal
            close={() => (setErrorModal(false), sleep(600).then(() => router.push("/home")))}
            opened={errorModal} content="Ссылка подтверждения недействительна."
        />
    </>);
}

function Profile() {
    const [user, setUser] = useState(useAuth());
    useEffect(() => {
        const interval = setInterval(() => setUser(useAuth()), 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <ForUser>
            <div className="profile-content content-block">
                <ProfileMenu active="profile" />
                <div className="profile-row flex-row">
                    <div className="personal-wrapper">
                        <div className="profile-photo-wrapper">
                            <img src={user && user.image.url} alt="" width="100%" />
                        </div>
                        <div className="profile-name">
                            <p className="name-p">{
                                user && (({ second, first, middle }) => `${second} ${first} ${middle}`)(user.name)
                            }</p>
                            <p className="state-p"><span>RU</span>, <span>Moscow</span></p>
                        </div>
                    </div>
                    <div className="end-profile-wrapper">
                        <button className="login-button" onClick={() => AuthProvider.deauthenticate()}>Выход</button>
                    </div>
                </div>
                <div className="profile-row flex-row">
                    <div className="profile-element-wrapper">
                        <p className="birthday-title">Дата рождения:</p>
                        <p className="birthday-data">{ user && toRuDate(user.birthdate) }</p>
                    </div>
                    <div className="profile-element-wrapper">
                        <p className="email-title">email:</p>
                        <p className="email-data">{ user && user.email }</p>
                    </div>
                    <div className="profile-element-wrapper">
                        <p className="phone-title">Номер телефон:</p>
                        <p className="phone-data">{ user && user.phone }</p>
                    </div>
                    <div className="profile-element-wrapper">
                        <p className="address-title">Адрес</p>
                        <p className="address-data">{ user && user.address }</p>
                    </div>
                    <div className="profile-element-wrapper">
                        <p className="gender-title">Пол:</p>
                        <p className="gender-data">{ user && (user.sex === "male" ? "Мужской" : "Женский") }</p>
                    </div>
                </div>
                <div className="profile-row flex-row">
                    <div className="change-button-wrapper">
                        <Link href="/account/change">
                            <a> 
                                <button className="change-button">Изменить</button>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </ForUser>
    );
}