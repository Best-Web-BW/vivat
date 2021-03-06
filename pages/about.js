import ContentHeader from "../components/common/ContentHeader";
import DescriptedDotSlider from "../components/sliders/DescribedDotSlider";

export default function About() {
    return (
        <div>
            <ContentHeader wrapperClass="about" pages={[["about", "О нас"]]}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illo id beatae dolores recusandae
                et repellat ratione! Culpa accusamus consequatur quae ipsam quidem, reiciendis distinctio
                ratione aut dolore praesentium omnis quis nam modi ea architecto eveniet sunt exercitationem,
                totam quas aperiam cupiditate harum vero ex nihil. Aut nisi adipisci amet fugit, aliquid vel
                temporibus quos id provident, esse illo explicabo animi inventore at numquam? Accusantium ab
                dolor odit repudiandae possimus tempora eveniet autem, reprehenderit voluptatum consectetur nemo
                ipsam nesciunt consequuntur sequi fuga odio voluptatem, natus pariatur ullam temporibus sint
                rerum consequatur. Quibusdam quod sapiente debitis nulla, ad omnis ratione minima.
            </ContentHeader>
            <div className="about-slider-wrapper content-block">
                <DescriptedDotSlider containerClass="about-slider-container" slideClass="about-slide" images={[
                    ["/images/about/slider/1.webp", "Описание для фото 1"],
                    ["/images/about/slider/2.webp", "Описание для фото 2"],
                    ["/images/about/slider/3.webp", "Описание для фото 3"]
                ]} />
            </div>
        </div>
    );
}