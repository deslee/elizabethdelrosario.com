import imageUrlBuilder from '@sanity/image-url'
import client from '../client'
const builder = imageUrlBuilder(client)

export function toPlainText(blocks = []) {
  if (!blocks) {
    return false;
  }

  const plainText = blocks
    // loop through each block
    .map((block: any) => {
      // if it's not a text block with children, 
      // return nothing
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      // loop through the children spans, and join the
      // text strings
      return block.children.map((child: any) => child.text).join('')
    })
    // join the parapgraphs leaving split by two linebreaks
    .join('\n\n')
  return !plainText.trim() ? false : plainText;
}

export function getFirstImage(blocks: any[] = []) {
  if (!blocks || !blocks.length) {
    return false;
  }

  for (var i = 0; i < blocks.length; ++i) {
    const block = blocks[i];
    if (block._type === 'multipleImages' && block.images.length) {
      return builder.image(block.images[0].asset).auto('format').url();
    }
    if (block._type === 'videoAsset') {
      // TODO: extract thumbnail from video
    }
  }
}