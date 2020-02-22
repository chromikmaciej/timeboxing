import React from "react";
import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox";
import ErrorBoundary from "./ErrorBoundary";



function App() {
    return (
        <div className="App">
            <ErrorBoundary message="Coś nie działa w całej aplikacji">
                <TimeboxList />
                <ErrorBoundary message="Coś nie działa w EditableTimebox">
                    <EditableTimebox />
                </ErrorBoundary>
            </ErrorBoundary>
        </div>
    );
}

export default App;