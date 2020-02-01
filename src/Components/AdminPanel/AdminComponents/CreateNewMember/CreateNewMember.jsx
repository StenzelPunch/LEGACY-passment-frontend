import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { createMember, createAvatar } from "../../../../api";
import linksList from "../../../../linkList";
import MemberInput from "../MemberInput";
import "./CreateNewMember.css";

function CreateNewMember(props) {
    const [file, setFile] = useState(null);
    const [created, setCreated] = useState(false);
    const history = useHistory();

    const [info, setInfo] = useState({
        url: "",
        first_name: "",
        last_name: "",
        patronymic: "",
        info: "",
        user_phone: "",
        user_email: ""
    });

    const [links, setLinks] = useState(
        linksList.map(item => {
            return { name: item, value: "" };
        })
    );

    const createInputsForInfo = () => {
        const inputsArray = [];

        for (let key in info) {
            inputsArray.push(
                <MemberInput
                    key={key}
                    name={key}
                    onChange={e => {
                        setInfo({
                            ...info,
                            [key]: e.target.value
                        });
                    }}
                    value={info[key]}
                />
            );
        }

        return inputsArray;
    };

    const createInputsForLinks = () => {
        const inputsArray = [];

        links.forEach((item, index, array) => {
            inputsArray.push(
                <MemberInput
                    key={item.name}
                    name={item.name}
                    onChange={e => {
                        const _arr = array;
                        _arr[index].value = e.target.value;
                        setLinks([..._arr]);
                    }}
                    value={links[index].value}
                />
            );
        });

        return inputsArray;
    };

    return (
        <>
            {created ? (
                <>
                    <Helmet>
                        <title>Creation success</title>
                    </Helmet>
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
                    <Helmet>
                        <title>New member</title>
                    </Helmet>
                    <h3 className="create-title">Create new member</h3>
                    <form>
                        <div className="create-form">
                            <div className="input-list">
                                <h4>Member info</h4>
                                {createInputsForInfo()}
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
                                {createInputsForLinks()}
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
        createMember({
            ...info,
            reg_date: new Date(),
            sub: false,
            uid: "",
            sub_end_dadte: new Date(),
            links
        })
            .then(() => {
                setCreated(true);
            })
            .catch(error => {
                console.error(error);
            });

        if (file) {createAvatar(info.url, file)}
    }
}

export default CreateNewMember;
