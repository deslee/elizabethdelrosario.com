import React, { useState } from 'react';

// Externals
import clsx from 'clsx';
import compose from 'recompose/compose';

// Material helpers
import { makeStyles, useMediaQuery } from '@material-ui/core';

// Material components
import Drawer from '@material-ui/core/SwipeableDrawer';

// Custom components
import Sidebar from './Sidebar';
import Topbar from './TopBar'; 
import Footer from './Footer'; 

// Component styles
import theme from '../../theme';
import { RouteKey } from '../../Router';

import constants from '../../Constants';

interface ComponentProps {
    children: any;
    title?: string;
    route?: RouteKey;
}
type Props = ComponentProps;

const useStyles = makeStyles(theme => ({
    topbar: {
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
        right: 'auto',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    topbarShift: {
        marginLeft: '271px',
        width: 'calc(-271px + 100vw)'
    },
    drawerPaper: {
        zIndex: 1200,
        width: '271px'
    },
    sidebar: {
        width: '270px'
    },
    main: {
        marginTop: '64px',
        minHeight: `calc(100vh - ${constants.appBarHeight}px)`,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.default,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    content: {
        flex: 1,
        display: 'flex'
    },
    contentShift: {
        marginLeft: '270px'
    }
}))

const Dashboard = ({title, children}: Props) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [ isOpen, setOpen ] = useState(!isMobile)
    const classes = useStyles();

    React.useEffect(() => {
        setTimeout(() => setOpen(!isMobile))
    }, [isMobile])
    const handleClose = React.useCallback(() => setOpen(false), [setOpen])
    const handleOpen = React.useCallback(() => setOpen(true), [setOpen])
    const handleToggleOpen = React.useCallback(() => setOpen(!isOpen), [setOpen, isOpen])

    const shiftTopbar = isOpen && !isMobile;
    const shiftContent = isOpen && !isMobile;
    return <>
        <Topbar
            className={clsx(classes.topbar, {
                [classes.topbarShift]: shiftTopbar
            })}
            isSidebarOpen={isOpen}
            onToggleSidebar={handleToggleOpen}
            title={title}
        />
        <Drawer
            anchor="left"
            classes={{ paper: classes.drawerPaper }}
            onClose={handleClose}
            open={isOpen}
            onOpen={handleOpen}
            variant={isMobile ? 'temporary' : 'persistent'}
        >
            <Sidebar className={classes.sidebar} onSelected={() => {isMobile && handleClose()}} />
        </Drawer>
        <main
            className={clsx(classes.main, {
                [classes.contentShift]: shiftContent
            })}
        >
            <div className={classes.content}>{children}</div>
            <Footer />
        </main>
    </>
}

export default compose<Props, ComponentProps>(
)(Dashboard);
