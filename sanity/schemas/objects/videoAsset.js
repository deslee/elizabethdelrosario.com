import React from 'react'
import { MdVideoLabel } from "react-icons/lib/md"
import ReactPlayer from 'react-player'

const Preview = ({value: {url, autoplay, loop}}) => <ReactPlayer url={url} playing={autoplay} loop={loop} />

export default {
    name: 'videoAsset',
    title: 'Video',
    icon: MdVideoLabel,
    type: 'object',
    fields: [
        { name: 'url', title: 'Url', type: 'url' },
        { name: 'autoplay', title: 'Autoplay Video', type: 'boolean' },
        { name: 'loop', title: 'Loop Video', type: 'boolean' },
    ],
    preview: {
        select: {
            url: 'url',
            autoplay: 'autoplay',
            loop: 'loop',
        },
        component: Preview
    }
}