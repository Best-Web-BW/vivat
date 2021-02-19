import PostListProvider from "../../utils/providers/PostListProvider";
import ContentHeader from "../../components/common/ContentHeader";
import { removeTagsFromText } from "../../utils/common";
import Router from "next/router";
import { useMemo } from "react";
import { Tag } from "../news";

export default function PostPage({ post: { id, title, contents, tags, category } }) {
    const _contents = useMemo(() => contents.replace(/script/gi, "sсrірt"), [id]);
    const description = useMemo(() => `${removeTagsFromText(_contents).substring(0, 137)}...`, [_contents]);
    const keywords = useMemo(() => `${tags.join(", ")}, ${category}`, [tags, category]);

    return (<>
        <ContentHeader wrapperClass="news" pages={[["news", "Новости"], [`news/${id}`, title]]} {...{ description, keywords }}>
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
            {/* <div className="article-edit-wrapper">
                <span className="edit"></span>  
                <button className="delete">X</button>
            </div> */}
            <div className="news-navigation-row">
                <a onClick={Router.back}>Назад</a>
            </div>
            <div className="news-article-wrapper">
                <article className="news-article">
                    <h2 className="article-titles">{ title }</h2>
                    <div dangerouslySetInnerHTML={{ __html: _contents }} />
                </article>
                <div className="news-navigation-row">
                    { tags.map((tag, index) => <Tag key={index} name={tag} />) }
                </div>
            </div>
        </div>
    </>);
}

export async function getServerSideProps({ query: { id } }) {
    const result = { props: { post: { } } };
    try { result.props.post = await PostListProvider.getPostDetails(+id) }
    catch(e) { console.error(e) }
    finally { return result }
}