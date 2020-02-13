import React from "react";
import { useHistory } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
    const history = useHistory()

    return (
        <div className="not-found">
            <div className="not-found__ops">Ой...</div>
            <div className="not-found__text">кажется такой страницы не существует</div>
            <div className="_404">
                404
            </div>
            <button className="not-found__btn" onClick={() => {history.push('/')}}>На главную</button>
        </div>
    );
}

export default NotFound;
