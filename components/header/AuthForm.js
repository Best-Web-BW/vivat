import { SuccessModal, ErrorModal, DefaultErrorModal } from "../common/Modals";
import Unicorn, { UnicornFollowInput, UnicornShyInput } from "./Unicorn";
import { useCallback, useMemo, useRef, useState } from "react";
import AuthProvider from "../../utils/providers/AuthProvider";
import DatePicker from "../common/DatePicker";
import { sleep } from "../../utils/common";
import Link from "next/link";

function Required({ text }) {
    return (<>
        <span>{ text }</span>&nbsp;<span className="required">*</span>
    </>);
}

export default function AuthForm({ opened, close, active, setActive }) {
    const [unicorn, setUnicorn] = useState({ });
    const setListeners = useCallback(async ({ rest, follow, shy }) => setUnicorn({ rest, follow, shy }), []);

    const [successModal, setSuccessModal] = useState(null);
    const [errorModal, setErrorModal] = useState(null);
    const [defaultErrorModal, setDefaultErrorModal] = useState(false);

    const [openedPage, setOpenedPage] = useState(1);

    const refs = {
        loginForm: useRef(),
        registerPage1: useRef(),
        registerPage2: useRef(),
        login: {
            email: useRef(),
            password: useRef()
        },
        register: {
            email: useRef(),
            name: {
                first: useRef(),
                second: useRef(),
                middle: useRef()
            },
            password1: useRef(),
            password2: useRef()
        }
    };

    const doLogin = useCallback(async () => {
        const email = refs.login.email.current.value;
        const password = refs.login.password.current.value;

        if(!/@/.test(email)) setErrorModal("Некорректный email.");
        else if(!password.length) setErrorModal("Некорректный пароль.");
        else {
            const [success, reason] = await AuthProvider.authenticate(email, password);

            if(success) setSuccessModal("Успешный вход!");
            else if(reason === "invalid_email" || reason === "invalid_password") setErrorModal("Неверная комбинация email и пароля.");
            else if(reason === "not_verified") setErrorModal("Пользователь не подтвердил свой email.");
            else setDefaultErrorModal(true);
        }
    }, []);

    const [selectedBirthdate, setSelectedBirthdate] = useState(new Date());
    const doRegister = useCallback(async () => {
        const email = refs.register.email.current.value;
        const name = {
            first: refs.register.name.first.current.value,
            second: refs.register.name.second.current.value,
            middle: refs.register.name.middle.current.value
        };
        const birthdate = selectedBirthdate.toISOString();
        const password1 = refs.register.password1.current.value;
        const password2 = refs.register.password2.current.value;
        const errorMap = {
            invalid_email: "Некорректный email.",
            invalid_first_name: "Некорректное имя.",
            invalid_second_name: "Некорректная фамилия.",
            invalid_middle_name: "Некорректное отчество.",
            invalid_birthdate: "Некорректная дата рождения.",
            invalid_password: "Пароль не соответствует требованиям.",
            different_passwords: "Пароли не совпадают."
        };

        if(!/@/.test(email)) setErrorModal(errorMap.invalid_email);
        else if(!/^[a-zа-яё]{2,}$/gi.test(name.first)) setErrorModal(errorMap.invalid_first_name);
        else if(!/^[a-zа-яё]{2,}$/gi.test(name.second)) setErrorModal(errorMap.invalid_second_name);
        else if(!/^[a-zа-яё]{2,}$/gi.test(name.middle)) setErrorModal(errorMap.invalid_middle_name);
        else if(!/./.test(birthdate)) setErrorModal(errorMap.invalid_birthdate);
        else if(!(
            /[A-Z]/.test(password1) &&
            /[a-z]/.test(password1) &&
            /[0-9]/.test(password1) &&
            password1.length >= 8
        )) setErrorModal(errorMap.invalid_password);
        else if(password1 !== password2) setErrorModal(errorMap.different_passwords);
        else {
            const result = await AuthProvider.register(email, name, birthdate, password1);

            if(result.success) setSuccessModal("Успешная регистрация!");
            else if(result.reason === "email_busy") {
                setErrorModal(`
                    Пользователь с таким email уже зарегистрирован. 
                    Войдите в свою учётную запись или воспользуйтесь формой восстановления пароля.
                `);
            } else setDefaultErrorModal(true);
        }
    }, []);

    const isLogin = useMemo(() => active === "login", [active]);
    const isRegister = useMemo(() => !isLogin, [isLogin]);

    return (
        <div className={`modal-enter-wrapper ${opened && "opened"}`}>
            <div className="unicorn-wrapper">
                <div className="unicorn-content">
                    <Unicorn setListeners={setListeners} />
                </div>
            </div>
            <div className="modal-enter-content">
                <span className="close-modal" onClick={close}>x</span>
                <div className="modal-enter-header">
                    <button className={`modal-enter-choose ${isLogin && "active"}`} onClick={() => setActive("login")}>Войти</button>
                    <button className={`modal-enter-choose ${isRegister && "active"}`} onClick={() => setActive("register")}>Регистрация</button>
                </div>
                <form
                    ref={refs.loginForm} className="modal-enter-content-wrapper"
                    style={{ height: `${isLogin ? refs.loginForm.current?.scrollHeight : 0}px` }}
                    onSubmit={evt => (evt.preventDefault(), doLogin())}
                >
                    <p className={`login-title ${isLogin && "active"}`}>Войти</p>
                    <div className="login-label">
                        <span>Логин/email</span>
                        <UnicornFollowInput
                            props={{ className: "login-input", type: "email", placeholder: "example@gmail.com", autoComplete: "email" }}
                            inputRef={refs.login.email} {...unicorn}
                        />
                    </div>
                    <div className="password-label">
                        <span>Пароль</span>
                        <UnicornShyInput
                            props={{ className: "password-input", type:"password", autoComplete: "current-password" }}
                            inputRef={refs.login.password} {...unicorn}
                        />
                    </div>
                    <div className="forgot-password-wrapper" onClick={close}>
                        <Link href="/forgot-password">
                            <a className="forgot-password">Забыли пароль?</a>
                        </Link>
                    </div>
                    <button className="login-button">Войти</button>
                </form>
                <form
                    ref={refs.registerForm} className="modal-register-content-wrapper"
                    style={{ height: `${isRegister ? refs[`registerPage${openedPage}`].current?.scrollHeight : 0}px` }}
                    onSubmit={evt => (evt.preventDefault(), doRegister())}
                >
                    <div ref={refs.registerPage1} className={`modal-register-content-1 ${openedPage !== 1 && "disable"}`}>
                        <p className={`register-title ${isRegister && "active"}`}>Регистрация</p>
                        <div className="surname-label">
                            <Required text="Фамилия" />
                            <UnicornFollowInput
                                props={{ className: "surname-input", type: "text", placeholder: "Иванов", autoComplete: "family-name" }}
                                inputRef={refs.register.name.second} {...unicorn}
                            />
                        </div>
                        <div className="name-label">
                            <Required text="Имя" />
                            <UnicornFollowInput
                                props={{ className: "name-input", type: "text", placeholder: "Иван", autoComplete: "given-name" }}
                                inputRef={refs.register.name.first} {...unicorn}
                            />
                        </div>
                        <div className="middle-name-label">
                            <Required text="Отчество" />
                            <UnicornFollowInput
                                props={{ className: "middle-name-input", type: "text", placeholder: "Иванович", autoComplete: "additional-name" }}
                                inputRef={refs.register.name.middle} {...unicorn}
                            />
                        </div>
                        <div className="birth-date-label">
                            <Required text="Дата рождения" />
                            <DatePicker
                                dropdownMode="select" dateFormat="dd.MM.yyyy" peekNextMonth showYearDropdown
                                selected={selectedBirthdate} onChange={date => setSelectedBirthdate(date)}
                            />
                        </div>
                        <div className="email-label">
                            <Required text="Адрес электронной почты" />
                            <UnicornFollowInput
                                props={{ className: "login-input", type: "email", placeholder: "example@gmail.com", autoComplete: "email" }}
                                inputRef={refs.register.email} {...unicorn}
                            />
                        </div>
                        <a className="login-button" onClick={() => setOpenedPage(2)}>Далее &gt;</a>
                    </div>
                    <div ref={refs.registerPage2} className={`modal-register-content-2 ${openedPage === 2 && "active"}`}>
                        <div className="password-label">
                            <Required text="Придумайте пароль" />
                            <UnicornShyInput
                                props={{ className: "password-input", type:"password", autoComplete: "new-password" }}
                                inputRef={refs.register.password1} {...unicorn}
                            />
                        </div>
                        <div className="password-label">
                            <Required text="Повторите пароль" />
                            <UnicornShyInput
                                props={{ className: "password-input", type:"password", autoComplete: "new-password" }}
                                inputRef={refs.register.password2} {...unicorn}
                            />
                        </div>
                        <a className="login-button" onClick={() => setOpenedPage(1)}>&lt; Назад</a>
                        <button className="login-button">Регистрация</button>
                    </div>
                </form>
            </div>
            <SuccessModal
                close={() => { setSuccessModal(null); sleep(600).then(() => close()); }}
                opened={successModal} content={successModal}
            />
            <ErrorModal opened={errorModal} close={() => setErrorModal(null)} content={errorModal} />
            <DefaultErrorModal opened={defaultErrorModal} close={() => setDefaultErrorModal(false)} />
        </div>
    );
}