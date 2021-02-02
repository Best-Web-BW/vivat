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
    );
}