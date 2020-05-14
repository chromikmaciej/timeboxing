import React, { useEffect } from "react";
import { getAllTimeboxes, getRemainingTimebosex } from "../reduceres";
import { connect } from "react-redux"; 
 
export function TimeboxesList({ timeboxes, renderTimebox }) {
    return <div className="TimeboxesList">{timeboxes.map(renderTimebox)}</div>;
}

export const AllTimeboxesList = connect(
    (state) => ({ timeboxes: getAllTimeboxes(state)})
)(TimeboxesList);

export const RemainingTimeboxesList = connect(
    (state) => ({ timeboxes: getRemainingTimebosex(state)})
)(TimeboxesList);
