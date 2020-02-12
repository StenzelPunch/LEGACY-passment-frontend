import React from "react";
import { withNamespaces } from "react-i18next";
import "./Footer.scss";

function Footer({ t }) {
    return (
        <footer className="footer">
            <div className="container">
                <div className="wrapper">
                    <p className="footer-text">{t("footer-text")}</p>
                </div>
            </div>
        </footer>
    );
}

export default withNamespaces()(Footer);
