import { MdPhoto } from "react-icons/lib/md"

export default {
    name: 'postImage',
    title: 'Image',
    type: 'image',
    fields: [
        {
            name: 'description',
            title: 'Description',
            type: 'string'
        }
    ],
    icon: MdPhoto,
    options: {
        hotspot: true
    }
}