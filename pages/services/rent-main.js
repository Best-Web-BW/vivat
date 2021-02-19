import ContentHeader from "../../components/common/ContentHeader";
import Rent from "../../components/common/Rent";
import SimpleDotSlider from "../../components/sliders/SimpleDotSlider";
import { AuthVariableComponent } from "../../utils/providers/AuthProvider";

export default function RentMain() {
    return (
        <div>
            <ContentHeader
                wrapperClass="no-background" titleClass="onslide"
                pages={[["services", "Аренда и услуги"], ["services/rent-main", "Основная конюшня"]]}
                beforeNavigation={
                    <SimpleDotSlider
                        containerClass="services-slider-container" slideClass="services-slide"
                        images={[
                            "/images/services/main-horsestable-slider/1.jpg",
                            "/images/services/main-horsestable-slider/2.jpg",
                            "/images/services/main-horsestable-slider/3.jpg"
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
            <AuthVariableComponent>
                <Rent text="Аренда основной конюшни" cost={5000} minHours={2} hoursText="часа" />
                <div />
            </AuthVariableComponent>
        </div>
    );
}