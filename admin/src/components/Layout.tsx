import * as React from 'react';
import { makeStyles, CssBaseline, AppBar, Toolbar, IconButton, Typography, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, createMuiTheme, Link } from '@material-ui/core';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import PostIcon from '@material-ui/icons/Notes';
import AssetsIcon from '@material-ui/icons/Collections';
import PageIcon from '@material-ui/icons/LibraryBooks';
import SettingsIcon from '@material-ui/icons/Settings';
import constants from '../Constants';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../theme'
import { Query } from "react-apollo";
import { Link as RouterLink, RouteComponentProps, withRouter } from "react-router-dom";
import { GET_CURRENT_USER_QUERY, GetCurrentUserResult, GetCurrentUserVariables } from "./User/UserQueries";
import Logout from "./Logout";
import 'react-image-lightbox/style.css';
import { routes, RouteKey } from '../pages/routes';
import { compose } from 'recompose';
import { Helmet } from "react-helmet";
import { jsonToUserData } from './User/UserData';
import { useTheme, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ClassNameMap } from '@material-ui/styles/withStyles';
import FullPageLoading from './FullPageLoading';

export const MainListItems = ({route, classes}: {route: RouteKey, classes: ClassNameMap}) => {
    return <>
        <ListItem selected={route === 'home'} classes={{selected: classes.selected}} button component={RouterLink} to={routes.home.path}>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Site" />
        </ListItem>
        <ListItem selected={route === 'posts'} classes={{selected: classes.selected}} button component={RouterLink} to={routes.posts.path.replace(routes.posts.params!.id, '')}>
            <ListItemIcon>
                <PostIcon />
            </ListItemIcon>
            <ListItemText primary="Posts" />
        </ListItem>
        <ListItem selected={route === 'pages'} classes={{selected: classes.selected}} button component={RouterLink} to={routes.pages.path.replace(routes.pages.params!.id, '')}>
            <ListItemIcon>
                <PageIcon />
            </ListItemIcon>
            <ListItemText primary="Pages" />
        </ListItem>
        <ListItem selected={route === 'assets'} classes={{selected: classes.selected}} button component={RouterLink} to={routes.assets.path}>
            <ListItemIcon>
                <AssetsIcon />
            </ListItemIcon>
            <ListItemText primary="Assets" />
        </ListItem>
        <ListItem selected={route === 'settings'} classes={{selected: classes.selected}} button component={RouterLink} to={routes.settings.path}>
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
        </ListItem>
    </>
};

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    loading: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
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
    menuItemSelected: {
        backgroundColor: `${theme.palette.primary.main} !important`
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
    profileIcon: {
    },
    displayName: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    }
}));

interface ComponentProps {
    children: React.ReactNode,
    title?: string,
    route?: RouteKey
}

type Props = ComponentProps & RouteComponentProps

const darkTheme = createMuiTheme({
    ...theme,
    palette: {
        type: 'dark'
    },
});

function Layout({ title, children, history, route }: Props) {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSmallView = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(true);
    React.useEffect(() => {
        setOpen(!matchesSmallView)
    }, [matchesSmallView])
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const getDisplayName = (data: GetCurrentUserResult | undefined) => {
        if (data && data.user) {
            var userData = jsonToUserData(data.user.data)
            return userData.displayName ? userData.displayName : userData.firstName ? (userData.firstName + (userData.lastName && ' ' + userData.lastName)) : userData.lastName ? userData.lastName : data.user.email
        } else {
            return 'User'
        }
    }

    return <>
        <Helmet>
            <title>{title ? `${title} - Admin` : 'Admin'}</title>
        </Helmet>
        <Query<GetCurrentUserResult, GetCurrentUserVariables> query={GET_CURRENT_USER_QUERY}>{({ loading, data }) =>
            loading ? <div className={classes.loading}><FullPageLoading /></div> : <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap
                            className={classes.title}>{title}</Typography>
                        <IconButton color="inherit" className={classes.profileIcon} onClick={() => history.push(routes.profile.path)}>
                            <ProfileIcon />
                        </IconButton>
                        <Link to={routes.profile.path} className={classes.displayName} component={RouterLink} color="inherit">{getDisplayName(data)}</Link>
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
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        {route && <List className={classes.topDrawerList}><MainListItems route={route} classes={{selected: classes.menuItemSelected}} /></List>}
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
                    <div className={classes.appBarSpacer} />
                    {children}
                </main>
            </div>
        }</Query>
    </>;
}

export default React.memo(compose<Props, ComponentProps>(
    withRouter
)(Layout));