import React, { useEffect } from "react";
import { getAllTimeboxes } from "../reduceres";
import { useStore } from "react-redux"; 
import { useForceUpdate} from "./TimeboxesManager";
 
export function TimeboxesList({ timeboxes, renderTimebox }) {
    return <div className="TimeboxesList">{timeboxes.map(renderTimebox)}</div>;
}

export function AllTimeboxesList({ renderTimebox }) {
    const store = useStore();
    const state = store.getState();
    const forceUpdate = useForceUpdate();
    useEffect(() => store.subscribe(forceUpdate), []);
    return <TimeboxesList
        timeboxes={getAllTimeboxes(state)}
        renderTimebox={renderTimebox}
    />
}