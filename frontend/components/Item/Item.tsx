import React, { Fragment } from 'react'
import { PostFragment, PageFragment, PostCollectionFragment } from "../../graphql";
import * as BlockContent from '@sanity/block-content-to-react'
import { makeStyles, Container, Typography, Link as MaterialLink, TextField, InputAdornment, IconButton, LinearProgress, Grid, Button } from "@material-ui/core";
import Link from 'next/link';
import { serializers } from "./postContent";
import { projectId, dataset } from "../../client";
import clsx from 'clsx'
import { compose } from 'recompose';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

interface ComponentProps {
  item: PostFragment | PageFragment | PostCollectionFragment
  onAssetOpen: (assetId: string) => void
}

type Props = ComponentProps

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
  },
  collectionTitle: {
    fontSize: '1.45rem',
    textAlign: 'center',
    borderBottom: `2px solid ${theme.palette.divider}`,
    lineHeight: '.1em',
    margin: '50px auto 40px',
    '& span': {
      padding: `0 .5rem`,
      background: theme.palette.common.white,
    }
  }
}))

const Item = (props: Props) => {
  const { item, onAssetOpen } = props;
  const classes = useStyles({});
  const slug = item.slug && item.slug.current
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [checkingPassword, setCheckingPassword] = React.useState(false)
  const [wrongPassword, setWrongPassword] = React.useState(false)
  const itemPassword = (item.__typename === 'Page' || item.__typename === 'Post') && item.password;
  const [locked, setLocked] = React.useState(!!itemPassword)
  const renderContent = React.useMemo(() => {
    return item.contentRaw ? <BlockContent key='block' projectId={projectId} dataset={dataset} blocks={item.contentRaw} serializers={serializers({
      assetSelected: (assetId) => onAssetOpen(assetId)
    })} /> : <Fragment />
  }, [item._id, onAssetOpen])
  React.useEffect(() => {
    // set locked state when item changes
    setLocked(!!itemPassword)
  }, [item])

  const title = () => {
    if ((item.__typename === 'Page' || item.__typename === 'PostCollection') && !item.showTitle) {
      return <Fragment />
    }

    if (item.__typename === 'Page' || item.__typename === 'Post') {
      return <Typography gutterBottom variant="h2" className={classes.title}>
        <Link href={`/[slug]`} as={`/${slug}`}><MaterialLink href={`/${slug}`}>{item.title}</MaterialLink></Link>
      </Typography>
    } else {
      return <Typography component="div" className={classes.collectionTitle}>
        <span>{item.title}</span>
      </Typography>
    }
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
          <Grid item xs={3} style={{ display: 'flex' }}>
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

  return <div className={clsx(classes.container, {
    [classes.leftAlign]: item.type === 'normal'
  })}>
    {item.title && <Container key="container">{title()}</Container>}
    {locked ? passwordProtect() : renderContent}
  </div>
}

export default compose<Props, ComponentProps>(
)(Item);