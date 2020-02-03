import React, { useState, useEffect } from "react";
import loadable from "@loadable/component";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import "./AdminPanel.css";
import { checkUser, signOut } from "../../api";
import Loading from "../../Components/Loading";

const MembersList = loadable(() => import("./AdminComponents/MembersList"));
const CreateNewMember = loadable(() => import("./AdminComponents/CreateNewMember"));
const UpdateMember = loadable(() => import("./AdminComponents/UpdateMember"));
const AdminLogin = loadable(() => import("./AdminComponents/AdminLogin"));

function AdminPanel(props) {
    const { path, url } = useRouteMatch();
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser()
            .then(user => {
                setAdmin(user);
                setLoading(false);
            })
            .catch(e => {
                console.warn(e.message);
                setAdmin(null);
                setLoading(false);
            });
    });

    return (
        <>
            {loading ? (
                <Loading />
            ) : !admin ? (
                <AdminLogin
                    onLogin={user => {
                        setAdmin(user);
                    }}
                />
            ) : (
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
                            <div
                                className="header-menu__link"
                                onClick={() => {
                                    setAdmin(null);
                                    signOut();
                                }}
                            >
                                Logout
                            </div>
                        </div>
                    </div>
                    <Switch>
                        <Route path={path + "/create"} children={<CreateNewMember />} />
                        <Route path={path + "/update/:id"} children={<UpdateMember />} />
                        <Route path={path} children={<MembersList />} />
                    </Switch>
                </div>
            )}
        </>
    );
}

export default AdminPanel;
