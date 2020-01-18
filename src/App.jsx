import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Card from "./Components/Card";
import Landing from "./Components/Landing";
import NotFound from "./Components/NotFound";
import AdminPanel from "./Components/AdminPanel";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/__admin__" children={<AdminPanel />} />
                <Route path="/404" children={<NotFound />} />
                <Route path="/:id" children={<Card />} />
                <Route path="/" children={<Landing />} />
            </Switch>
        </Router>
    );
}

export default App;
