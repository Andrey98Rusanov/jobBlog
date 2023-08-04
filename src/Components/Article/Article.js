import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import Loader from "../UI-Component/Loader";
import "./Article.css";
import Api from "../../Api/Api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Article() {
  const { slug } = useParams();
  const [article, setArticle] = useState();
  const isLoad = useSelector(state => state.isLoad)
  const dispatch = useDispatch()
  const api = new Api();
  useEffect(() => {
    api.getArticle(slug).then((article) => {
      setArticle(article.article);
      console.log(article)
    });
  }, []);
  if (article)
    return ( isLoad ? <Loader/> : 
      <div className="article article_id">
        <h3 className="title title_id">{article.title}</h3>
        <div className="tags">
          {article.tagList.map((tag) => (
            <span className="tag">{tag}</span>
          ))}
        </div>
        <div>{article.description}</div>
        <div className="user_info">
          <div>
            <div>{article.author.username}</div>
            <div>{new Date(article.updatedAt).toDateString()}</div>
          </div>
          <img src={article.author.image}></img>
        </div>
        <ReactMarkdown className="article_body">{article.body}</ReactMarkdown>
      </div>
    );
}

export default Article;
