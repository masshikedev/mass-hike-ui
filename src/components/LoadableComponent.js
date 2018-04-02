import React, { Component } from 'react';
import renderByStatus from '../utils/renderByStatus';
import { H3, Container } from '../style';

class LoadableComponent extends Component {
  renderLoading = () => {
    return (
      <Container>
        <H3>Loading...</H3>
      </Container>
    );
  };

  renderError = () => {
    return (
      <Container>
        <H3>An error has occured.</H3>
      </Container>
    );
  };

  render() {
    const { status } = this.props;
    return renderByStatus(
      status,
      this.renderLoading,
      this.renderSuccess,
      this.renderError
    );
  }
}

export default LoadableComponent;
