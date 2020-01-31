import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateMember, getMember } from "../../../../backend.ts";
import { parseInfo } from '../../../../DataSchema'

import Loading from "../../../Loading";

import "./UpdateMember.css";

const updateInputs = (state, setState) => {
    const inputsArray = [];

    state.forEach((item, index, array) => {
        if (item.name !== "url") {
            inputsArray.push(
                <div className="input-group" key={item.name}>
                    <label className="input-label" htmlFor={item.name}>
                        {item.name}:{" "}
                    </label>
                    <input
                        className="input-text"
                        id={item.name}
                        type="text"
                        required={item.required}
                        onChange={e => {
                            const _arr = array;
                            _arr[index].value = e.target.value;
                            console.log(state);
                            setState([..._arr]);
                        }}
                        value={item.value}
                    ></input>
                </div>
            );
        }    
    });

    return inputsArray;
};

function UpdateMember(props) {
    const [info, setInfo] = useState([]);
    const [links, setLinks] = useState([]);

    const [file, setFile] = useState(null);
    const [updated, setUpdated] = useState(false);

    const [user, setUser] = useState(null);

    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (!user) {
            getMember(id)
                .then(user => {
                    const [_user, _info, _links] = parseInfo(user[0]);

                    setUser(_user);
                    setInfo(_info);
                    setLinks(_links);
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
                        <h3 className="update-title">Update member</h3>
                        <form>
                            <div className="update-form">
                                <div className="input-list">
                                    <h4>Member info</h4>
                                    {updateInputs(info, setInfo)}
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
                                    <h4>Links</h4>
                                    {updateInputs(links, setLinks)}
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
