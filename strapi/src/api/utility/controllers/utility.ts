import { factories } from "@strapi/strapi";
import axios from 'axios'

export default {
  async getOembed(ctx) {
    const resourceUrl = new URL(ctx.request.query.url)
    console.log(resourceUrl)
    if (resourceUrl.host === "speakerdeck.com") {
      const oembedData = await axios(`https://speakerdeck.com/oembed.json?url=${resourceUrl.toString()}`).then(response => response.data)
      return oembedData
    } else if (resourceUrl.host === 'vimeo.com') {
      const oembedData = await axios(`https://vimeo.com/api/oembed.json?url=${resourceUrl.toString()}`).then(response => response.data)
      return oembedData
    }
    throw new Error('Invalid url ' + ctx.request.query.url)
  }
}