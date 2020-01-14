import React from "react";
import images from "../../assets/images";
import "./ContactsItem.css";

function ContactsItem(props) {
    return (<div className="contacts-item">
        <a className="item-link" href={"/" + props.link}>
            <img className="item-image" src={images[props.name]} alt={props.name + "-icon"} />
        </a>
    </div>);
}

export default ContactsItem