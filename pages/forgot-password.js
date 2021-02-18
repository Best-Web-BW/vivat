import Router from "next/router";
import { useRef, useState } from "react";
import ContentHeader from "../components/common/ContentHeader";
import { DefaultErrorModal, ErrorModal, SuccessModal } from "../components/common/Modals";
import { sleep } from "../utils/common";
import AuthProvider from "../utils/providers/AuthProvider";

export async function getServerSideProps({ query: { email, uuid } }) {
    if(email && uuid) {
        const result = await AuthProvider.checkForgotPassword(email, uuid);
        if(result.success) return { props: { type: "password", email, uuid } };
    }

    return { props: { type: "email" } };
}

const emailDesc = `
    Прежде всего, команда КСК "Виват, Россия!" ценит 
    Вашу безопасность как во время пребывания в комплексе, 
    так и во время пребывания на нашемм веб-сервисе. 
    Если Вы забыли пароль от Вашей учетной записи, пожалуйста, 
    введите свой адрес электронной почты, который использовался 
    при регистрации, и мы пришлем Вам более подробную инструкцию.
`;
const passwordDesc = `
    Вы попали на страницу смены пароля для аккаунта на КСК "Виват, Россия!". 
    Пожалуйста, заполните форму ниже и запомните новый пароль. 
    После Вашего подтверждения этот пароль будет использоваться для входа в профиль.
`;
export default function ForgotPassword({ type, email, uuid }) {
    const [errorModal, setErrorModal] = useState(false);

    return (<>
        <ContentHeader class="forgot-password" pages={[["forgot-password", "Забыли пароль?"]]}>
            <p>
                { type === "email" && emailDesc }
                { type === "password" && passwordDesc }
            </p>
        </ContentHeader>
        { type === "email" && <EmailContent openErrorModal={() => setErrorModal(true)} /> }
        { type === "password" && <PasswordContent openErrorModal={() => setErrorModal(true)} email={email} uuid={uuid} /> }
        <DefaultErrorModal opened={errorModal} close={() => setErrorModal(false)} />
    </>);
}

function EmailContent({ openErrorModal }) {
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
            openErrorModal();
        }

        console.log({ email });
    };

    return (<>
        <div className="forgot-password-block content-block">
            <div className="forgot-password-input-email">
                <div className="forgot-password-input-wrapper">
                    <p>Введите адрес электронной почты, который был указан при регистрации:</p>
                    <input ref={emailRef} type="email" name="email" className="forgot-password-input" placeholder="example@gmail.com" />
                </div>
                <button className="forgot-password-button" onClick={submit}>Подтвердить</button>
            </div>
        </div>
        <SuccessModal
            content="Заявка отправлена! В течение нескольких минут Вам на почту придёт сообщение с инструкцией."
            opened={successModal} close={() => setSuccessModal(false)}
        />
        <ErrorModal opened={invalidEmailModal} close={() => setInvalidEmailModal(false)}>
            <p>Введите корректный адрес электронной почты. Например:<br />example@gmail.com</p>
        </ErrorModal>
    </>);
}

function PasswordContent({ openErrorModal, email, uuid }) {
    console.log("UUID is", { email, uuid });

    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState(null);

    const passwordRef1 = useRef();
    const passwordRef2 = useRef();
    const submit = async () => {
        const password = passwordRef1.current.value;
        const password2 = passwordRef2.current.value;
        if(password !== password2) return setErrorModal("Пароли различаются.");
        if(!(
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            password.length >= 8
        )) return setErrorModal("Пароль не соответствует требованиям.");

        const result = await AuthProvider.resetPassword(email, uuid, password);
        if(result.success) {
            setSuccessModal(true)
            await AuthProvider.authenticate(email, password);
        } else {
            console.error(result.reason);
            openErrorModal();
        }

        console.log({ email, password, password2 });
    };

    return (<>
        <div className="forgot-password-block content-block">
            <div className="forgot-password-create-new">
                <div className="forgot-password-input-wrapper">
                    <p><span className="required">*</span>&nbsp;Введите новый пароль:</p>
                    <input ref={passwordRef1} type="password" name="password1" className="forgot-password-input" />
                </div>
                <div className="forgot-password-input-wrapper">
                    <p><span className="required">*</span>&nbsp;Повторите новый пароль:</p>
                    <input ref={passwordRef2} type="password" name="password2" className="forgot-password-input" />
                </div>
                <button className="forgot-password-button" onClick={submit}>Подтвердить</button>
            </div>
        </div>
        <SuccessModal
            close={() => (setSuccessModal(false), sleep(600).then(() => Router.push("/account/profile")))}
            opened={successModal} content="Пароль успешно изменён."
        />
        <ErrorModal opened={errorModal} close={() => setErrorModal(null)} content={errorModal} />
    </>);
}