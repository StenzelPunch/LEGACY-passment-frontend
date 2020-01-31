import React from "react";
import loadable from '@loadable/component';
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import "./AdminPanel.css";

const MembersList = loadable(() => import('./AdminComponents/MembersList'))
const CreateNewMember = loadable(() => import('./AdminComponents/CreateNewMember'))
const UpdateMember = loadable(() => import('./AdminComponents/UpdateMember'))

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
                <Route path={path + "/create"} children={<CreateNewMember />} />
                <Route path={path + "/update/:id"} children={<UpdateMember />} />
                <Route path={path} children={<MembersList />} />
            </Switch>
        </div>
    );
}

export default AdminPanel;
