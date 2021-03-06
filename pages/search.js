import ContentHeader from "../components/common/ContentHeader";
import { ResultPage } from "../components/common/YandexSearch";
import Head from "next/head";

export default function Search() {
    return (
        <div>
            <Head>
                <link rel="stylesheet" href="/css/yandexSearch.css" />
            </Head>
            <ContentHeader wrapperClass="search" pages={[["search", "Результаты поиска"]]}>
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illo id beatae dolores recusandae
                et repellat ratione! Culpa accusamus consequatur quae ipsam quidem, reiciendis distinctio
                ratione aut dolore praesentium omnis quis nam modi ea architecto eveniet sunt exercitationem,
                totam quas aperiam cupiditate harum vero ex nihil. Aut nisi adipisci amet fugit, aliquid vel
                temporibus quos id provident, esse illo explicabo animi inventore at numquam? Accusantium ab
                dolor odit repudiandae possimus tempora eveniet autem, reprehenderit voluptatum consectetur nemo
                ipsam nesciunt consequuntur sequi fuga odio voluptatem, natus pariatur ullam temporibus sint
                rerum consequatur. Quibusdam quod sapiente debitis nulla, ad omnis ratione minima. */}
            </ContentHeader>
            <ResultPage />
        </div>
    );
}