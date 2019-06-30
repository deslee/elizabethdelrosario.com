import React from 'react'
import { PostFragment, PageFragment, PostCollectionFragment } from "../../graphql";
import * as BlockContent from '@sanity/block-content-to-react'
import { makeStyles, Container } from "@material-ui/core";
import Link from "next/link";
import { serializers } from "./postContent";
import { projectId, dataset } from "../../client";
import clsx from 'clsx'

interface ComponentProps {
  item: PostFragment | PageFragment | PostCollectionFragment
}

type Props = ComponentProps

const useStyles = makeStyles(() => ({
  container: {
  },
  centered: {
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

  item.type === 'centered'
  const element = item.type === 'centered' ? 'div' : Container

  return React.createElement(element, {
    className: clsx(classes.container, {
      [classes.centered]: item.type === 'centered'
    })
  }, [
    // TODO: implement password protect
    <h1 key='h1' className={classes.title}><Link href={`/slug?slug=${slug}`} as={`/${slug}`}><a>{item.title}</a></Link></h1>,
    item.contentRaw && <BlockContent key='block' projectId={projectId} dataset={dataset} blocks={item.contentRaw} serializers={serializers} />,
    // TODO: render lightbox with context
  ]);
}

export default Item;