import React, { useState, useEffect } from "react";
import { db } from "../../../../backend.js";

import "./CreateNewMember.css";

const createInputs = (array, state, callback) => {
    const inputsArray = [];

    array.forEach(name => {
        inputsArray.push(
            <div className="input-group" key={name}>
                <label className="input-label" htmlFor={name}>{name}: </label>
                <input className="input-text" id={name} type="text" onInput={e => {
                    callback({
                        ...state,
                        [name]: e.target.value
                    })
                }}></input>
            </div>
        );
    });

    return inputsArray;
};

function CreateNewMember(props) {
    const infoList = ["nickname", "first_name", "last_name", "patronymic", "info", "user_phone", "user_email"];
    const linkList = ["facebook", "instagram", "email", "linkedin", "phone", "telegram", "twitter", "viber", "vk"];

    const [info, setInfo] = useState({})
    const [links, setLinks] = useState({})


    return (
        <div className='create-new-member'>
            <h3>Create new member</h3>
            <div className="input-list">
                <h4>Member info</h4>
                {createInputs(infoList, info, setInfo)}
            </div>
            <div className="input-list">
                <h4>Links</h4>
                {createInputs(linkList, links, setLinks)}
            </div>
            <button className="btn btn-create" onClick={createMember}>Create</button>
        </div>
    );

    function createMember() {
        db.collection("members").doc(info.nickname).set({
            ...info,
            links: {
                ...links
            }
        })
        .then(function() {
            setInfo({})
            setLinks({})
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

    
}

export default CreateNewMember;
