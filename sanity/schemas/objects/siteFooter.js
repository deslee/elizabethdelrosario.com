export default {
    name: 'siteFooter',
    title: 'Site Footer',
    type: 'object',
    fields: [
        {
            name: 'socialMedia',
            title: 'Social Media',
            type: 'array',
            of: [
                { type: 'socialMedia' }
            ]
        },
        {
            name: 'content',
            title: 'Content',
            type: 'richText'
        }
    ]
}