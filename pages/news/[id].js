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
                <p>{ post.desc }</p>
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
                        { post.paragraphs && post.paragraphs.map((paragraph, index) => <Paragraph key={index} { ...paragraph } />) }
                    </article>
                    <div className="news-navigation-row">
                        { post.tags && post.tags.map((tag, index) => <Tag key={index} name={tag} />) }
                    </div>
                </div>
            </div>
        </>
    );
}