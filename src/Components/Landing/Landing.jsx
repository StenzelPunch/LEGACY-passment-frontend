import React from "react";
import {
    Header,
    Service,
    Usage,
    Innovations,
    Image,
    Cards,
    Gadgets,
    Questions,
    Contacts,
    Footer
} from "./LandingCompoents";

import "./Landing.scss";

function Landing() {
    return (
        <div className="landing">
            <Header />
            <main>
                <Service />
                <Usage />
                <Innovations />
                <Image />
                <Cards />
                <Gadgets />
                <Questions />
                <Contacts />
            </main>
            <Footer />
        </div>
    );
}

export default Landing;
