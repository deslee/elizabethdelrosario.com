import { compose } from "recompose";
import Error from 'next/error';
import { withSiteSettings, SiteSettingsQuery } from "../graphql";
import withSanity from "../graphql/withSanity";
import { DataValue } from "react-apollo";
import Head from "next/head";
import ItemContainer from "../containers/ItemContainer";

interface Props {
    siteSettings: DataValue<SiteSettingsQuery>
}

const FrontPage = ({ siteSettings }: Props) => {
    // show loading page if client based
    if (siteSettings.loading) {
        return <>
            <Head><title>Loading</title></Head>
        </> // TODO: loading component
    }

    if (!siteSettings.settings) {
        console.log("site settings not found")
        return <>
            <Error statusCode={500} />
            <span style={{display: 'none'}}>Site settings not found</span>
        </>
    }
    const settings = siteSettings.settings;

    if (settings.frontPage) {
        return <ItemContainer siteSettings={settings} item={settings.frontPage} />
    } 

    return <Error statusCode={404} />
}

export default compose<Props, unknown>(
    withSanity,
    withSiteSettings({ props: props => ({ siteSettings: props.data }) })
)(FrontPage)