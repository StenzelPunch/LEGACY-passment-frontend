import React from "react";
import "./MemberInput.css"

const MemberInput = props => {
    return (
        <div className="input-group">
            <label className="input-label" htmlFor={props.name}>
                {props.name}:{" "}
            </label>
            <input
                className="input-text"
                id={props.name}
                type="text"
                value={props.value ? props.value : ''}
                onChange={e => {
                    props.onChange(e)
                }}
            ></input>
        </div>
    );
};

export default MemberInput;
