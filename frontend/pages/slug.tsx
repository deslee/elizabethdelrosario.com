import { NextFunctionComponent, NextContext } from 'next'
import client from '../client';

interface InitialProps {
    slug: string,
    item: any,
    site: any
}

const SlugComponent: NextFunctionComponent<InitialProps> = ({slug, item, site}) => {
    return <>
        <h1>Slug</h1>
        <pre>{JSON.stringify(slug, null, 2)}</pre>
        <h1>Site settings</h1>
        <pre>{JSON.stringify(site, null, 2)}</pre>
        <h1>Item</h1>
        <pre>{JSON.stringify(item, null, 2)}</pre>
    </>
}

SlugComponent.getInitialProps = async (ctx: NextContext) => {
    const slug = ctx.query.slug!.toString()

    const { item, site } = await client.fetch(`
    {
        "item": *[slug.current == $slug][0],
        "site": *[_id == 'settings'][0],
    }
    `, { slug });

    return {
        slug,
        item,
        site
    }
}

export default SlugComponent;