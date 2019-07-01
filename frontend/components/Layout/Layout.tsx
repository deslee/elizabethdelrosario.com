import { SiteSettingsFragment } from "../../graphql";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import Maybe from "graphql/tsutils/Maybe";
import Header from "./Header";
import * as BlockContent from '@sanity/block-content-to-react'
import { makeStyles, Link, Divider } from "@material-ui/core";
import { serializers } from "../Item/postContent";
import { projectId, dataset } from "../../client";
import { Fragment } from "react";
import { IconName } from "@fortawesome/fontawesome-svg-core";

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
    },
    divider: {
        margin: theme.spacing(0, 0, 4)
    },
    socialMedia: {
        '& a:link, & a:visited, & a:active': {
            color: theme.palette.text.secondary,
        },
        '& a:hover': {
            color: theme.palette.primary.main
        },
        margin: theme.spacing(0, 0, 3)
    },
    socialMediaLink: {
        margin: theme.spacing(0, 1)
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
            <Divider className={classes.divider} />
            <div className={classes.socialMedia}>{(settings.siteFooter.socialMedia || []).filter(s => s && s._key).map(s => s).map((socialMedia, idx) =>
                socialMedia && socialMedia._key && socialMedia.url && socialMedia.icon ?
                    <span key={socialMedia._key}>
                        <Link className={classes.socialMediaLink} href={socialMedia.url} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={['fab', socialMedia.icon as IconName]} /></Link>
                        {/* <a href={socialMedia!.url!} target="_blank" rel="noopener noreferrer"></a> */}
                    </span> :
                    <Fragment key={idx} />
            )}</div>
            <BlockContent blocks={settings.siteFooter.contentRaw} serializers={serializers} projectId={projectId} dataset={dataset} />
        </div> }
    </>
}