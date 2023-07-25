import "./Header.css"

function Header () {
    return (
        <div className="header">
            <a className="logo">Realworld Blog</a>
            <div className="header_buttons">
            <button className="header_button">Sign in</button>
            <button className="header_button">Sign up</button>
            </div>
        </div>
    )
}

export default Header