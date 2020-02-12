import React from "react";
import { withNamespaces } from "react-i18next";
import "./Service.scss";

function Service({ t }) {
    return (
        <div className="service">
            <div className="container">
                <div className="wrapper">
                    <div className="service-image">
                        <img className="service-image__img" src="/images/service-image.png" alt="NFC Визитки" />
                    </div>
                    <div>
                        <div className="service-body">
                            <h1 className="service-body__title">{t("service-body__title")}</h1>
                            <p className="service-body__text">{t("service-body__text")}</p>
                            <button className="btn">{t("serviсe-btn")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withNamespaces()(Service);
