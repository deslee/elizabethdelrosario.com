
export const siteHeaderInternalReference = {
    name: 'siteHeaderInternalReference',
    title: 'Internal link',
    type: 'object',
    fields: [
        { name: 'internal', title: 'Item', description: 'Post, page, or collection', type: 'reference', to: [{ type: 'post' }, { type: 'page' }, { type: 'postCollection' }], },
        { name: 'title', title: 'Title', type: 'string', description: 'Optional. If empty, will use the item\'s title' }
    ],
}

export const siteHeaderExternalReference = {
    name: 'siteHeaderExternalReference',
    title: 'External URL',
    type: 'object',
    fields: [
        { name: 'url', title: 'URL', type: 'string', },
        { name: 'title', title: 'Title', type: 'string' }
    ],
}

export default {
    name: 'siteHeader',
    title: 'Site Header',
    type: 'object',
    fields: [
        {
            name: 'headerImage',
            title: 'Header Image',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'menuItems',
            title: 'Menu Items',
            type: 'array',
            of: [
                {type: 'siteHeaderInternalReference'},
                //{type: 'siteHeaderExternalReference'},
            ],
        },
    ]
}