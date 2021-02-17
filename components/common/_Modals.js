export function SuccessModal({ opened, close, cross = true, content, children }) {
    return (
        <div className={`warning-success-modal ${opened && "opened"}`}>
            <div className="warning-success-modal-content">
                { cross && (<span className="close-modal" onClick={close}>X</span>) }
                { children ?? (<p>{ content }</p>) }
                <button className="warrning-success-modal-button" onClick={close}>Ок</button>
            </div>
        </div>
    );
}

export function WarningModal({ opened, submit, cancel, cross = true, content, children }) {
    return (
        <div className={`warning-delete-modal ${opened && "opened"}`}>
            <div className="warning-delete-modal-content">
                { cross && (<span className="close-modal" onClick={cancel}>X</span>) }
                { children ?? (<p>{ content }</p>) }
                <button className="warning-delete-button" onClick={submit}>Да</button>
                <button className="warning-delete-button-no" onClick={cancel}>Нет</button>
            </div>
        </div>
    );
}

export function ErrorModal({ opened, close, cross = true, content, children }) {
    return (
        <div className={`modal-error-wrapper ${opened && "opened"}`}>
            <div className="modal-error-content">
                { cross && (<span className="close-modal" onClick={close}>X</span>) }
                { children ?? (<p>{ content }</p>) }
                <button className="warning-delete-button" onClick={close}>Ок</button>
            </div>
        </div>
    );
}

const defaultErrorModalContent = "Произошла ошибка. Обновите страницу и попробуйте позже.";
export const DefaultErrorModal = props => <ErrorModal {...props} content={defaultErrorModalContent} />;