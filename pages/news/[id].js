import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentHeader from "../../components/common/ContentHeader";
import PostListProvider from "../../utils/providers/PostListProvider";
import { Tag } from "../news";

function Paragraph({ image, text }) {
    const { plug } = useRouter().query;
    const t = [
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit maxime hic repellat! Dolores culpa quae et debitis? Tenetur aut ut ab harum, repellendus et ducimus eos provident praesentium totam! Ullam enim sunt ipsum? Nam, dolor ex placeat dignissimos molestiae repellendus quaerat velit maxime aperiam vel voluptatum perspiciatis praesentium officiis quidem maiores minus consectetur nesciunt in deleniti ipsa quas ea! Incidunt, officia! Labore nostrum, dolor ut voluptatum adipisci, distinctio temporibus dignissimos, tempora praesentium architecto aut quia! Fuga atque nihil eius, cumque tenetur in quo quibusdam rerum repellendus, magnam veniam obcaecati consequuntur ipsam necessitatibus perspiciatis iure voluptatum asperiores debitis quasi fugiat delectus ullam ducimus? Quam repellendus reiciendis nisi corrupti error rerum ullam pariatur laborum eum assumenda repudiandae maiores beatae, velit libero tenetur perspiciatis, atque saepe est ut, id voluptas voluptatibus tempore commodi molestias. Inventore quam iusto obcaecati quibusdam, corrupti omnis ipsam consectetur dolorum non nesciunt possimus impedit suscipit amet accusamus, explicabo voluptates. Alias nostrum aperiam repellendus, numquam, quis quidem hic pariatur voluptatum omnis autem sit architecto optio dicta provident, officiis odio quisquam temporibus excepturi sunt voluptatem consectetur eos dolore harum animi. Voluptate, a delectus? Harum eius, expedita eos aut aliquam quis aspernatur exercitationem veritatis, dolorem sunt ducimus eveniet similique nam cum, culpa voluptatem consectetur voluptatum quisquam itaque distinctio consequatur. Repudiandae nihil deleniti ipsam vel aut consequatur odit reiciendis veniam ad autem voluptatum alias pariatur et quia, ab laborum consectetur earum, delectus voluptas. Perferendis neque ratione magni voluptatibus veniam debitis consequatur tempore eos autem nihil impedit magnam ipsa, molestias amet aspernatur facilis iste!"
    ];
    return (
        <p>
            { image && <img src={`/images/news/${image.name}.jpg`} alt="" style={{ float: image.float }} /> }
            { plug ? t[0] : text }
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
                <div className ="article-edit-wrapper">
                    <span className="edit"></span>  
                    <button className="delete">X</button>
                </div>
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