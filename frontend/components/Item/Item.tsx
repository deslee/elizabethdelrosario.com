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
    },
    multipleImages: (props: any) => {
        return <div>multipleImages</div>
    },
  }
}


const Item = (props: Props) => {
    return <>
        <h1>{props.item.title}</h1>
        <BlockContent projectId="sj7jy8qa" dataset="production" blocks={props.item.contentRaw} serializers={serializers} /> {/* TODO: build dynamically */}
        {props.item.__typename === 'PostCollection' && (props.item.posts || []).map(post => post ? <Item item={post} /> : null)}
    </>
}

export default Item;