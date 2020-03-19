import React from "react";
import "../styles/inspirationalquote.css";
export function InspirationalQuoteViewer({ text, author }) {
    return (
     <figure className="InspirationalQuote">
        <blockquote className="Text">{text}</blockquote>
        <figcaption className="Author"><cite>{author}</cite></figcaption>
    </figure>);
}
