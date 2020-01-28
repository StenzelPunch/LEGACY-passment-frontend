import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createMember } from "../../../../backend.js";

import { expandLinks, expandInfo } from '../../../../DataSchema'

import "./CreateNewMember.css";

const createInputs = (state, setState) => {
    const inputsArray = [];

    state.forEach((item, index, array) => {
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
                ></input>
            </div>
        );
    });

    return inputsArray;
};

function CreateNewMember(props) {
    const [info, setInfo] = useState(expandInfo());
    const [links, setLinks] = useState(expandLinks());

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
                                {createInputs(info, setInfo)}
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
                                {createInputs(links, setLinks)}
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
        createMember({info, links, file})
            .then(() => {
                setCreated(true);
            })
            .catch(error => {
                console.error(error);
            });
    }
}

export default CreateNewMember;
