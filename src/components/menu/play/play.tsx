import * as React from 'react';
import {NavLink} from "react-router-dom";

export default function Play() {
    return (
        <NavLink style={({isActive}) => ({
            color: isActive ? 'red' : 'inherit',
            textDecoration: "none"
        })} to="/read">Воспроизведение</NavLink>
    );
}