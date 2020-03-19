import React from "react";
export function InspirationalQuoteViewer({ text, author }) {
    return (<figure>
        <blockquote>{text}</blockquote>
        <figcaption><cite>{author}</cite></figcaption>
    </figure>);
}
