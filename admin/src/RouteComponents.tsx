import React from 'react';
import H from 'history';
import { withRouter, match } from "react-router";
import { Link as RouterLink } from 'react-router-dom';

// decouples router logic from components for easier integration
export interface WithRoutingInjectedProps {
    history: H.History;
    location: H.Location;
}
export function withRouting<P extends WithRoutingInjectedProps>(Component: React.ComponentType<P>): React.ComponentClass<Omit<P, keyof WithRoutingInjectedProps>> {
    return withRouter<P & {match: match<any>}>(props => <Component {...props} />) as any
}
export interface LinkProps {
    to: H.LocationDescriptor;
    replace?: boolean;
    children: any;
}
export const Link = ({children, ...props}: LinkProps) => {
    return <RouterLink {...props}>{children}</RouterLink>
}