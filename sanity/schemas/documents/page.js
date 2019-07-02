import { MdLibraryBooks } from 'react-icons/lib/md'

export default {
    name: 'page',
    icon: MdLibraryBooks,
    title: 'Page',
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
            description: 'The part of the URL.',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 100
            }
        },
        {
            name: 'type',
            type: 'string',
            title: 'Type',
            options: {
                list: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'Centered', value: 'centered' }
                ]
            }
        },
        {
            name: 'password',
            title: 'Password',
            description: "Optional password protect",
            type: 'string'
        },
        {
            name: 'content',
            title: 'Content',
            type: 'postContent'
        }
    ]
}