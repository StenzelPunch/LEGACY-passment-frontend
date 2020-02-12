import React from "react";
import { withNamespaces } from "react-i18next";
import "./Usage.scss";

const UsageItem = withNamespaces()(function({t, index }) {
    return (
        <div className="usage-items__item">
            <div className="item-number">{index + 1}</div>
            <div className="item-text">
                <p>{t("usage-items", { returnObjects: true })[index]}</p>
            </div>
        </div>
    );
});

function Usage({ t }) {
    return (
        <div className="usage">
            <div className="container">
                <div className="wrapper">
                    <h2 className="usage-title">{t("usage-title")}</h2>
                    <div className="usage-items">
                        <UsageItem index={0}/>
                        <UsageItem index={1}/>
                        <UsageItem index={2}/>
                        <UsageItem index={3}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withNamespaces()(Usage);
