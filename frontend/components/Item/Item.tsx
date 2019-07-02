import React from 'react'
import { PostFragment, PageFragment, PostCollectionFragment, ImageAssetByIdsComponent, ImageAssetByIdDocument } from "../../graphql";
import * as BlockContent from '@sanity/block-content-to-react'
import { makeStyles, Container, Typography, Link as MaterialLink } from "@material-ui/core";
import Link from "next/link";
import { serializers } from "./postContent";
import { projectId, dataset } from "../../client";
import clsx from 'clsx'
import { compose } from 'recompose';
import { withApollo, WithApolloClient } from 'react-apollo';
import ImageAssetLightbox from './ImageAssetLightbox';

interface ComponentProps {
  item: PostFragment | PageFragment | PostCollectionFragment
}

type Props = WithApolloClient<ComponentProps>

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(4, 0)
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
  const [assetOpen, setAssetOpen] = React.useState<string | undefined>(undefined);

  const itemBlock = () => {
    const itemNode = () => <BlockContent key='block' projectId={projectId} dataset={dataset} blocks={item.contentRaw} serializers={serializers({
      assetSelected: (assetId) => setAssetOpen(assetId)
    })} />;

    if (item.contentRaw && item.contentRaw.map) {
      const imageRefs: any = item.contentRaw.map((block: any) => {
        if (block && block._type === 'postImage' && block.asset) {
          return block.asset._ref
        }

        if (block && block._type === 'multipleImages' && block.images && block.images.map) {
          return block.images.map((image: any) => {
            if (image && image.asset) {
              return image.asset._ref
            }
          })
        }
      }).filter((a: any) => a).reduce((a: any, b: any) => a.concat(b), []).filter((a: any) => a);

      if (imageRefs && imageRefs.length) {
        return <ImageAssetByIdsComponent variables={{ ids: imageRefs }} onCompleted={(data) => {
          data.allSanityImageAssets.forEach(image => {
            props.client.writeQuery({
              query: ImageAssetByIdDocument,
              variables: { id: image._id },
              data: { SanityImageAsset: image }
            })
          })
        }}>{({ loading }) => {
          // block until they're all loaded and stored in the cache
          if (loading) {
            return <React.Fragment /> 
          } else {
            return <>
              <ImageAssetLightbox 
                assetIds={imageRefs}
                assetOpen={assetOpen}
                onClose={() => setAssetOpen(undefined)}
              />
              {itemNode()}
            </>;
          }
        }}</ImageAssetByIdsComponent>
      }
    }
    return itemNode();
  }

  return <div className={clsx(classes.container, {
    [classes.centered]: item.type === 'centered'
  })}>
    {item.title && <Container key="container"><Typography gutterBottom variant="h2" className={classes.title}><Link href={`/slug?slug=${slug}`} as={`/${slug}`}><MaterialLink>{item.title}</MaterialLink></Link></Typography></Container>}
    {item.contentRaw && itemBlock()}
  </div>
}

export default compose<Props, ComponentProps>(
  withApollo
)(Item);