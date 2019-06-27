import React from 'react';
import { MdPhotoLibrary, MdPhoto, MdVideoLabel, MdAttachFile } from "react-icons/lib/md"

export default {
    name: 'multipleImages',
    title: 'Multiple Images',
    type: 'object',
    icon: MdPhotoLibrary,
    fields: [
        { name: 'images', title: 'Images', type: 'array', of: [{ type: 'postImage' }] },
        { name: 'columns', title: 'Columns', type: 'string', description: 'Number of columns. Set to blank for default', options: { list: [{ title: 'One', value: '1' }, { title: 'Two', value: '2' }, { title: 'Three', value: '3' }, { title: 'Four', value: '4' }] } },
    ],
    preview: {
        select: {
            images: 'images'
        },
        prepare(selection) {
            const { images } = selection
            return {
                title: images ? `Set of ${images.length} images` : ''
            }
        }
    }
}