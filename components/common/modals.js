import { useRef } from "react";

export default function modals() {

    return (
        <div>
            <div className="modal-error-wrapper">
                        <div className="modal-error-content">
                            <p>Произошла ошибка. Обновите страницу и попробуйте позже.</p>
                            <button
                                className="warning-delete-button"
                                onClick={() => {
                                    removeAlbum(removeID);
                                    setDeleteModalOpened(false);
                                }}
                            >Ок</button>
                        </div>
                    </div>
                    <div className="modal-error-wrapper">
                        <div className="modal-error-content">
                            <p>Неправильно заполненое поле "input-name"</p>
                            <button
                                className="warning-delete-button"
                                onClick={() => {
                                    removeAlbum(removeID);
                                    setDeleteModalOpened(false);
                                }}
                            >Ок</button>
                        </div>
                    </div>
                    <div className="warning-success-modal">
                        <div className="warning-success-modal-content">
                            <span
                                className="close-modal"
                                onClick={() => {
                                    setSuccessCreateModalOpened(false);
                                    setTimeout(() => Router.reload(), 600);
                                }}
                            >X</span>
                            <p>Регистрация прошла успешно! Пожалуйста, подтвердите свой профиль, следуя инструкции на Вашей электронной почте!</p>
                            <button
                                className="warrning-success-modal-button"
                                onClick={() => {
                                    setSuccessCreateModalOpened(false);
                                    setTimeout(() => Router.reload(), 600);
                                }}
                            >Ок</button>
                        </div>
                    </div>
        </div>
    );
}