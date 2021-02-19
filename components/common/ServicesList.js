import Link from "next/link";

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

export default function ServicesList({ containerClass }) {
    return (
        <div className={`content-block ${containerClass ?? ""}`}>
            <div className="block-title">
                <h2>Наши услуги</h2>
            </div>
            <div className="services-blocks-wrapper">
                <Service
                    img="/images/home/services/rent_main.webp"
                    link="rent-main"
                    category="Аренда"
                    title="Основная конюшня"
                />
                <Service
                    img="/images/home/services/rent_guest.webp"
                    link="rent-guest"
                    category="Аренда"
                    title="Гостевая конюшня"
                />
                <Service
                    img="/images/home/services/personal_lessons.webp"
                    link="personal-lessons"
                    category="Услуги"
                    title="Персональные занятия"
                />
            </div>
        </div>
    );
}