import Link from "next/link";
import ContentHeader from "../components/common/ContentHeader";

function Service(props) {
    let link = `/services/${props.link}`;
    return (
        <div className="services-block">
            <Link href={link}>
                <a>
                    <div className="service-img">
                        <img src={props.img} alt="" height="100%" />
                    </div>
                </a>
            </Link>
            <div className="service-category">
                <Link href={link}>
                    <a>{props.category}</a>
                </Link>
            </div>
            <div className="service-title">
                <Link href={link}>
                    <a>{props.title}</a>
                </Link>
            </div>
        </div>
    );
}

export default function Services() {
    return (
        <div>
            <ContentHeader class="services" pages={[["services", "Аренда и услуги"]]}>
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
            <div className="services-content-wrapper content-block">
                <div className="block-title">
                    <h2>Наши услуги</h2>
                </div>
                <div className="services-blocks-wrapper">
                    <Service
                        img="/images/home/services/evan-wise-O1S18WAol3w-unsplash.jpg"
                        link="rent-main"
                        category="Аренда"
                        title="Основная конюшня"
                    />
                    <Service
                        img="/images/home/services/gabriella-clare-marino-O_jE3p48m44-unsplash.jpg"
                        link="rent-guest"
                        category="Аренда"
                        title="Гостевая конюшня"
                    />
                    <Service
                        img="/images/home/services/matthew-lancaster-B5KfPvpVe-c-unsplash.jpg"
                        link="personal-lessons"
                        category="Услуги"
                        title="Персональные занятия"
                    />
                </div>
            </div>
        </div>
    );
}