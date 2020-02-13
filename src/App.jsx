import React from "react";
import loadable from "@loadable/component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import "./App.css";

const Card = loadable(() => import("./Components/Card"));
const Landing = loadable(() => import("./Components/Landing"));
const NotFound = loadable(() => import("./Components/NotFound"));
const AdminPanel = loadable(() => import("./Components/AdminPanel"));

function App({ t }) {
    return (
        <Router>
            <Switch>
                <Route path="/__admin__" children={<AdminPanel />} />
                <Route path="/404.html" children={<NotFound />} />
                <Route path="/404" children={<NotFound />} />
                <Route path="/:id" children={<Card />} />
                <Route path="/" children={<Landing />} />
            </Switch>
        </Router>
    );
}

export default withNamespaces()(App);
