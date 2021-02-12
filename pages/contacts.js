import { useRef } from "react";
import ContentHeader from "../components/common/ContentHeader";
import MailProvider from "../utils/providers/MailProvider";

export default function Contacts() {
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const textRef = useRef();
    const submit = async () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value;
        const text = textRef.current.value;

        if(!/@/.test(email)) return alert("Неверно введена почта");
        else if(!/^[a-zа-яё ]+$/gi.test(name)) return alert("Неверно введено имя");
        else if(!/(.|[\r\n \s\t])+/.test(text)) return alert("Неверно введён текст вопроса");
        else if(!/^(\+7|8)\d{10}$/.test(phone)) return alert("Неверно введён номер телефона");

        try {
            const result = await MailProvider.sendFeedbackEmail(name, email, phone, text);
            if(result.success) {
                alert("Мы с вами свяжемся");
                nameRef.current.value = "";
                emailRef.current.value = "";
                phoneRef.current.value = "";
                textRef.current.value = "";
            } else {
                alert("Произошла ошибка сервера, попробуйте позже");
                console.log({ result });
            }
        } catch(e) {
            alert("Что-то пошло не так");
            console.log({ result });
        }
    }

    return (
        <div>
            <ContentHeader class="contacts" pages={[["contacts", "Контакты"]]}>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illo id beatae dolores recusandae
                    et repellat ratione! Culpa accusamus consequatur quae ipsam quidem, reiciendis distinctio
                    ratione aut dolore praesentium omnis quis nam modi ea architecto eveniet sunt exercitationem,
                    totam quas aperiam cupiditate harum vero ex nihil. Aut nisi adipisci amet fugit, aliquid vel
                    temporibus quos id provident, esse illo explicabo animi inventore at numquam? Accusantium ab
                    dolor odit repudiandae possimus tempora eveniet autem, reprehenderit voluptatum consectetur nemo
                    ipsam nesciunt consequuntur sequi fuga odio voluptatem, natus pariatur ullam temporibus sint
                    rerum consequatur. Quibusdam quod sapiente debitis nulla, ad omnis ratione minima.
                </p>
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
        </div>
    );
}