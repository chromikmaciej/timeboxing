import React from "react";
import Header from "./Header";
import EditableTimebox from "./EditableTimebox";
import TimeboxesManager from "./TimeboxesManager";
import InspirationalQuoteManager from "./InspirationalQuoteManager";
import {InspirationalQuoteComponent} from "./InspirationalQuoteComponent";
import {AlternativeInspirationalQuoteComponent} from "./AlternativeInspirationalQuoteComponent";

function AuthenticatedApp({ accessToken, onLogout }) {
    function renderInspirationalQuote(text, author) {
        return <InspirationalQuoteComponent text={text} author={author} />
    }
    function alternativeRenderInspirationalQuote(text, author) {
        return <AlternativeInspirationalQuoteComponent text={text} author={author} />
    }
    return (
        <>
            <Header onLogout={onLogout} />
            <TimeboxesManager />
            <EditableTimebox />
            <InspirationalQuoteManager
             render={Math.random() < 0.5 ?
                 renderInspirationalQuote :
                 alternativeRenderInspirationalQuote}
            />
        </>
    );
}

export default AuthenticatedApp;