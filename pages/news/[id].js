import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentHeader from "../../components/common/ContentHeader";
import PostListProvider from "../../utils/providers/PostListProvider";
import { Tag } from "../news";

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
            <ContentHeader pages={[["news", "Новости"], [`news/${post.id}`, post.title]]}>
                <p>{ post.desc }</p>
            </ContentHeader>
            <div className="news-content content-block">
                <div className="news-navigation-row">
                    <Link href="/news">
                        <a>Назад</a>
                    </Link>
                </div>
                <div className="news-article-wrapper">
                    <article className="news-article">
                        <h2 className="article-titles">{ post.title }</h2>
                        <p>
                            { post.images && <img src={`/images/news/${post.images[0]}.jpg`} alt="" style={{ float: "left" }} /> }
                            { post.texts && post.texts[0] }
                        </p>
                        <p>
                            { post.images && <img src={`/images/news/${post.images[1]}.jpg`} alt="" style={{ float: "right" }} /> }
                            { post.texts && post.texts[1] }
                        </p>
                    </article>
                    <div className="news-navigation-row">
                        { post.tags && post.tags.map((tag, index) => <Tag key={index} name={tag} />) }
                    </div>
                </div>
            </div>
        </>
    );
}