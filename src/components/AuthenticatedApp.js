import React from "react";
import Header from "./Header";
import EditableTimebox from "./EditableTimebox";
import TimeboxesManager from "./TimeboxesManager";
import InspirationalQuoteManager from "./InspirationalQuoteManager";

function AuthenticatedApp({ accessToken, onLogout }) {
    return (
        <>
            <Header onLogout={onLogout} />
            <TimeboxesManager />
            <EditableTimebox />
            <InspirationalQuoteManager />
        </>
    );
}

export default AuthenticatedApp;