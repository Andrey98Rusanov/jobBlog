import { useSelector } from "react-redux"
import "./ArticleList.css"
import { Link } from "react-router-dom"
import Paginations from "../UI-Component/Pagination"
function ArticleList () {
    const articles = useSelector((state) => state.articles)
    const articleList = []
    let key = 1
    for (let el of articles) {
        articleList.push(
            <div key={key} className="article">
            <Link to={`/${el.slug}`} className="title">{el.title}</Link>
            {/* <a className="title">{el.title}</a> */}
            <div className="tags">
                {el.tagList.map(tag => <span className="tag">{tag}</span>)}
            </div>
            <div>
                {el.description}
            </div>
            <div className="user_info">
                <div>
                <div>{el.author.username}</div>
                <div>{new Date(el.updatedAt).toDateString()}</div>
                </div>
                <img src={el.author.image}></img>
            </div>
        </div>
        )
        key++
    }
    return (
        <>
        {articleList}
        <Paginations/>
        </>
    )
}

export default ArticleList