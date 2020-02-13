import React, { useState, useEffect } from "react";
import { withNamespaces } from "react-i18next";
import {
    Header,
    Service,
    Usage,
    Innovations,
    Image,
    Cards,
    Gadgets,
    Questions,
    Contacts,
    Footer
} from "./LandingCompoents";
import { sendEmail } from "../../api";
import "./Landing.scss";

const Modal = withNamespaces()(function({ t, close }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if (ok) {
            setTimeout(close, 4000)
        }
    })
    function mail(e, payload) {
        e.preventDefault();
        sendEmail(payload).then(() => {
            setOk(true);
        });
    }

    return (
        <div className="modal">
            <div className="wrapper" onClick={event => (event.target == event.currentTarget ? close() : false)}>
                <form className={`modal-body${ok ? " success" : ""}`}>
                    {ok ? (
                        <div className="modal-success">
                            <img className="modal-success__img" src="/images/modal-success.svg" alt="Галочка" />
                            <p className="modal-success__message">{t("modal-success__message")}</p>
                        </div>
                    ) : (
                        <>
                            <div className="modal-close" onClick={close}>
                                <img src="/images/modal-close.svg" alt="Кнопка закрыть" />
                            </div>
                            <input
                                className="modal-input"
                                placeholder={t("modal-input__name")}
                                onChange={e => {
                                    setName(e.target.value);
                                }}
                                type="text"
                                required
                            />
                            <input
                                className="modal-input"
                                placeholder={t("modal-input__phone")}
                                onChange={e => {
                                    setPhone(e.target.value);
                                }}
                                type="tel"
                                required
                            />
                            <input
                                className="modal-input"
                                placeholder={t("modal-input__email")}
                                onChange={e => {
                                    setEmail(e.target.value);
                                }}
                                type="email"
                                required
                            />
                            <button className="btn" type="submit" onClick={e => mail(e, { name, phone, email })}>
                                {t("modal-btn")}
                            </button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
});

function Landing() {
    const [showModal, setModal] = useState(false);

    return (
        <div>
            {showModal ? (
                <Modal
                    close={() => {
                        setModal(false);
                    }}
                />
            ) : (
                false
            )}
            <div className={`landing${showModal ? " modal-show" : ""}`}>
                <Header />
                <main>
                    <Service
                        onOrder={() => {
                            setModal(true);
                        }}
                    />
                    <Usage />
                    <Innovations
                        onOrder={() => {
                            setModal(true);
                        }}
                    />
                    <Image />
                    <Cards
                        onOrder={() => {
                            setModal(true);
                        }}
                    />
                    <Gadgets />
                    <Questions />
                    <Contacts />
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default Landing;
