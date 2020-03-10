import React from "react";
import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox";
import ErrorBoundary from "./ErrorBoundary";

class App extends React.Component {

    isUserLoggedIn() {
        return true;
    }

    getUserEmail() {
        return "al@example.com";
    }

    handleLogout = () => {
        console.log("handle logout");
    }
    render() {
        return (
            <div className="App">
                <ErrorBoundary message="Coś nie działa w całej aplikacji">
                    {
                        this.isUserLoggedIn() ?
                        <>
                            <header className="header">
                                Witaj {this.getUserEmail()}
                                <a onClick={this.handleLogout} className="header__logout-link" href="#">Wyloguj się</a>
                            </header>
                            <TimeboxList />
                            <ErrorBoundary message="Coś nie działa w EditableTimebox">
                                <EditableTimebox />
                            </ErrorBoundary>
                        </>:
                        <div>Login form</div>
                    }
                </ErrorBoundary>
            </div>
        );
    }
}

export default App;