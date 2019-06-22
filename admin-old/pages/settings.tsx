import * as React from 'react';
import redirect from '../utils/redirect';
import checkLoggedIn from '../utils/checkLoggedIn';
import { CustomNextContext } from '../utils/CustomNextContext';
import Layout from '../components/Layout';
import { Grid, Container, Paper } from '@material-ui/core';
import SettingsForm from '../components/Settings/SettingsForm';

interface InitialProps {
}

type Props = InitialProps;

class Settings extends React.Component<Props> {
    static async getInitialProps(ctx: CustomNextContext): Promise<InitialProps> {
        const { query: { postId, type } } = ctx;
        const loggedInUser = await checkLoggedIn(ctx.apolloClient);
        if (!loggedInUser) {
            redirect(ctx, "/login");
        }
        return {}
    }

    render() {
        return <Layout title="Settings">
            <SettingsForm />
        </Layout>
    }
}

export default Settings