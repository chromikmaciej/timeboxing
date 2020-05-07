import React, { useEffect } from "react";
import { getAllTimeboxes } from "../reduceres";
import { connect } from "react-redux"; 
 
export function TimeboxesList({ timeboxes, renderTimebox }) {
    return <div className="TimeboxesList">{timeboxes.map(renderTimebox)}</div>;
}

const mapStateToProps = (state) => ({ timeboxes: getAllTimeboxes(state)});
export const AllTimeboxesList = connect(mapStateToProps)(TimeboxesList);
