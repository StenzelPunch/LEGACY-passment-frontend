import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateMember, getMember } from "../../../../backend.js";

import Loading from "../../../Loading";

import "./UpdateMember.css";

const updateInputs = (array, state, callback) => {
    const inputsArray = [];

    array.forEach((arr) => {
        if (arr.name !== 'id' && arr.name !== 'links' && arr.name !== 'url') {
           
        
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
                    onChange={e => {
                        callback({
                            ...state,
                            [arr.name]: e.target.value
                        });
                    }}
                    value={state[arr.name]}
                ></input>
            </div>
        );
                }
    });

    return inputsArray;
};

function UpdateMember(props) {
    const infoList = [
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
    const [updated, setUpdated] = useState(false);

    const [user, setUser] = useState(null);

    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (!user) {
            getMember(id)
                .then(user => {
                    const data = user[0];
                    const dataInfo = {}
                    for (let [key, value] of Object.entries(data)) {
                            dataInfo[key] = value;
                    } 

                    setInfo(dataInfo)
                    setLinks(data.links)
                    setUser(data);
                })
                .catch(err => {
                    history.push("/404");
                    console.warn(err.message);
                });
        }
    });

    return (
        <>
            {user ? (
                updated ? (
                    <>
                        <div className="creation-success">Update success</div>
                        <div className="creation-actions">
                            <div
                                className="actions-btn"
                                onClick={() => {
                                    history.push("/__admin__");
                                }}
                            >
                                Go to members
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="update">
                        <h3 className="update-title">update new member</h3>
                        <form>
                            <div className="update-form">
                                <div className="input-list">
                                    <h4>Member info</h4>
                                    {updateInputs(infoList, info, setInfo)}
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
                                    {updateInputs(linkList, links, setLinks)}
                                </div>
                            </div>
                            <button className="btn btn-update" type="submit" onClick={update}>
                                update
                            </button>
                        </form>
                    </div>
                )
            ) : (
                <div className="update-loading">
                    <Loading />
                </div>
            )}
        </>
    );

    function update(e) {
        e.preventDefault();
        updateMember({ info, links, file })
            .then(() => {
                setUpdated(true);
            })
            .catch(error => {
                console.error(error);
            });
    }
}

export default UpdateMember;
