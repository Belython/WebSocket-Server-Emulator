import * as React from "react";
import {NavLink} from "react-router-dom";

export interface INAvLinkItem {
    children?: React.ReactNode,
    path: string,
    style?: React.CSSProperties
}

export default function NavLinkItem({children, path, style}: INAvLinkItem) {
    return (
        <NavLink style={style} to={path}>{children}</NavLink>
    );
}