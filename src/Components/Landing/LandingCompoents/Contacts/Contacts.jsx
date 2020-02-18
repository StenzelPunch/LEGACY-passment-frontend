import React from "react";
import { withNamespaces } from "react-i18next";
import "./Contacts.scss";

function Contacts({ t }) {
    return (
        <div className="landing-contacts">
            <div className="container">
                <div className="wrapper">
                    <div className="landing-contacts-item">
                        <div className="landing-contacts-item__image">
                            <img src="/images/contacts-mail.svg" alt="mail" />
                        </div>
                        <a className="landing-contacts-item__link" href="mailto:sale@passment.com.ua">
                            sale@passment.com.ua
                        </a>
                    </div>
                    <div className="landing-contacts-item">
                        <div className="landing-contacts-item__image">
                            <img src="/images/contacts-vodafone.svg" alt="vodafone" />
                        </div>
                        <a className="landing-contacts-item__link" href="tel:+380956048995">
                            +380956048995
                        </a>
                        <img src="/images/contacts-telegram.svg" className="landing-contacts-additional" alt="telegram"/>
                        <img src="/images/contacts-viber.svg" className="landing-contacts-additional" alt="viber"/>
                        <img src="/images/contacts-watsapp.svg" className="landing-contacts-additional" alt="watsapp"/>
                    </div>
                    <div className="landing-contacts-item">
                        <div className="landing-contacts-item__image">
                            <img src="/images/contacts-kievstar.svg" alt="kievstar" />
                        </div>
                        <a className="landing-contacts-item__link" href="tel:+380970101725">
                            +380970101725
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withNamespaces()(Contacts);
