import React from 'react';
import { MdPhotoLibrary, MdPhoto, MdVideoLabel, MdAttachFile } from "react-icons/lib/md"

const image = {
      name: 'image',
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

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default {
  title: 'Post Content',
  name: 'postContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'}
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [{title: 'Strong', value: 'strong'}, {title: 'Emphasis', value: 'em'}],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url'
              }
            ]
          }
        ]
      }
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    image,
    {
      name: 'multipleImages',
      title: 'Multiple Images',
      type: 'object',
      icon: MdPhotoLibrary,
      fields: [
        { name: 'images', title: 'Images', type: 'array', of: [ image ] },
        { name: 'columns', title: 'Columns', type: 'string', description: 'Number of columns. Set to blank for default', options: { list: [ { title: 'One', value: '1' }, { title: 'Two', value: '2' }, { title: 'Three', value: '3' }, { title: 'Four', value: '4' } ] } },
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
    },
    {
      name: 'fileAsset',
      title: 'File',
      type: 'fileAsset',
    },
    {
      name: 'video',
      title: 'Video',
      type: 'videoAsset',
    },
    {
      name: 'pdf',
      title: 'PDF Embed',
      type: 'pdfEmbed',
    }
  ],
}
