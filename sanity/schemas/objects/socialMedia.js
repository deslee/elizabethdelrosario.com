export default {
    name: 'socialMedia',
    title: 'Social Media',
    type: 'object',
    fields: [
        {
            name: 'url',
            title: 'Url',
            type: 'url'
        },
        {
            name: 'icon',
            title: 'Icon',
            type: 'string',
            options: {
                list: [
                    { title: 'Facebook', value: 'facebook' },
                    { title: 'LinkedIn', value: 'linkedin' },
                    { title: 'Instagram', value: 'instagram' },
                    { title: 'Email', value: 'email' },
                    { title: 'Youtube', value: 'youtube' },
                    { title: 'Vimeo', value: 'vimeo' },
                    { title: 'Twitter', value: 'twitter' },
                ]
            }
        }
    ]
}