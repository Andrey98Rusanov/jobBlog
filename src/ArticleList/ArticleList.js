import "./ArticleList.css"

function ArticleList () {
    return (
        <div className="article">
            <a>Some article title</a>
            <div className="tags">
                <span className="tag">tag1</span>
                <span className="tag">tag1</span>
            </div>
            <div>
                11111111111111111111111 11111111111111111111111 11111111111111111111111 111111111111111111111 11111111111111111111111111111
            </div>
            <div className="user_info">
                <div>
                <div>Jonh Doe</div>
                <div>March 5,2020</div>
                </div>
                <img src="https://cdn-icons-png.flaticon.com/512/924/924915.png"></img>
            </div>
        </div>
    )
}

export default ArticleList