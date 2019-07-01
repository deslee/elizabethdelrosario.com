import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme, { GlobalCss } from '../theme';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faFacebook, faInstagram, faTwitch, faTwitter, faLinkedin, faYoutube, faVimeo } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faFacebook, faTwitch, faTwitter, faInstagram, faLinkedin, faYoutube, faVimeo, faEnvelope)

class CustomApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>My page</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <GlobalCss />
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    );
  }
}

export default CustomApp;
