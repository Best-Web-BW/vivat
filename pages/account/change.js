import ProfileMenu from "../../components/common/ProfileMenu";

export default function Change() {
    return (
        <div className="profile-content content-block">
            <ProfileMenu active="change" />
            <div className="profile-row flex-row">
                <div className="personal-wrapper">
                    <div className="profile-photo-wrapper">
                        <img src="/images/profile/114296480-businessman-avatar-icon-profession-logo-male-character-a-man-in-suit-people-specialists-flat-simple-.jpg" alt="" width="100%" />
                    </div>
                    <div className="change-photo-wrapper">
                        <span className="change-photo"></span>
                    </div>
                    <div className="profile-name">
                        <p className="name-p">Иванов Иван Иванович</p>
                        <p className="state-p"><span>RU</span>,<span>Moscow</span></p>
                    </div>
                </div>
                <div className="end-profile-wrapper">
                    <button className="login-button">Выход</button>
                </div>
            </div>
            <div className="profile-row flex-row">
                <label className="profile-element-wrapper">
                    <p className="name-title"><span className="required">*</span>ФИО</p>
                    <input className="surname-data-input" placeholder="Иванов" />
                    <input className="name-data-input" placeholder="Иван" />
                    <input className="middle-name-data-input" placeholder="Иванович" />
                </label>
                <label className="profile-element-wrapper">
                    <p className="birthday-title"><span className="required">*</span>Дата рождения:</p>
                    <input className="datepicker-here" placeholder="11.11.1990" />
                </label>
                <label className="profile-element-wrapper">
                    <p className="email-title"><span className="required">*</span>email:</p>
                    <input className="email-data-input" placeholder="example@gmail.com" />
                </label>
                <label className="profile-element-wrapper">
                    <p className="phone-title"><span className="required">*</span>Номер телефон:</p>
                    <input className="phone-data-input" placeholder="+7 (900) 000 00 00" />
                </label>
                <label className="profile-element-wrapper">
                    <p className="address-title"><span className="required">*</span>Адрес</p>
                    <input className="address-data-input" placeholder="Россия, Москва, Замечательный проед, 1" />
                </label>
                <div className="profile-element-wrapper">
                    <p className="gender-title"><span className="required">*</span>Пол:</p>
                    <input type="checkbox" id="male" className="custom-checkbox" />
                    <label className="gender-input" htmlFor="male">
                        Мужской
                    </label>
                    <input type="checkbox" id="female" className="custom-checkbox" />
                    <label className="gender-input" htmlFor="female">
                        Женский
                    </label>
                </div>
            </div>
            <div className="profile-row flex-row">
                <div className="change-button-wrapper">
                    <button className="change-button">Сохранить</button>
                </div>
            </div>
        </div>
    );
}