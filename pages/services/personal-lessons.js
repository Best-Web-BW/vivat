import ContentHeader from "../../components/common/ContentHeader";
import SimpleDotSlider from "../../components/sliders/SimpleDotSlider";

export default function PersonalLessons() {
    return (
        <div>
            <ContentHeader
                class="no-background" titleClass="onslide"
                pages={[["services", "Аренда и услуги"], ["services/personal-lessons", "Персональные занятия"]]}
                beforeNavigation={
                    <SimpleDotSlider
                        containerClass="services-slider-container" slideClass="services-slide"
                        images={[
                            "/images/services/personal-lessons-slider/1.jpg",
                            "/images/services/personal-lessons-slider/2.jpg",
                            "/images/services/personal-lessons-slider/3.jpg"
                        ]}
                    />
                }
            >
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
            <div className="order-service-wrapper content-block">
                <div className="order-service-block">
                    <div className="order-service-title-wrapper">
                        <h2 className="order-service-title">Персональные заняти</h2>
                    </div>
                    <div className="order-service-price-wrapper">
                        <div className="order-service-price-title">Стоимость</div>
                        <div className="order-service-price-amount">3000р/ч</div>
                    </div>
                    <div className="order-service-time-wrapper">
                        <div className="order-service-time-title">Выбор времени</div>
                        <button className="order-service-time-button">09:00 - 12:00</button>
                        <button className="order-service-time-button">10:00 - 12:00</button>
                        <button className="order-service-time-button active">13:00 - 15:00</button>
                        <button className="order-service-time-button">15:00 - 18:00</button>
                        <button className="order-service-time-button">17:00 - 20:00</button>
                    </div>
                    <div className="order-service-mintime-wrapper">
                        <div className="order-service-mintime-title">Минимальное время занятия</div>
                        <div className="order-service-mintime-time">1 час</div>
                    </div>
                    <div className="order-service-button-wrapper">
                        <button className="order-service-button">Заказать</button>
                    </div>
                </div>
            </div>
        </div>
    );
}