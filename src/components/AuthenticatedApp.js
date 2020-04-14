import React from "react";
import Header from "./Header";
import CurrentTimebox from "./CurrentTimebox";
import TimeboxesManager from "./TimeboxesManager";
import InspirationalQuote from "./InspirationalQuote";
import UserGreeting from "./UserGreeting"

function AuthenticatedApp({ onLogout}) {
    return (
        <>
            <Header>
                {/* <UserGreeting />
                    <a 
                        onClick={onLogout} 
                        className="header__logout-link" 
                        href="#"
                    >
                    Wyloguj się
                    </a> */}
            </Header>
            <TimeboxesManager />
            <CurrentTimebox 
                        title="Uczę się zaawansowanych wzorców" 
                        totalTimeInMinutes={4} 
                    />
            <InspirationalQuote />
        </>
    );
}

export default AuthenticatedApp;