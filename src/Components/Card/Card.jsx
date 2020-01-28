import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getMember } from "../../backend.js";

import "./Card.css";

import ContactsItem from "../ContactsItem";
import Loading from "../Loading";

const links = user => {
    if (user) {
        const linksArray = [];

        for (let key in user.links) {
            linksArray.push(<ContactsItem key={key} name={key} link={user.links[key]} />);
        }

        return linksArray;
    } else {
        return <Loading />;
    }
};

function Card(props) {
    const [user, setUser] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);

    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (!user) {
            getMember(id).then(user => {
                const [data, avatarUrl] = user;
                setUser(data);
                setAvatarUrl(avatarUrl);
            }).catch(err => {
                history.push('/404');
                console.warn(err.message);
            });
        }
    });

    return (
        <div className="card">
            {user ? (
                <div className="card-wraper">
                    <div className="card-logo">
                        <a href="/">
                            <img className="card-logo__img" src="/images/logo.svg" alt="Pass Ment logo" />
                        </a>
                    </div>
                    <div className="card-body">
                        <div className="body-userimage">
                            <img
                                className="body-userimage__img"
                                src={avatarUrl ? avatarUrl : "/images/user.svg"}
                                alt="user pic"
                            />
                        </div>
                        <div className="body-name">
                            {`${user.first_name} ${user.last_name} ${user.patronymic ? user.patronymic : ""}`}
                        </div>
                        <div className="body-info">{user.info}</div>
                        <div className="body-contacts">
                            <div className="contacts">{links(user)}</div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default Card;
