import React from "react";
export function InspirationalQuoteComponent({ text, author }) {
    return (
     <figure>
        <blockquote className="Text">{text}</blockquote>
        <figcaption className="Author"><cite>{author}</cite></figcaption>
    </figure>);
}