import AuthProvider, { AuthVariableComponent, useAuth } from "../../utils/providers/AuthProvider";
import ProfileMenu from "../../components/common/ProfileMenu";
import DatePicker from "../../components/common/DatePicker";
import { useEffect, useRef, useState } from "react";
import { toISODate } from "../../utils/common";
import Router from "next/router"

export default function Change() {
    const [user, setUser] = useState(useAuth());
    useEffect(() => {
        const interval = setInterval(() => setUser(useAuth()), 500);
        return () => clearInterval(interval);
    }, []);

    const refs = {
        name: {
            first: useRef(),
            second: useRef(),
            middle: useRef(),
        },
        birthdate: useRef(),
        email: useRef(),
        phone: useRef(),
        address: useRef(),
        sex: {
            male: useRef(),
            female: useRef()
        },
        password: {
            current: useRef(),
            new1: useRef(),
            new2: useRef()
        }
    };

    const crawl = () => ({
        name: {
            first: refs.name.first.current.value,
            second: refs.name.second.current.value,
            middle: refs.name.middle.current.value
        },
        birthdate: toISODate(birthdate),
        email: refs.email.current.value,
        phone: refs.phone.current.value,
        address: refs.address.current.value,
        sex: refs.sex.male.current.checked ? "male" : "female",
        password: {
            current: refs.password.current.current.value,
            new1: refs.password.new1.current.value,
            new2: refs.password.new2.current.value
        }
    });

    const submit = async () => {
        const data = crawl();

        const isPasswordChanged = data.password.new1.length || data.password.new2.length;
        if(isPasswordChanged) {
            const newPassword = data.password.new1;
            if(!data.password.current.length) return alert("Для изменения пароля Вы должны ввести свой текущий пароль");
            if(newPassword !== data.password.new2) return alert("Введённые пароли не совпадают");
            if(!(
                /[A-Z]/.test(newPassword) &&
                /[a-z]/.test(newPassword) &&
                /[0-9]/.test(newPassword) &&
                newPassword.length >= 8
            )) return alert("Новый пароль не соответствует требованиям");

            data.password.new2 = undefined;
        }

        const result = await AuthProvider.change(data);
        if(result.success) {
            alert("Данные успешно изменены");
            Router.push("/account/profile");
        } else {
            console.log(result.reason);
            alert("Произошла ошибка");
        }
    }
    
    const [birthdate, setBirthdate] = useState(new Date());
    useEffect(() => user && setBirthdate(new Date(user.birthdate)), [user]);

    return (
        <AuthVariableComponent>
            <div className="profile-content content-block">
                <ProfileMenu active="change" />
                <div className="profile-row flex-row">
                    <div className="personal-wrapper">
                        <div className="profile-photo-wrapper" onClick={() => console.log(crawl())}>
                            <img src="/images/profile/114296480-businessman-avatar-icon-profession-logo-male-character-a-man-in-suit-people-specialists-flat-simple-.jpg" alt="" width="100%" />
                        </div>
                        {/* <div className="change-photo-wrapper">
                            <span className="change-photo"></span>
                        </div> */}
                        <div className="profile-name">
                            <p className="name-p">{ user && (({ second, first, middle }) => `${second} ${first} ${middle}`)(user.name) }</p>
                            <p className="state-p"><span>RU</span>,<span>Moscow</span></p>
                        </div>
                    </div>
                    <div className="end-profile-wrapper">
                        <button className="login-button" onClick={() => AuthProvider.deauthenticate()}>Выход</button>
                    </div>
                </div>
                <div className="profile-row flex-row">
                    <label className="profile-element-wrapper">
                        <p className="name-title"><span className="required">*</span>ФИО</p>
                        <input ref={refs.name.second} type="text" name="secondname" className="surname-data-input" placeholder="Иванов" defaultValue={user ? user.name.second : ""} />
                        <input ref={refs.name.first} type="text" name="firstname" className="name-data-input" placeholder="Иван" defaultValue={user ? user.name.first : ""} />
                        <input ref={refs.name.middle} type="text" name="middlename" className="middle-name-data-input" placeholder="Иванович" defaultValue={user ? user.name.middle : ""} />
                    </label>
                    <label className="profile-element-wrapper">
                        <p className="birthday-title"><span className="required">*</span>Дата рождения:</p>
                        <DatePicker 
                            selected={birthdate} 
                            onChange={date => setBirthdate(date)}
                            peekNextMonth
                            showYearDropdown
                            dropdownMode="select"
                            dateFormat="dd.MM.yyyy"
                        />
                    </label>
                    <label className="profile-element-wrapper">
                        <p className="email-title"><span className="required">*</span>email:</p>
                        <input ref={refs.email} type="email" name="email" className="email-data-input" placeholder="example@gmail.com" defaultValue={user ? user.email : ""} />
                    </label>
                    <label className="profile-element-wrapper">
                        <p className="phone-title"><span className="required">*</span>Номер телефон:</p>
                        <input ref={refs.phone} type="phone" name="phone" className="phone-data-input" placeholder="+7 (900) 000 00 00" defaultValue={user ? user.phone : ""} />
                    </label>
                    <label className="profile-element-wrapper">
                        <p className="address-title"><span className="required">*</span>Адрес</p>
                        <input ref={refs.address} type="address" name="address" className="address-data-input" placeholder="Россия, Москва, Замечательный проед, 1" defaultValue={user ? user.address : ""}  />
                    </label>
                    <div className="profile-element-wrapper">
                        <p className="gender-title"><span className="required">*</span>Пол:</p>
                        <input ref={refs.sex.male} type="radio" id="male" name="sex" className="custom-checkbox" defaultChecked={user && user.sex === "male"} />
                        <label className="gender-input" htmlFor="male">
                            Мужской
                        </label>
                        <input ref={refs.sex.female} type="radio" id="female" name="sex" className="custom-checkbox" defaultChecked={user && user.sex === "female"} />
                        <label className="gender-input" htmlFor="female">
                            Женский
                        </label>
                    </div>
                    <br />
                    <p>Настройки безопасности</p>
                    <br />
                    <label className="profile-element-wrapper">
                        <p className="email-title">Старый пароль:</p>
                        <input ref={refs.password.current} type="password" name="password" className="email-data-input" />
                    </label>
                    <label className="profile-element-wrapper">
                        <p className="email-title">Новый пароль:</p>
                        <input ref={refs.password.new1} type="password" name="new-password1" className="email-data-input" />
                    </label>
                    <label className="profile-element-wrapper">
                        <p className="email-title">Новый пароль еще раз:</p>
                        <input ref={refs.password.new2} type="password" name="new-password2" className="email-data-input" />
                    </label>
                </div>
                <div className="profile-row flex-row">
                    <div className="change-button-wrapper">
                        <button className="change-button" onClick={submit}>Сохранить</button>
                    </div>
                </div>
            </div>

            <div className="modal-error-wrapper">
                <div className="modal-error-content">
                    <p>Произошла ошибка. Обновите страницу и попробуйте позже.</p>
                    <button
                        className="warning-delete-button"
                        onClick={() => {
                            // removeAlbum(removeID);
                            // setDeleteModalOpened(false);
                        }}
                    >Ок</button>
                </div>
            </div>
            <div className="modal-error-wrapper">
                <div className="modal-error-content">
                    <p>Неправильно заполненное поле "input-name"</p>
                    <button
                        className="warning-delete-button"
                        onClick={() => {
                            // removeAlbum(removeID);
                            // setDeleteModalOpened(false);
                        }}
                    >Ок</button>
                </div>
            </div>
            <div className="warning-success-modal">
                <div className="warning-success-modal-content">
                    <span
                        className="close-modal"
                        onClick={() => {
                            // setSuccessCreateModalOpened(false);
                            // setTimeout(() => Router.reload(), 600);
                        }}
                    >X</span>
                    <p>Данные успешно изменены!</p>
                    <button
                        className="warrning-success-modal-button"
                        onClick={() => {
                            // setSuccessCreateModalOpened(false);
                            // setTimeout(() => Router.reload(), 600);
                        }}
                    >Ок</button>
                </div>
            </div>
            <div />
        </AuthVariableComponent>
    );
}