import { SiteSettingsFragment } from "../../graphql";
import Head from 'next/head'
import Maybe from "graphql/tsutils/Maybe";
import { Header } from "./Header";
import * as BlockContent from '@sanity/block-content-to-react'
import { makeStyles } from "@material-ui/core";

interface ComponentProps {
    children: React.ReactNode;
    siteSettings: SiteSettingsFragment;
    title?: Maybe<string>;
}
type Props = ComponentProps;

const useStyles = makeStyles(theme => ({
    footer: {
        textAlign: 'center',
        margin: theme.spacing(15, 0),
        fontSize: 20,
        color: theme.palette.text.secondary,
        textTransform: 'uppercase',
        letterSpacing: '.1rem'
    }
}))

export default (props: Props) => {
    const {
        children,
        siteSettings: settings,
        title
    } = props;

    const classes = useStyles();
    
    return <>
        <Head>
            <title>{title ? `${title} | ` : undefined}{settings.title}</title>
        </Head>
        {settings.siteHeader && <Header header={settings.siteHeader} title={settings.title} subtitleRaw={settings.subtitleRaw} />}
        {children}
        {settings.siteFooter && settings.siteFooter.contentRaw && <div className={classes.footer}>
            {(settings.siteFooter.socialMedia || []).filter(s => s && s._key).map(s => s).map(socialMedia => <span key={socialMedia!._key!}>
                <a href={socialMedia!.url!} target="_blank" rel="noopener noreferrer">{socialMedia!.icon!}</a>
            </span>)}
            <BlockContent blocks={settings.siteFooter.contentRaw} />
        </div> }
    </>
}