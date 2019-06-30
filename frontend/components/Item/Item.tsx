import { PostFragment, PageFragment } from "../../graphql";
import * as BlockContent from '@sanity/block-content-to-react'
import { makeStyles } from "@material-ui/core";
import Link from "next/link";
import { serializers } from "./postContent";

interface ComponentProps {
  item: PostFragment | PageFragment 
}

type Props = ComponentProps

const useStyles = makeStyles(() => ({
  container: {
    textAlign: 'center'
  },
  title: {
    '& a, & a:visited, & a:hover': {
      color: 'inherit',
      textDecoration: 'inherit'
    }
  }
}))



const Item = (props: Props) => {
  const { item } = props;
  const classes = useStyles();
  const slug = item.slug && item.slug.current
  return <div className={classes.container}>
    <h1 className={classes.title}><Link href={`/slug?slug=${slug}`} as={`/${slug}`}><a>{item.title}</a></Link></h1>
    {item.contentRaw && <BlockContent projectId="sj7jy8qa" dataset="production" blocks={item.contentRaw} serializers={serializers} />} {/* TODO: build dynamically */}
  </div>
}

export default Item;