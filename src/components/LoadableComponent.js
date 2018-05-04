import React, { Component } from 'react';
import renderByStatus from '../utils/renderByStatus';
import { P, H3, Container } from '../style';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  height: 90vh;
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
`;

const LoadingImage = styled.img`
  width: 60%;
  height: auto;
  max-width: 130px;
`;

class LoadableComponent extends Component {
  renderLoading = () => {
    return (
      <LoadingWrapper>
        <LoadingImage src="/images/loading.gif" alt="Loading..." />
        <P size="large" proxima>
          One moment...
        </P>
      </LoadingWrapper>
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
