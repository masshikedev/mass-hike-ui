import React from 'react';
import 'whatwg-fetch';
import Prismic from 'prismic-javascript';
import PrismicConfig from './prismic-configuration';
import Routes from '../Routes';

export default class MassHike extends React.Component {
  state = {
    prismicCtx: null
  };

  componentWillMount() {
    this.buildContext()
      .then(prismicCtx => {
        this.setState({ prismicCtx });
      })
      .catch(e => {
        console.error(
          `Cannot contact the API, check your prismic configuration:\n${e}`
        );
      });
  }

  buildContext() {
    const accessToken = PrismicConfig.accessToken;
    return Prismic.api(PrismicConfig.apiEndpoint, { accessToken }).then(
      api => ({
        api,
        endpoint: PrismicConfig.apiEndpoint,
        accessToken,
        linkResolver: PrismicConfig.linkResolver,
        toolbar: this.refreshToolbar
      })
    );
  }

  render() {
    return <Routes prismicCtx={this.state.prismicCtx} />;
  }
}
