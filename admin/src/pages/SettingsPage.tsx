import React from 'react';
import Layout from '../components/Layout';
import SettingsForm from '../components/Settings/SettingsForm';

interface ComponentProps {

}

type Props = ComponentProps;

export default (_: Props) => {
    return <Layout title="Settings">
        <SettingsForm />
    </Layout>
}