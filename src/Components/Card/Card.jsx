import React, { useState, useEffect } from "react";
import { useParams, useHistory} from "react-router-dom";
import { loadData } from "../../backend.js";
import images from "../../assets/images";

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
        return <Loading/>;
    }
};

function Card(props) {
    const [user, setUser] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);

    const { id } = useParams();
    const history = useHistory();
    const params = {
        id,
        setUser,
        setAvatarUrl,
        notFound: history.push
    }

    useEffect(() => {
        if (!user) {
            loadData(params)
        }
    });

    return (
        <>
            {user ? (
                <div className="card">
                    <div className="card-img">
                        <img
                            className="card-img__avatar"
                            src={avatarUrl ? avatarUrl : images.adminAvatar}
                            alt="user-avatar"
                        />
                    </div>
                    <div className="card-name">{user.first_name + " " + user.last_name}</div>
                    <div className="card-message">{user.info}</div>
                    <div className="card-contacts">
                        <div className="contacts-wraper">{links(user)}</div>
                    </div>
                </div>
            ) : (
                <Loading/>
            )}
        </>
    );
}


export default Card;
