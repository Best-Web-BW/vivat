import { useRef } from "react";
import ContentHeader from "../components/common/ContentHeader";

export default function ForgotPassword() {
    const emailRef = useRef();
    const submit = () => { /* do something */};

    return (
        <>
            <ContentHeader class="forgot-password" pages={[["forgot-password", "Забыли пароль?"]]}>
                <p>
                    Прежде всего, команда КСК "Виват, Россия!" ценит Вашу безопасность как во время пребывания в комплексе, так и во время пребывания на нашемм веб-сервисе. 
                    Если Вы забыли пароль от Вашей учетной записи, пожалуйста, введите свой адрес электронной почты, который использовался при регистрации, и мы пришлем Вам более подробную инструкцию.
                </p>
            </ContentHeader>
            <div className="forgot-password-block content-block">
                    <div className="forgot-password-input-wrapper">
                        <p>
                            Введите адрес электронной почты,
                            <br />
                            который был указан при регистрации:
                        </p>
                        <input ref={emailRef} type="email" name="email" className="forgot-password-input" placeholder="example@gmail.com" />
                    </div>
                    <button className="forgot-password-button" onClick={submit}>Подтвердить</button>

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
                            <p>
                                Введите корректный адрес электронной почты. Например:
                                <br />
                                example@gmail.com
                            </p>
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
                            <p>Заявка отправлена! В течение нескольких минут Вам на почту придет сообщение с инструкцией.</p>
                            <button
                                className="warrning-success-modal-button"
                                onClick={() => {
                                    // setSuccessCreateModalOpened(false);
                                    // setTimeout(() => Router.reload(), 600);
                                }}
                            >Ок</button>
                        </div>
                    </div>
            </div>
        </>
    );
}