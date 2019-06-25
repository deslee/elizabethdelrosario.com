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
                { name: 'headerPost', title: 'Post', type: 'object', fields: [ { name: 'post', title: 'Post', type: 'reference', to: [{ type: 'post' }], }, { name: 'title', title: 'Title', type: 'string' } ], },
                { name: 'headerPage', title: 'Page', type: 'object', fields: [ { name: 'page', title: 'Page', type: 'reference', to: [{ type: 'page' }], }, { name: 'title', title: 'Title', type: 'string' } ], },
                { name: 'category', title: 'Category List', type: 'object', fields: [ { name: 'category', title: 'Category', type: 'string' }, { name: 'title', title: 'Title', type: 'string' } ], },
                { name: 'externalLink', title: 'External Link', type: 'object', fields: [ { name: 'url', title: 'URL', type: 'url' }, { name: 'title', title: 'Title', type: 'string' } ]  },
            ],
        },
    ]
}