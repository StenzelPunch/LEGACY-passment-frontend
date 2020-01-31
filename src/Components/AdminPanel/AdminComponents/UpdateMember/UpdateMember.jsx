import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateMember, getMember, createAvatar} from "../../../../api";
import linksList from "../../../../linkList";
import MemberInput from "../MemberInput";
import Loading from "../../../Loading";
import "./UpdateMember.css";

function UpdateMember(props) {
    const { id } = useParams();
    const history = useHistory();

    const [updated, setUpdated] = useState(false);

    const [file, setFile] = useState(null);
    const [user, setUser] = useState(null);
    const [info, setInfo] = useState({});
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
                    value={info[key]}
                    onChange={e => {
                        setInfo({
                            ...info,
                            [key]: e.target.value
                        });
                    }}
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
                    value={item.value}
                    onChange={e => {
                        const _arr = array;
                        _arr[index].value = e.target.value;
                        setLinks([..._arr]);
                    }}
                />
            );
        });
        return inputsArray;
    };

    useEffect(() => {
        if (!user) {
            getMember(id)
                .then(user => {
                    setUser(user);
                    setInfo({
                        first_name: user.first_name,
                        last_name: user.last_name,
                        patronymic: user.patronymic,
                        info: user.info,
                        user_phone: user.user_phone,
                        user_email: user.user_email
                    });
                    setLinks(user.links);
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
                                    <h4>Links</h4>
                                    {createInputsForLinks()}
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
        updateMember({ ...info, url: user.url, links: links })
            .then(() => {
                setUpdated(true);
            })
            .catch(error => {
                console.error(error);
            });

        if (file) {createAvatar(user.url,file)}
    }
}

export default UpdateMember;
