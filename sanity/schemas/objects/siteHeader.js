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
                {
                    name: 'internal',
                    type: 'object',
                    fields: [
                        { name: 'internal', title: 'Item', description: 'Post, page, or collection', type: 'reference', to: [{ type: 'post' },{type: 'page'},{type:'postCollection'}], },
                        { name: 'title', title: 'Title', type: 'string', description: 'Optional. If empty, will use the item\'s title' }
                    ],
                },
                {
                    name: 'external',
                    title: 'External URL',
                    type: 'object',
                    fields: [
                        { name: 'url', title: 'URL', type: 'string', },
                        { name: 'title', title: 'Title', type: 'string' }
                    ],
                },
                // { name: 'headerPage', title: 'Page', type: 'object', fields: [ { name: 'page', title: 'Page', type: 'reference', to: [{ type: 'page' }], }, { name: 'title', title: 'Title', type: 'string' } ], },
                // { name: 'postCollection', title: 'Post Collection', type: 'object', fields: [ { name: 'postCollection', title: 'Post Collection', type: 'reference', to: [{ type: 'postCollection' }], }, { name: 'title', title: 'Title', type: 'string' } ], },
                // { name: 'externalLink', title: 'External Link', type: 'object', fields: [ { name: 'url', title: 'URL', type: 'url' }, { name: 'title', title: 'Title', type: 'string' } ]  },
            ],
        },
    ]
}