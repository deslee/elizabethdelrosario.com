export default {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 100
            }
        },
        {
            name: 'password',
            title: 'Password',
            description: "Optional password protect",
            type: 'string'
        },
        {
            name: 'date',
            title: 'Date',
            type: 'date'
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [
                { type: 'string' }
            ],
            options: {
                layout: 'tags'
            }
        },
        {
            name: 'content',
            title: 'Content',
            type: 'postContent'
        }
    ]
}