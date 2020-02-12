import React from "react";
import { withNamespaces } from "react-i18next";
import "./Questions.scss";

function Questions({ t }) {
    return (
        <div className="questions">
            <div className="container">
                <div className="wrapper">
                    <h3 className="questions-title">{t("questions-title")}</h3>
                    <p className="questions-text">{t("questions-text")}</p>
                </div>
            </div>
        </div>
    );
}

export default withNamespaces()(Questions);
