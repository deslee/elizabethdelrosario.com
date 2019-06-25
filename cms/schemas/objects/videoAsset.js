export default {
    name: 'videoAsset',
    title: 'Video',
    type: 'object',
    fields: [
        { name: 'url', title: 'Url', type: 'url' },
        { name: 'autoplay', title: 'Autoplay Video', type: 'boolean' },
        { name: 'loop', title: 'Loop Video', type: 'boolean' },
    ]
}