export default {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        {
            name: 'favicon',
            title: 'Favicon',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'title',
            title: 'Site title',
            type: 'string'
        },
        {
            name: 'subtitle',
            title: 'Subtitle',
            type: 'richText'
        },
        {
            name: 'frontPage',
            title: 'Front Page',
            type: 'reference',
            to: [
                { type: 'post' },
                { type: 'page' },
                { type: 'postCollection' },
            ]
        },
        {
            name: 'googleAnalyticsId',
            title: 'Google Analytics ID',
            type: 'string'
        },
        {
            name: 'siteHeader',
            title: 'Header',
            type: 'siteHeader'
        },
        {
            name: 'siteFooter',
            title: 'Footer',
            type: 'siteFooter'
        },
    ]
}