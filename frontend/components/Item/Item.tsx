import { PostFragment, PageFragment, PostCollectionFragment, VideoAsset } from "../../graphql";
import * as BlockContent from '@sanity/block-content-to-react'
import ReactPlayer from 'react-player'

interface ComponentProps {
  item: PostFragment | PageFragment | PostCollectionFragment
  parent?: PostCollectionFragment
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
    videoAsset: (props: {node: VideoAsset}) => {
      if (!props || !props.node || !props.node.url || !props.node.autoplay || !props.node.loop) {
        return <></>
      }
      return <ReactPlayer url={props.node.url} playing={props.node.autoplay} loop={props.node.loop} />
    }
  }
}


const Item = (props: Props) => {
  const { item } = props;
  return <>
    <h1>{item.title}</h1>
    <BlockContent projectId="sj7jy8qa" dataset="production" blocks={item.contentRaw} serializers={serializers} /> {/* TODO: build dynamically */}
    {item.__typename === 'PostCollection' && (item.posts || []).map((post, idx) => post ? <Item key={idx} item={post} parent={item} /> : null)}
  </>
}

export default Item;