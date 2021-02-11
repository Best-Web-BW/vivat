import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentHeader from "../../components/common/ContentHeader";
import PostListProvider from "../../utils/providers/PostListProvider";
import { Tag } from "../news";

function Paragraph({ image, text }) {
    return (
        <p>
            { image && <img src={`/images/news/${image.name}.jpg`} alt="" style={{ float: image.float }} /> }
            { text }
        </p>
    );
}

export default function PostPage() {
    const { id } = useRouter().query;
    const [post, setPost] = useState({ });

    useEffect(async () => {
        if(id) {
            const post = await PostListProvider.getPostDetails(+id);
            setPost(post);
        }
    }, [id]);

    return (
        <>
            <ContentHeader class="news" pages={[["news", "Новости"], [`news/${post.id}`, post.title]]}>
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
            <div className="news-content content-block">
                {/* <div className ="article-edit-wrapper">
                    <span className="edit"></span>  
                    <button className="delete">X</button>
                </div> */}
                <div className="news-navigation-row">
                    <Link href="/news">
                        <a>Назад</a>
                    </Link>
                </div>
                <div className="news-article-wrapper">
                    <article className="news-article">
                        <h2 className="article-titles">{ post.title }</h2>
                        <div dangerouslySetInnerHTML={ post.contents && { __html: post.contents.replace("script", "sсrірt")}} />
                        {/* { post.contents && post.paragraphs.map((paragraph, index) => <Paragraph key={index} { ...paragraph } />) } */}
                    </article>
                    <div className="news-navigation-row">
                        { post.tags && post.tags.map((tag, index) => <Tag key={index} name={tag} />) }
                    </div>
                </div>
            </div>
        </>
    );
}