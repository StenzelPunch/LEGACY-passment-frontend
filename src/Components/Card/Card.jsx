import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getMember, getAvatar } from "../../api.ts";

import "./Card.css";

import ContactsItem from "../ContactsItem";
import Loading from "../Loading";

const links = user => {
    if (user) {
        const linksArray = [];

        for (let link of user.links) {
            if(link.value !== '') {
                linksArray.push(<ContactsItem key={link.name} name={link.name} link={link.value} />);
            }
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
                setUser(user);
            }).catch(err => {
                history.push('/404.html');
                console.warn(err.message);
            });

            getAvatar(id).then(url => {
                setAvatarUrl(url);
            }).catch(err => {
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
