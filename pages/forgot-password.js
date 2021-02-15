import { useRef, useState } from "react";
import ContentHeader from "../components/common/ContentHeader";
import AuthProvider from "../utils/providers/AuthProvider";

export default function ForgotPassword() {
    const [errorModal, setErrorModal] = useState(false);
    const [invalidEmailModal, setInvalidEmailModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);

    const emailRef = useRef();
    const submit = async () => {
        const email = emailRef.current.value;
        if(!/@/.test(email)) return setInvalidEmailModal(true);

        const result = await AuthProvider.forgotPassword(email);
        if(result.success) setSuccessModal(true);
        else {
            console.error(result.reason);
            setErrorModal(true);
        }
    };

    return (
        <>
            <ContentHeader class="forgot-password" pages={[["forgot-password", "Забыли пароль?"]]}>
                <p>
                    Прежде всего, команда КСК "Виват, Россия!" ценит Вашу безопасность как во время пребывания в комплексе, так и во время пребывания на нашемм веб-сервисе. 
                    Если Вы забыли пароль от Вашей учетной записи, пожалуйста, введите свой адрес электронной почты, который использовался при регистрации, и мы пришлем Вам более подробную инструкцию.
                </p>
                <p>
                    Вы попали на страницу смена пароля для аккаунта на КСК "Виват, Россия!". Пожалуйста, заполните форму ниже и запомните новый пароль. После Вашего подтверждения, этот пароль будет использоваться для входа в профиль.
                </p>
            </ContentHeader>
            <div className="forgot-password-block content-block">
                <div className="forgot-password-input-email">
                    <div className="forgot-password-input-wrapper">
                        <p>
                            Введите адрес электронной почты, который был указан при регистрации:
                        </p>
                        <input ref={emailRef} type="email" name="email" className="forgot-password-input" placeholder="example@gmail.com" />
                    </div>
                    <button className="forgot-password-button" onClick={submit}>Подтвердить</button>
                </div>
                <div className="forgot-password-create-new">
                    <div className="forgot-password-input-wrapper">
                        <p>
                        <span className="required">*</span>&nbsp;Введите новый пароль:
                        </p>
                        <input ref={emailRef} type="email" name="email" className="forgot-password-input" placeholder="example@gmail.com" />
                    </div>
                    <div className="forgot-password-input-wrapper">
                        <p>
                        <span className="required">*</span>&nbsp;Повторите новый пароль:
                        </p>
                        <input ref={emailRef} type="email" name="email" className="forgot-password-input" placeholder="example@gmail.com" />
                    </div>
                    <button className="forgot-password-button" onClick={submit}>Подтвердить</button>
                </div>
                <div className={`modal-error-wrapper ${errorModal && "opened"}`}>
                    <div className="modal-error-content">
                        <p>Произошла ошибка. Обновите страницу и попробуйте позже.</p>
                        <button className="warning-delete-button" onClick={() => setErrorModal(false)}>Ок</button>
                    </div>
                </div>
                <div className={`modal-error-wrapper ${invalidEmailModal && "opened"}`}>
                    <div className="modal-error-content">
                        <p>
                            Введите корректный адрес электронной почты. Например:
                            <br />
                            example@gmail.com
                        </p>
                        <button className="warning-delete-button" onClick={() => setInvalidEmailModal(false)}>Ок</button>
                    </div>
                </div>
                <div className={`warning-success-modal ${successModal && "opened"}`}>
                    <div className="warning-success-modal-content">
                        <span className="close-modal" onClick={() => setSuccessModal(false)}>X</span>
                        <p>Заявка отправлена! В течение нескольких минут Вам на почту придет сообщение с инструкцией.</p>
                        <button className="warrning-success-modal-button" onClick={() => setSuccessModal(false)}>Ок</button>
                    </div>
                </div>
            </div>
        </>
    );
}