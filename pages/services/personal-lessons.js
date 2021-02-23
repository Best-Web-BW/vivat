import ContentHeader from "../../components/common/ContentHeader";
import Rent from "../../components/common/Rent";
import SimpleDotSlider from "../../components/sliders/SimpleDotSlider";
import { ForUser } from "../../utils/providers/AuthProvider";

export default function PersonalLessons() {
    return (
        <div>
            <ContentHeader
                wrapperClass="no-background" titleClass="onslide"
                pages={[["services", "Аренда и услуги"], ["services/personal-lessons", "Персональные занятия"]]}
                beforeNavigation={
                    <SimpleDotSlider
                        containerClass="services-slider-container" slideClass="services-slide"
                        images={[
                            "/images/services/personal-lessons-slider/1.webp",
                            "/images/services/personal-lessons-slider/2.webp",
                            "/images/services/personal-lessons-slider/3.webp"
                        ]}
                    />
                }
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illo id beatae dolores recusandae
                et repellat ratione! Culpa accusamus consequatur quae ipsam quidem, reiciendis distinctio
                ratione aut dolore praesentium omnis quis nam modi ea architecto eveniet sunt exercitationem,
                totam quas aperiam cupiditate harum vero ex nihil. Aut nisi adipisci amet fugit, aliquid vel
                temporibus quos id provident, esse illo explicabo animi inventore at numquam? Accusantium ab
                dolor odit repudiandae possimus tempora eveniet autem, reprehenderit voluptatum consectetur nemo
                ipsam nesciunt consequuntur sequi fuga odio voluptatem, natus pariatur ullam temporibus sint
                rerum consequatur. Quibusdam quod sapiente debitis nulla, ad omnis ratione minima.
            </ContentHeader>
            <ForUser>
                <Rent text="Персональные занятия" cost={3000} minHours={1} hoursText="час" />
            </ForUser>
        </div>
    );
}