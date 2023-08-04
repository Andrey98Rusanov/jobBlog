import { useDispatch, useSelector } from "react-redux";
import Loader from "../UI-Component/Loader";
import "./ArticleList.css";
import { Link } from "react-router-dom";
import Paginations from "../UI-Component/Pagination";
function ArticleList() {
  const isLoad = useSelector((state) => state.isLoad)
  const articles = useSelector((state) => state.articles);
  const dispatch = useDispatch()
  const articleList = [];
  let key = 1;
  for (let el of articles) {
    articleList.push(
      <div key={key} className="article">
        <Link to={`/${el.slug}`} className="title">
          {el.title.slice(0, 100)}
        </Link>
        <div className="tags">
          {el.tagList.map((tag) => (
            <span className="tag">{tag}</span>
          ))}
        </div>
        <div className="article_description">
          {el.description.slice(0, 100)}
        </div>
        <div className="user_info">
          <div>
            <div>{el.author.username}</div>
            <div>{new Date(el.updatedAt).toDateString()}</div>
          </div>
          <img src={el.author.image}></img>
        </div>
      </div>,
    );
    key++;
  }
  return (
    isLoad ? <Loader/> : <>
    {articleList}
    <Paginations />
    </>
  );
}

export default ArticleList;
