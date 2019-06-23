import React from 'react';
import ReactDOM from 'react-dom';
import cookie from 'cookie';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import { DialogProvider } from './utils/DialogContext';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import DayJsUtils from '@date-io/dayjs';
import { SnackbarProvider } from 'notistack';
import theme from './theme';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import initApollo from './data-access/apollo';
import Router from './Router';

if ((module as any).hot) {
    (module as any).hot.accept();
}
  
const client = initApollo({}, {
    getToken: () => cookie.parse(document.cookie, {})['token'],
    getXsrfId: () => {
        return cookie.parse(document.cookie, {})['X-XSRF-ID']
    }
})
ReactDOM.render(<ApolloProvider client={client}>
    <MuiPickersUtilsProvider utils={DayJsUtils}>
        <ThemeProvider theme={theme}>
            <DialogProvider>
                <SnackbarProvider maxSnack={3} autoHideDuration={1500}>
                    <Router />
                </SnackbarProvider>
            </DialogProvider>
        </ThemeProvider>
    </MuiPickersUtilsProvider>
</ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
