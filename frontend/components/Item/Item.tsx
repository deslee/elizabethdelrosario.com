import { PostFragment, PageFragment, PostCollectionFragment } from "../../graphql";
import * as BlockContent from '@sanity/block-content-to-react'

interface ComponentProps {
    item: PostFragment | PageFragment | PostCollectionFragment
}

type Props = ComponentProps

const serializers = {
  types: {
    code: (props: any) => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
    video: (props: any) => {
        return <div>video</div>
    }
  }
}


export default (props: Props) => {
    return <>
        <h1>{props.item.title}</h1>
        <BlockContent blocks={props.item.contentRaw} serializers={serializers} />
    </>
}