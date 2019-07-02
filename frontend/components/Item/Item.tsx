import React from 'react'
import { PostFragment, PageFragment, PostCollectionFragment, ImageAssetByIdsComponent, ImageAssetByIdDocument } from "../../graphql";
import * as BlockContent from '@sanity/block-content-to-react'
import { makeStyles, Container, Typography, Link as MaterialLink, TextField, InputAdornment, IconButton, LinearProgress, Grid, Button } from "@material-ui/core";
import Link from "next/link";
import { serializers } from "./postContent";
import { projectId, dataset } from "../../client";
import clsx from 'clsx'
import { compose } from 'recompose';
import { withApollo, WithApolloClient } from 'react-apollo';
import ImageAssetLightbox from './ImageAssetLightbox';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

interface ComponentProps {
  item: PostFragment | PageFragment | PostCollectionFragment
}

type Props = WithApolloClient<ComponentProps>

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(4, 0),
    textAlign: 'center'
  },
  leftAlign: {
    textAlign: 'left'
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
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [checkingPassword, setCheckingPassword] = React.useState(false)
  const [wrongPassword, setWrongPassword] = React.useState(false)
  const itemPassword = (item.__typename === 'Page' || item.__typename === 'Post') && item.password;
  const [locked, setLocked] = React.useState(!!itemPassword)

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

  const passwordProtect = () => {
    return <Container>
      <form onSubmit={(e) => {
        e.preventDefault();
        // TODO: do this server side, sanitize protected data via proxy
        setCheckingPassword(true);
        setTimeout(() => {
          if (itemPassword === password) {
            setLocked(false)
            setCheckingPassword(false);
          } else {
            setWrongPassword(true)
            setCheckingPassword(false);
          }
        }, 500)
      }}>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <TextField
              id={`password-${item.slug}`}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
              fullWidth
              variant="outlined"
              error={wrongPassword}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <IconButton aria-label="Toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }}
            />
            {checkingPassword && <LinearProgress />}
          </Grid>
          <Grid item xs={3} style={{display: 'flex'}}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              size="large"
            >Submit</Button>
          </Grid>
          <Grid item>
            {wrongPassword && <Typography color="error">Wrong password</Typography>}
          </Grid>
        </Grid>
      </form>
    </Container>
  }

  // TODO: password protection

  return <div className={clsx(classes.container, {
    [classes.leftAlign]: item.type === 'normal'
  })}>
    {item.title && <Container key="container"><Typography gutterBottom variant="h2" className={classes.title}><Link href={`/?slug=${slug}`} as={`/${slug}`}><MaterialLink href={`/${slug}`}>{item.title}</MaterialLink></Link></Typography></Container>}
    {item.contentRaw && locked ? passwordProtect() : itemBlock()}
  </div>
}

export default compose<Props, ComponentProps>(
  withApollo
)(Item);