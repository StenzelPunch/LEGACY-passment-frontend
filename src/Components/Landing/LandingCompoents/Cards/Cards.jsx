import React from "react";
import { withNamespaces, Trans } from "react-i18next";

import "./Cards.scss";

const prices = [100, 50, 100, 120];

const Card = withNamespaces()(function({ t, index }) {
    return (
        <div className="card-container">
            <div className="card">
                <div className="card-image">
                    <img
                        className="card-image__img"
                        src={`/images/card-image-${index + 1}.png`}
                        alt="Продукт PassMent"
                    />
                </div>
                <h3 className="card-title">{t("card-title", { returnObjects: true })[index]}</h3>
                <p className="card-text">{t("card-text", { returnObjects: true })[index]}</p>
                <p className="card-price">
                    {t("card-price", { returnObjects: true })[index][0]}
                    <span className="card-price__bold">{` ${prices[index]} `}</span>
                    {t("card-price", { returnObjects: true })[index][1]}
                </p>
                <button className="btn">{t("card-btn")}</button>
            </div>
        </div>
    );
});

function Cards({ t }) {
    return (
        <div className="cards">
            <div className="container">
                <div className="wrapper">
                    <Card index={0} />
                    <Card index={1} />
                    <Card index={2} />
                    <Card index={3} />
                </div>
            </div>
        </div>
    );
}

export default withNamespaces()(Cards);
