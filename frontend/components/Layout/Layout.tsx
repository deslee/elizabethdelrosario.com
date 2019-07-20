import { SiteSettingsFragment } from "../../graphql";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Maybe from "graphql/tsutils/Maybe";
import Header from "./Header";
import * as BlockContent from '@sanity/block-content-to-react'
import { makeStyles, Link, Divider, LinearProgress } from "@material-ui/core";
import { serializers } from "../Item/postContent";
import { projectId, dataset } from "../../client";
import { Fragment, useEffect, useState } from "react";
import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import 'react-image-lightbox/style.css';
import Router from "next/router";
import ReactGA from 'react-ga';
import { PageTitle, PageDescription } from "../Meta";
import { toPlainText } from "../../utility/blockUtils";
import Head from "next/head";

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

    const [loading, setLoading] = useState(false);
    const classes = useStyles({});
    useEffect(() => {
        if (process.browser) {
            if (settings.googleAnalyticsId) {
                ReactGA.initialize(settings.googleAnalyticsId)
                ReactGA.pageview(window.location.pathname)
            }
            Router.events.on('routeChangeStart', () => {
                setLoading(true)
            })
            Router.events.on('routeChangeComplete', (url) => {
                setLoading(false)
                ReactGA.pageview(url)
            })
            Router.events.on('routeChangeError', () => {
                setLoading(false)
            })
        }
    }, [])

    const pageTitle = title ? `${title} | ${settings.title}` : settings.title
    const description = settings.subtitleRaw && toPlainText(settings.subtitleRaw)
    return <>
        <Head>
            <meta name="twitter:card" key="twitter:card" content="summary" />
        </Head>
        {pageTitle && <PageTitle title={pageTitle} />}
        {description && <PageDescription description={description} />}
        {settings.siteHeader && <Header header={settings.siteHeader} title={settings.title} subtitleRaw={settings.subtitleRaw} />}
        {loading && <LinearProgress color="primary" />}
        {children}
        {settings.siteFooter && settings.siteFooter.contentRaw && <div className={classes.footer}>
            <Divider className={classes.divider} />
            <div className={classes.socialMedia}>{(settings.siteFooter.socialMedia || []).filter(s => s && s._key).map(s => s).map((socialMedia, idx) => {
                let icon = socialMedia ? socialMedia.icon : undefined;
                if (icon === 'email') {
                    icon = 'envelope'
                }
                if (icon === 'vimeo') {
                    icon = 'vimeo-v'
                }
                if (icon === 'facebook') {
                    icon = 'facebook-f'
                }
                if (icon === 'linkedin') {
                    icon = 'linkedin-in'
                }

                let twitterMetaTag: React.ReactNode | undefined = undefined;
                if (icon === 'twitter' && socialMedia && socialMedia.url) {
                    const match = socialMedia.url.match(/.*twitter.com\/(.*)/)
                    if (match && match.length > 0 && match[1]) {
                        twitterMetaTag = <Head>
                            <meta name="twitter:site" key="twitter:site" content={`@${match[1]}`} />
                            <meta name="twitter:creator" key="twitter:creator" content={`@${match[1]}`} />
                        </Head>
                    }
                }

                const prefix = icon ? (icon === 'envelope' ? 'fa' : 'fab') : undefined;
                return socialMedia && socialMedia._key && socialMedia.url && socialMedia.icon && prefix ?
                    <span key={socialMedia._key}>
                        {twitterMetaTag}
                        <Link className={classes.socialMediaLink} href={socialMedia.url} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={[prefix as IconPrefix, icon as IconName]} /></Link>
                    </span> :
                    <Fragment key={idx} />
            })}</div>
            <BlockContent blocks={settings.siteFooter.contentRaw} serializers={serializers({})} projectId={projectId} dataset={dataset} />
        </div>}
    </>
}