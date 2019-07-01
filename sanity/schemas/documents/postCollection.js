import { MdList } from 'react-icons/lib/md'

export default {
    name: 'postCollection',
    icon: MdList,
    title: 'Post Collection',
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
            description: 'The part of the URL.',
            options: {
                source: 'title',
                maxLength: 100
            }
        },
        {
            name: 'content',
            title: 'Content',
            type: 'postContent',
            description: 'This will go above the posts'
        },
        {
            name: 'showPerPage',
            title: 'Posts per page',
            type: 'number',
            description: 'Number of posts to show per page. Leave blank for default.',
        },
        {
            name: 'posts',
            title: 'Posts',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: { type: 'post' }
                }
            ]
        }
    ],
    preview: {
        select: {
            title: 'title',
            slug: 'slug.current'
        },
        prepare(selection) {
            console.log(selection)
            return {
                title: selection.title,
                subtitle: selection.slug
            }
        }
    },
}