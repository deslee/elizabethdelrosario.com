import { NextFunctionComponent, NextContext } from 'next'
import client from '../client';

interface InitialProps {
    site: any,
    frontPage: any,
    posts: any
}

const IndexComponent: NextFunctionComponent<InitialProps> = ({site, frontPage, posts}) => {
    return <>
        <h1>Site settings</h1>
        <pre>{JSON.stringify(site, null, 2)}</pre>
        <h1>Front page settings</h1>
        <pre>{JSON.stringify(frontPage, null, 2)}</pre>
        <h1>Posts</h1>
        <pre>{JSON.stringify(posts, null, 2)}</pre>
    </>
}

IndexComponent.getInitialProps = async (ctx: NextContext) => {
    // fetch site settings
    const { site, frontPage, posts } = await client.fetch(`
    {
        "site": *[_id == 'settings'][0],
        "frontPage": *[_id == 'settings'][0] { frontPage-> },
        "posts": *[_id == 'settings'][0] { frontPage->{posts[]->} }
    }
    `);

    return {
        site,
        frontPage,
        posts
    }
}

export default IndexComponent;