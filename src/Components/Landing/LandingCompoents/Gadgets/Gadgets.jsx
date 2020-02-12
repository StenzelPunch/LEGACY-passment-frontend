import React from "react";
import { withNamespaces } from "react-i18next";
import "./Gadgets.scss";

function Gadgets({ t }) {
    return (
        <div className="gadgets">
            <div className="container">
                <div className="wrapper">
                    <h2 className="gadgets-title">{t("gadgets-title")}</h2>
                    <p className="gadgets-text">{t("gadgets-text")}</p>
                    <div className="gadgets-items">
                        <div className="gadgets-items__android">
                            <img className="gadgets-items__img" src="/images/gadgets-android.svg" alt="android" />
                            <p className="gadgets-items__text" >{t("gadgets-items__android")}</p>
                        </div>
                        <div className="gadgets-items__iphone">
                            <img className="gadgets-items__img" src="/images/gadgets-iphone.svg" alt="iphone" />
                            <p className="gadgets-items__text">{t("gadgets-items__iphone") + " "}
                                <a className="gadgets-items__link" href="/">{t("gadgets-items__iphone__link")}</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withNamespaces()(Gadgets);
