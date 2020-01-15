import React, { useState, useEffect } from "react";
import { createMember , storage} from "../../../../backend.js";

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
        { name: "facebook", required: false },
        { name: "instagram", required: false },
        { name: "email", required: false },
        { name: "linkedin", required: false },
        { name: "phone", required: false },
        { name: "telegram", required: false },
        { name: "twitter", required: false },
        { name: "viber", required: false },
        { name: "vk", required: false }
    ];

    const [info, setInfo] = useState({});
    const [links, setLinks] = useState({});
    const [created, setCreated] = useState(false);

    return (
        <>
            {created ? (
                <div className="creation-success">Creation success</div>
            ) : (
                <div className="create">
                    <h3 className="create-title">Create new member</h3>
                    <form>
                        <div className="create-form">
                            <div className="input-list">
                                <h4>Member info</h4>
                                {createInputs(infoList, info, setInfo)}
                                <input type="file" onInput={fileInput}/>
                            </div>
                            <div className="input-list">
                                <h4>Links <small>**at least one of the list</small></h4>
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

    function fileInput(e) {
        // const image = new File(e.target.files[0], '')
        // console.log(image.name);

        storage
                        .refFromURL(`gs://passment-be.appspot.com/avatars/${e.target.files[0].name}`)
                        .put(e.target.files[0])
                        .then(msg => {
                            alert("success");
                        })
                        .catch(error => {
                            alert(error.message);
                        });
    }

    function create(e) {
        e.preventDefault();
        createMember(info, links, setCreated).then(() => {
            console.log('success')
        });
    }
}

export default CreateNewMember;
