export default {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
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