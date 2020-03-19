import React from "react";
import { InspirationalQuoteViewer } from "./AlternativeInspirationalQuoteViewer";

class InspirationalQuoteManager extends React.Component {
    state = {
        quote: null
    }
    componentDidMount() {
        import("inspirational-quotes").then(
            (Quotes) => {
                this.setState({ quote: Quotes.getQuote() });
            }
        ).catch(() => console.log("Couldn't load quotes"));
    }
    render() {
        return (
            <>
                {this.state.quote ?
                <InspirationalQuoteViewer
                    text={this.state.quote.text}
                    author={this.state.quote.author}
                /> :
                    "...."
                }
            </>
        );
    }
}

export default InspirationalQuoteManager;
