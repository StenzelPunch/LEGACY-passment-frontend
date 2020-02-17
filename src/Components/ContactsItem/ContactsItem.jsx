import React from "react";
import "./ContactsItem.css";
import linkParser from "../../utils/linkParser"

function ContactsItem(props) {
    return (
        <div className="contacts-item">
            <a className="item-link" href={linkParser(props.name ,props.link)}>
                <img className="item-image" src={"/images/" + [props.name] + ".svg"} alt={props.name + "-icon"} />
            </a>
        </div>
    );
}

export default ContactsItem;
