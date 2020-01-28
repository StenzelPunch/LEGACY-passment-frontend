import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createMember } from "../../../../backend.js";

import "./CreateNewMember.css";

const createInputs = (array, state, callback) => {
    const inputsArray = [];

    array.forEach(arr => {
        inputsArray.push(
            <div className="input-group" key={arr.name}>
                <label className="input-label" htmlFor={arr.name}>
                    {arr.name}:{" "}
                </label>
                <input
                    className="input-text"
                    id={arr.name}
                    type="text"
                    required={arr.required}
                    onInput={e => {
                        callback({
                            ...state,
                            [arr.name]: e.target.value
                        });
                    }}
                ></input>
            </div>
        );
    });

    return inputsArray;
};

function CreateNewMember(props) {
    const infoList = [
        { name: "url", required: true },
        { name: "first_name", required: true },
        { name: "last_name", required: true },
        { name: "patronymic", required: false },
        { name: "info", required: false },
        { name: "user_phone", required: true },
        { name: "user_email", required: false }
    ];
    const linkList = [
        { name: "email", required: false },
        { name: "gmaps", required: false },
        { name: "linkedin", required: false },
        { name: "messenger", required: false },
        { name: "skype", required: false },
        { name: "twitter", required: false },
        { name: "vimeo", required: false },
        { name: "whatsapp", required: false },
        { name: "facebook", required: false },
        { name: "instagram", required: false },
        { name: "phone", required: false },
        { name: "telegram", required: false },
        { name: "viber", required: false },
        { name: "website", required: false },
        { name: "youtube", required: false }
    ];

    const [info, setInfo] = useState({});
    const [links, setLinks] = useState({});
    const [file, setFile] = useState(null);
    const [created, setCreated] = useState(false);

    const history = useHistory();

    return (
        <>
            {created ? (
                <>
                    <div className="creation-success">Creation success</div>
                    <div className="creation-actions">
                        <div
                            className="actions-btn"
                            onClick={() => {
                                history.push("/__admin__");
                            }}
                        >
                            Go to members
                        </div>
                        <div
                            className="actions-btn"
                            onClick={() => {
                                setCreated(false);
                            }}
                        >
                            Add new member
                        </div>
                    </div>
                </>
            ) : (
                <div className="create">
                    <h3 className="create-title">Create new member</h3>
                    <form>
                        <div className="create-form">
                            <div className="input-list">
                                <h4>Member info</h4>
                                {createInputs(infoList, info, setInfo)}
                                <div className="input-group">
                                    <label className="input-label custom-file-upload" htmlFor="file">
                                        {file ? file.name : "Upload avatar"}
                                        <input
                                            type="file"
                                            id="file"
                                            onInput={e => {
                                                setFile(e.target.files[0]);
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="input-list">
                                <h4>
                                    Links <small>**at least one of the list</small>
                                </h4>
                                {createInputs(linkList, links, setLinks)}
                            </div>
                        </div>
                        <button className="btn btn-create" type="submit" onClick={create}>
                            Create
                        </button>
                    </form>
                </div>
            )}
        </>
    );

    function create(e) {
        e.preventDefault();
        createMember({info, links, file}).then(() => {
            setCreated(true);
        }).catch(error => {
            console.error(error)
        });
    }
}

export default CreateNewMember;
