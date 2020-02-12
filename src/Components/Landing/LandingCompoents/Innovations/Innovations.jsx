import React from "react";
import { withNamespaces } from "react-i18next";
import "./Innovations.scss";

function Innovations({ t }) {
    return (
        <div className="innovations">
            <div className="container">
                <div className="wrapper">
                    <div className="innovations-body">
                        <h2 className="innovations-body__title">{t("innovations-body__title")}</h2>
                        <p className="innovations-body__text">{t("innovations-body__text")}</p>
                        <button className="btn">{t("innovations-btn")}</button>
                    </div>
                    <div className="innovations-image">
                        <img className="innovations-image__img" src="/images/innovations-image.png" alt="Пример страницы профиля"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withNamespaces()(Innovations);
