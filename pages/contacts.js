import { useRef, useState } from "react";
import ContentHeader from "../components/common/ContentHeader";
import MailProvider from "../utils/providers/MailProvider";
import { DefaultErrorModal, ErrorModal, SuccessModal } from "../components/common/Modals";

export default function Contacts() {
    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState(null);
    const [defaultErrorModal, setDefaultErrorModal] = useState(false);

    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const textRef = useRef();
    const submit = async () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value;
        const text = textRef.current.value;

        if(!/@/.test(email)) return setErrorModal("Неверно введена почта.");
        else if(!/^[a-zа-яё ]+$/gi.test(name)) return setErrorModal("Неверно введено имя.");
        else if(!/(.|[\r\n \s\t])+/.test(text)) return setErrorModal("Неверно введён текст вопроса.");
        else if(!/^(\+7|8)\d{10}$/.test(phone)) return setErrorModal("Неверно введён номер телефона.");

        try {
            const result = await MailProvider.sendFeedbackEmail(name, email, phone, text);
            if(result.success) {
                setSuccessModal(true);
                nameRef.current.value = "";
                emailRef.current.value = "";
                phoneRef.current.value = "";
                textRef.current.value = "";
            } else {
                setDefaultErrorModal(true);
                console.log({ result });
            }
        } catch(e) {
            setDefaultErrorModal(true);
            console.log({ result });
        }
    }

    return (<>
        <ContentHeader wrapperClass="contacts" pages={[["contacts", "Контакты"]]}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illo id beatae dolores recusandae
            et repellat ratione! Culpa accusamus consequatur quae ipsam quidem, reiciendis distinctio
            ratione aut dolore praesentium omnis quis nam modi ea architecto eveniet sunt exercitationem,
            totam quas aperiam cupiditate harum vero ex nihil. Aut nisi adipisci amet fugit, aliquid vel
            temporibus quos id provident, esse illo explicabo animi inventore at numquam? Accusantium ab
            dolor odit repudiandae possimus tempora eveniet autem, reprehenderit voluptatum consectetur nemo
            ipsam nesciunt consequuntur sequi fuga odio voluptatem, natus pariatur ullam temporibus sint
            rerum consequatur. Quibusdam quod sapiente debitis nulla, ad omnis ratione minima.
        </ContentHeader>
        <div className="contacts-content content-block">
            <div className="left-column">
                <div className="contacts-title">
                    <h2>Вы можете связаться с нами:</h2>
                </div>
                <div className="contacts-details-wrapper">
                    <div className="contacts-row">
                        <p>Телефон</p>
                        <a href="tel:+4950000000">+495 000 00 00</a>
                    </div>
                    <div className="contacts-row">
                        <p>Email</p>
                        <a href="mailto:example@gmail.com">example@gmail.com</a>
                    </div>
                    <div className="contacts-row">
                        <p>Адрес</p>
                        <a href="!!???">г.Москва, Замечательный проспект 1</a>
                    </div>
                    <div className="contacts-row">
                        <p>Часы работы</p>
                        <a href="!!???">Пн-Пт: 10:00 - 20:00</a>
                    </div>
                </div>
            </div>
            <div className="right-column">
                <div className="contacts-title">
                    <h2>или задать вопрос здесь:</h2>
                </div>
                <div className="contact-form-wrapper">
                    <div action="" className="contact-form">
                        <input ref={nameRef} name="name" type="text" className="contact-form-input" placeholder="Ваше имя" />
                        <input ref={emailRef} name="email" type="text" className="contact-form-input" placeholder="Ваш email" />
                        <input ref={phoneRef} name="phone" type="text" className="contact-form-input" placeholder="Ваш номер телефона" />
                        <textarea ref={textRef} cols="30" rows="10" className="contact-from-textarea" placeholder="Ваш вопрос" />
                    </div>
                    <button className="contact-form-submit" onClick={submit}>Заказать звонок</button>
                </div>
            </div>
        </div>
        <div className="cart">
            <div className="contacts-title">
                <h2>Мы на карте:</h2>
            </div>
        </div>
        <SuccessModal opened={successModal} close={() => setSuccessModal(false)} content="Мы с вами свяжемся." />
        <ErrorModal opened={errorModal} close={() => setErrorModal(null)} content={errorModal} />
        <DefaultErrorModal opened={defaultErrorModal} close={() => setDefaultErrorModal(false)} />
    </>);
}