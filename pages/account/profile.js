import Link from "next/link";
import ProfileMenu from "../../components/common/ProfileMenu";

export default function Profile() {
    return (
        <div className="profile-content content-block">
            <ProfileMenu active="profile" />
            <div className="profile-row flex-row">
                <div className="personal-wrapper">
                    <div className="profile-photo-wrapper">
                        { /* why can't someone just rename files? */ }
                        <img src="/images/profile/114296480-businessman-avatar-icon-profession-logo-male-character-a-man-in-suit-people-specialists-flat-simple-.jpg" alt="" width="100%" />
                    </div>
                    <div className="profile-name">
                        <p className="name-p">Иванов Иван Иванович</p>
                        <p className="state-p"><span>RU</span>, <span>Moscow</span></p>
                    </div>
                </div>
                <div className="end-profile-wrapper">
                    <button className="login-button">Выход</button>
                </div>
            </div>
            <div className="profile-row flex-row">
                <div className="profile-element-wrapper">
                    <p className="birthday-title">Дата рождения:</p>
                    <p className="birthday-data">11.11.1990</p>
                </div>
                <div className="profile-element-wrapper">
                    <p className="email-title">email:</p>
                    <p className="email-data">example@gmail.com</p>
                </div>
                <div className="profile-element-wrapper">
                    <p className="phone-title">Номер телефон:</p>
                    <p className="phone-data">+7 (900) 000 00 00</p>
                </div>
                <div className="profile-element-wrapper">
                    <p className="address-title">Адрес</p>
                    <p className="address-data">Россия, Москва, Замечательный проед, 1</p>
                </div>
                <div className="profile-element-wrapper">
                    <p className="gender-title">Пол:</p>
                    <p className="gender-data">Мужской</p>
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
    );
}