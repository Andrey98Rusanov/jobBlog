import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { HeartOutlined } from "@ant-design/icons";
import { HeartFilled } from "@ant-design/icons";
import Loader from "../UI-Component/Loader";
import "./Article.css";
import Api from "../../Api/Api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import DeleteArticleButton from "../UI-Component/DeleteArticleButton";
import { Link } from "react-router-dom";

function Article() {
  const { slug } = useParams();
  const [article, setArticle] = useState();
  const isLoad = useSelector((state) => state.isLoad);
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.currentUser.username);
  const navigate = useNavigate();
  const logIn = useSelector((state) => state.logIn);
  const page = useSelector((state) => state.page);
  const api = new Api();
  useEffect(() => {
    api.getArticle(slug).then((article) => {
      setArticle(article.article);
      dispatch({ type: "ADD_ARTICLE", payload: article.article });
    });
  }, []);

  const onLikeClick = (el) => {
    if (!el.favorited) {
      api.addLike(el.slug).then(() => {
        api.getArticle(slug).then((article) => {
          setArticle(article.article);
        });
      });
    } else {
      api.deleteLike(el.slug).then(() => {
        api.getArticle(slug).then((article) => {
          setArticle(article.article);
        });
      });
    }
  };
  const onDeleteClick = (slug) => {
    api.deleteArticle(slug).then(() => {
      api.getArticles(page).then((articles) => {
        dispatch({ type: "ADD_ARTICLES", payload: articles });
        dispatch({ type: "ADD_TOTAL", payload: articles });
        navigate("/");
      });
    });
  };
  const onEditClick = () => {navigate(`/${slug}/edit-article`)};
  if (article)
    return isLoad ? (
      <Loader />
    ) : (
      <div className="article article_id">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3 className="title title_id">{`${article.title}`}</h3>
          {logIn ? (
            <button
              style={{
                border: "none",
                backgroundColor: "inherit",
                cursor: "pointer",
                marginTop: "5px",
              }}
              onClick={() => onLikeClick(article)}
            >
              {" "}
              {article.favorited ? (
                <HeartFilled style={{ color: "red" }} />
              ) : (
                <HeartOutlined />
              )}
              {" " + article.favoritesCount}
            </button>
          ) : (
            <span style={{ marginLeft: "10px" }}>
              {" "}
              {article.favorited ? (
                <HeartFilled style={{ color: "red" }} />
              ) : (
                <HeartOutlined />
              )}
              {" " + article.favoritesCount}
            </span>
          )}
        </div>
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
        {userName === article.author.username ? (
          <div
            style={{
              position: "absolute",
              top: 80,
              right: 57,
              display: "flex",
              gap: "10px",
            }}
          >
            <Button style={{ color: "blue", borderColor: "blue" }} onClick={() => onEditClick(article.author.username)}>
                Edit
            </Button>
            <DeleteArticleButton danger onDeleteClick={onDeleteClick} slug={slug}>
              Delete
            </DeleteArticleButton>
          </div>
        ) : null}
      </div>
    );
}

export default Article;
