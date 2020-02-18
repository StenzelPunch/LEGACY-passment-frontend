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


    const [nameWarning, setNameWarning] = useState(false);
    const [phoneWarning, setPhoneWarning] = useState(false);
    const [emailWarning, setEmailWarning] = useState(false);
    const [firstCheck, setFirstCheck] = useState(false)

    useEffect(() => {
        if (ok) {
            setTimeout(close, 4000)
        }
        if (firstCheck) {
            validation()
        }
    })
    function mail(e, payload) {
        e.preventDefault();
        setFirstCheck(true)
        if (validation()) {
          
            sendEmail(payload).then(() => {
                setOk(true);
            });
        }
    }

    function validation () {
        let i = 0
        if (/[A-Za-zA-Яа-я" "]{2,64}/gm.test(name)) {
            i++
            setNameWarning(false);
        } else {
            setNameWarning(true);
        }

        if (/^\+?3?8?(0\d{9})$/.test(phone)) {
            i++
            setPhoneWarning(false);
        } else {
            setPhoneWarning(true);
        }

        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            i++
            setEmailWarning(false);
        } else {
            setEmailWarning(true);
        }
        
        return i === 3 ? true : false;
    }

    return (
        <div className="modal">
            <div className="wrapper" onClick={event => (event.target === event.currentTarget ? close() : false)}>
                <div className={`modal-body${ok ? " success" : ""}`}>
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
                                className={`modal-input${nameWarning ? " modal-input__warning" : ""}`}
                                placeholder={t("modal-input__name")}
                                onChange={e => {
                                    setName(e.target.value);
                                }}
                                type="text"
                                required
                            />
                            <input
                                className={`modal-input${phoneWarning ? " modal-input__warning" : ""}`}
                                placeholder={t("modal-input__phone")}
                                onChange={e => {
                                    setPhone(e.target.value);
                                }}
                                type="tel"
                                required
                            />
                            <input
                                className={`modal-input${emailWarning ? " modal-input__warning" : ""}`}
                                placeholder={t("modal-input__email")}
                                onChange={e => {
                                    setEmail(e.target.value);
                                }}
                                type="email"
                                required
                            />
                            <button className="btn" onClick={e => mail(e, { name, phone, email })}>
                                {t("modal-btn")}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
});

function Landing({preload}) {
    const [showModal, setModal] = useState(preload ? true : false);

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
