import * as React from 'react';
import { makeStyles, CssBaseline, AppBar, Toolbar, IconButton, Typography, Badge, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, createMuiTheme } from '@material-ui/core';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import PostIcon from '@material-ui/icons/Notes';
import AssetsIcon from '@material-ui/icons/Collections';
import PageIcon from '@material-ui/icons/LibraryBooks';
import SettingsIcon from '@material-ui/icons/Settings';
import constants from '../Constants';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../theme'
import {Query} from "react-apollo";
import { Link as RouterLink } from "react-router-dom";
import {GET_CURRENT_USER_QUERY, GetCurrentUserResult, GetCurrentUserVariables} from "./User/UserQueries";
import Logout from "./Logout";
import 'react-image-lightbox/style.css';
import { routes } from '../pages/routes';

export const mainListItems = (
    <>
        <ListItem button component={RouterLink} to={routes.home.path}>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Site" />
        </ListItem>
        <ListItem button component={RouterLink} to={routes.posts.path.replace(routes.posts.params!.id, '')}>
            <ListItemIcon>
                <PostIcon />
            </ListItemIcon>
            <ListItemText primary="Posts" />
        </ListItem>
        <ListItem button component={RouterLink} to={routes.pages.path.replace(routes.pages.params!.id, '')}>
            <ListItemIcon>
                <PageIcon />
            </ListItemIcon>
            <ListItemText primary="Pages" />
        </ListItem>
        <ListItem button component={RouterLink} to={routes.assets.path}>
            <ListItemIcon>
                <AssetsIcon />
            </ListItemIcon>
            <ListItemText primary="Assets" />
        </ListItem>
        <ListItem button component={RouterLink} to={routes.settings.path}>
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
        </ListItem>
    </>
);

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    toolbarTitle: {
        flexGrow: 1,
        paddingLeft: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    appBar: {
        height: constants.appBarHeight,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: constants.drawerWidth,
        width: `calc(100% - ${constants.drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: constants.drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    topDrawerList: {
        flexGrow: 1
    },
    bottomDrawerList: {
    },
}));

interface Props {
    children: React.ReactNode,
    title: string,
    requiresAuthentication?: boolean
}

const darkTheme = createMuiTheme({
    ...theme,
    palette: {
        type: 'dark'
    },
});

function Layout({title, children}: Props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return <Query<GetCurrentUserResult, GetCurrentUserVariables> query={GET_CURRENT_USER_QUERY}>{({loading}) =>
        loading ? <div>Loading</div> : <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap
                                className={classes.title}>{title}</Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <ThemeProvider theme={darkTheme}>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarHeader}>
                        <Typography variant="h6" className={classes.toolbarTitle}>Admin</Typography>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <List className={classes.topDrawerList}>{mainListItems}</List>
                    <Logout>
                        <List className={classes.bottomDrawerList}>
                            <ListItem button>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        </List>
                    </Logout>
                </Drawer>
            </ThemeProvider>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                {children}
            </main>
        </div>
    }</Query>;
}

export default Layout;