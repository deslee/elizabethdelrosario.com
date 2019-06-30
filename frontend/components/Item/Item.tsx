import { PostFragment, PageFragment, VideoAsset } from "../../graphql";
import * as BlockContent from '@sanity/block-content-to-react'
import ReactPlayer from 'react-player'
import { makeStyles, Container } from "@material-ui/core";

interface ComponentProps {
  item: PostFragment | PageFragment 
}

type Props = ComponentProps

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: 'center'
  },
  videoAsset: {
    maxWidth: theme.breakpoints.width('md'),
    margin: '0 auto'
  },
  playerWrapper: {
    position: 'relative',
    paddingTop: '56.25%', /* Player ratio: 100 / (1280 / 720) */
  }
}))

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
      const classes = useStyles();
      if (!props || !props.node || !props.node.url || !props.node.autoplay || !props.node.loop) {
        return <></>
      }
      return <div className={classes.videoAsset}>
        <div className={classes.playerWrapper}>
          <ReactPlayer url={props.node.url} playing={props.node.autoplay} loop={props.node.loop} width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }} />
        </div>
      </div>
    }
  }
}


const Item = (props: Props) => {
  const { item } = props;
  const classes = useStyles();
  return <div className={classes.container}>
    <h1>{item.title}</h1>
    {item.contentRaw && <BlockContent projectId="sj7jy8qa" dataset="production" blocks={item.contentRaw} serializers={serializers} />} {/* TODO: build dynamically */}
  </div>
}

export default Item;