import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import OrderSummary from '../components/OrderSummary';
import { getOrderById } from '../actions/OrderActions';
import renderByStatus from '../utils/renderByStatus';
import { P, H2, H3, MediaQueries, Container, GridParent } from '../style';
import styled from 'styled-components';

const Wrapper = styled.div`
  grid-column: span 8;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

class OrderConfirmation extends Component {
  componentWillMount() {
    const { getOrderById } = this.props;
    getOrderById(this.props.match.params.id);
  }

  renderLoading() {
    return <H3>Loading...</H3>;
  }

  renderError() {
    return <H3>An error has occured.</H3>;
  }

  renderSuccess = () => {
    const { order } = this.props;
    return (
      <GridParent>
        <Wrapper>
          <H2>You're going!</H2>
          <P small>
            We’re so excited that you want to take a hike with us! Until then,
            take a look at our suggested packing list and our FAQs. We’ll see
            you soon!
          </P>
          <OrderSummary order={order} />
        </Wrapper>
      </GridParent>
    );
  };

  render() {
    const { status } = this.props;
    return (
      <Container>
        {renderByStatus(
          status,
          this.renderLoading,
          this.renderSuccess,
          this.renderError
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  order: state.orders.currentOrder,
  status: state.orders.currentOrderStatus,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOrderById,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation);
