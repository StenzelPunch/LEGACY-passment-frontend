import React, { useState, useEffect } from "react";
import { loadMembers } from "../../../../backend.js";

import "./MembersList.css";


const list = members => {
    if (members) {
        const membersList = [];
        for (let member of members) {
            membersList.push(<div key={member.user_id}>{member.first_name + " " + member.last_name}</div>);
        }
        return membersList;
    } else {
        return "Loading...";
    }
};

function MembersList() {
    const [members, setMembers] = useState(null);

    useEffect(() => {
        if (!members) {
            loadMembers(members => {
                setMembers(members);
            });
        }
    });

    return (
        <div>
            <h3>Members list</h3>
            {list(members)}
        </div>
    );
}

export default MembersList;
