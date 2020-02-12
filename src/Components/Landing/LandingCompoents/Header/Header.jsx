import React from "react";
import { withNamespaces } from "react-i18next";
import "./Header.scss";

function Header({ i18n }) {
    return (
        <header>
            <div className="container">
                <div className="header">
                    <div className="header-logo">
                        <img className="header-logo__img" src="/images/logo.svg" alt="PassMent logotype" />
                    </div>
                    <div className="header-languages">
                        <div className="header-languages__item" onClick={() => i18n.changeLanguage("ua")}>
                            UA
                        </div>
                        <div className="header-languages__item" onClick={() => i18n.changeLanguage("ru")}>
                            RU
                        </div>
                        <div className="header-languages__item" onClick={() => i18n.changeLanguage("en")}>
                            EN
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default withNamespaces()(Header);
