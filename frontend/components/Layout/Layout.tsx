import { SiteSettingsFragment } from "../../graphql";
import Head from 'next/head'
import Maybe from "graphql/tsutils/Maybe";
import { Header } from "./Header";

interface ComponentProps {
    children: React.ReactNode;
    siteSettings: SiteSettingsFragment;
    title?: Maybe<string>;
}
type Props = ComponentProps;

export default (props: Props) => {
    const {
        children,
        siteSettings: settings,
        title
    } = props;
    
    return <>
        <Head>
            <title>{title ? `${title} | ` : undefined}{settings.title}</title>
        </Head>
        {settings.siteHeader && <Header header={settings.siteHeader} title={settings.title} />}
        {children}
    </>
}