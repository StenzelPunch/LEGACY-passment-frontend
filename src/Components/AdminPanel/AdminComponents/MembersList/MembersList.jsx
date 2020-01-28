import React, { useState, useEffect } from "react";
import { loadMembers, deleteMember } from "../../../../backend.js";
import { useHistory } from "react-router-dom";


import changeImg from "../../../../images/change.svg";
import deleteImg from "../../../../images/delete.svg";

import "./MembersList.css";

const list = (members, onChange, onDelete) => {
    if (members) {
        const membersList = [];
        for (let member of members) {
            membersList.push(
                <div className="mlist-row" key={member.first_name}>
                    <div className="mlist-item">{member.id}</div>
                    <div className="mlist-item">
                        <a href={"/" + member.url}>{member.url}</a>
                    </div>
                    <div className="mlist-item">{member.first_name + " " + member.last_name}</div>
                    <div className="mlist-item">{member.user_phone}</div>
                    <div className="mlist-item">{member.user_email}</div>
                    <div className="mlist-item change">
                        <img
                            className="item-icon"
                            src={changeImg}
                            onClick={() => {
                                onChange(member.url)
                            }}
                            alt=""
                        />
                    </div>
                    <div className="mlist-item delete">
                        <img
                            className="item-icon"
                            src={deleteImg}
                            onClick={() => {
                                onDelete(member.url)
                            }}
                            alt=""
                        />
                    </div>
                </div>
            );
        }
        return membersList;
    }
};

function MembersList() {
    const [members, setMembers] = useState(null);
    const history = useHistory();
    

    useEffect(() => {
        if (!members) {
            loadMembers().then(members => {
                setMembers(members);
            });
        }
    });

    function onChange(url) {
        history.push("/__admin__/update/" + url);
    }

    function onDelete(url) {
        deleteMember(url).then(() => {
            setMembers(null)
        });
    }

    return (
        <div className="mlist">
            <h3 className="mlist-title" key="list-title">
                Members list
            </h3>
            <div className="mlist-row mlist-header" key="list-header">
                <div className="mlist-item">#</div>
                <div className="mlist-item">Url</div>
                <div className="mlist-item">Name</div>
                <div className="mlist-item">Phone</div>
                <div className="mlist-item">Email</div>
            </div>
            {list(members, onChange, onDelete)}
        </div>
    );
}

export default MembersList;
