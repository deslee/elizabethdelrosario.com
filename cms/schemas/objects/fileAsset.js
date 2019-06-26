import { MdAttachFile } from "react-icons/lib/md"

export default {
    name: 'fileAsset',
    title: 'File',
    icon: MdAttachFile,
    type: 'object',
    fields: [
        { name: 'file', title: 'File', type: 'file' },
        { name: 'text', title: 'text', type: 'string' },
    ]
}