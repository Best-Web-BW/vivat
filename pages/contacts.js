import ContentHeader from "../components/common/ContentHeader";

export default function Contacts() {
    return (
        <div>
            <ContentHeader class="contacts" address="contacts" title="Контакты">
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
                        <form action="" className="contact-form">
                            <input name="name" type="text" className="contact-form-input" placeholder="Ваше имя" />
                            <input name="email" type="text" className="contact-form-input" placeholder="Ваш email" />
                            <input name="phone" type="text" className="contact-form-input" placeholder="Ваш номер телефона" />
                            <textarea cols="30" rows="10" className="contact-from-textarea" placeholder="Ваш вопрос"></textarea>
                        </form>
                        <button className="contact-form-submit">Заказать звонок</button>
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