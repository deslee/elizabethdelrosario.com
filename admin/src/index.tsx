import React from 'react';
import ReactDOM from 'react-dom';
import cookie from 'cookie';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import { DialogProvider } from './utils/DialogContext';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import DayJsUtils from '@date-io/dayjs';
import { SnackbarProvider } from 'notistack';
import theme from './theme';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import AuthRoute from './pages/authRoute'; 
import initApollo from './apollo';
import { routeKeys, routes } from './pages/routes';

const client = initApollo({}, {
    getToken: () => cookie.parse(document.cookie, {})['token'],
    getXsrfId: () => {
        console.log(cookie.parse(document.cookie, {})['X-XSRF-ID'])
        return cookie.parse(document.cookie, {})['X-XSRF-ID']
    }
})
ReactDOM.render(<ApolloProvider client={client}>
    <MuiPickersUtilsProvider utils={DayJsUtils}>
        <ThemeProvider theme={theme}>
            <DialogProvider>
                <SnackbarProvider maxSnack={3} autoHideDuration={1500}>
                    <BrowserRouter>
                        <Switch>{
                            routeKeys.map(routeKey => {
                                return <AuthRoute key={routeKey} {...routes[routeKey]} />
                            })
                        }</Switch>
                    </BrowserRouter>
                </SnackbarProvider>
            </DialogProvider>
        </ThemeProvider>
    </MuiPickersUtilsProvider>
</ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
