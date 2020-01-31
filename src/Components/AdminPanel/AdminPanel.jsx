import React from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
// import MembersList from './AdminComponents/MembersList';
import CreateNewMember from './AdminComponents/CreateNewMember';
// import UpdateMember from './AdminComponents/UpdateMember';

import "./AdminPanel.css";

function AdminPanel(props) {
    const { path, url } = useRouteMatch();

    return (
        <div className="admin-panel">
            <div className="admin-panel__header">
                <h2 className="header-title">Admin panel</h2>
                <div className="header-menu">
                    <Link className="header-menu__link" to={url}>
                        Members
                    </Link>
                    <Link className="header-menu__link" to={url + "/create"}>
                        Create
                    </Link>
                </div>
            </div>
            <Switch>
                <Route path={path + "/"} children={<CreateNewMember />} />
                {/* <Route path={path + "/update/:id"} children={<UpdateMember />} /> */}
                {/* <Route path={path} children={<MembersList />} /> */}
            </Switch>
        </div>
    );
}

export default AdminPanel;
