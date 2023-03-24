import { MdPictureAsPdf } from "react-icons/lib/md"

export default {
    name: 'speakerDeck',
    title: 'SpeakerDeck',
    icon: MdPictureAsPdf,
    type: 'object',
    fields: [
        { name: 'url', title: 'Url', type: 'url' },
    ]
}