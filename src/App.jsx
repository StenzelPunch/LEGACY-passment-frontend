import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Card from "./Components/Card";
import Landing from "./Components/Landing";
import NotFound from "./Components/NotFound";

function App() {

    return (
        <Router>
            <div className="container gradient">
                <Switch>
                    <Route path="/404" children={<NotFound />} />
                    <Route path="/:id" children={<Card />} />
                    <Route path="/" children={<Landing />} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
