import S from '@sanity/desk-tool/structure-builder';
import { MdSettings as SiteSettingsIcon, MdWeb } from 'react-icons/lib/md'

const hiddenDocTypes = listItem => ![
    "siteSettings"
].includes(listItem.getId())

export default () => 
    S.list()
        .title('Site')
        .items([
            S.listItem()
                .title('Site Settings')
                .icon(SiteSettingsIcon)
                .child(
                    S.editor()
                        .id('settings')
                        .schemaType('siteSettings')
                        .documentId('settings')
                ),
            ...S.documentTypeListItems()
                    .filter(hiddenDocTypes)
        ])