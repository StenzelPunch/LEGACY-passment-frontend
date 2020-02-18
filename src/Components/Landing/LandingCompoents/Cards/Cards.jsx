import React from "react";
import { withNamespaces } from "react-i18next";

import "./Cards.scss";

const prices = [100, 50, 100, 120];

const Card = withNamespaces()(function({ t, index, onOrder, link}) {
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
                <a className="visually-hidden" href={link}>{t("card-title", { returnObjects: true })[index]}</a>
                <button className="btn" onClick={onOrder}>{t("card-btn")}</button>
            </div>
        </div>
    );
});

function Cards({ t, onOrder }) {
    return (
        <div className="cards">
            <div className="container">
                <nav className="wrapper">
                    <Card index={0} onOrder={onOrder} link="/bage"/>
                    <Card index={1} onOrder={onOrder} link="/cutaway"/>
                    <Card index={2} onOrder={onOrder} link="/pin"/>
                    <Card index={3} onOrder={onOrder} link="/multilink"/>
                </nav>
            </div>
        </div>
    );
}

export default withNamespaces()(Cards);
