import React from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import OrderSummary from '../components/OrderSummary';
import { getOrderById } from '../actions/OrderActions';
import LoadableComponent from '../components/LoadableComponent';
import {
  P,
  H2,
  H3,
  H4,
  Button,
  MediaQueries,
  Container,
  GridParent,
  constants,
} from '../style';
import styled from 'styled-components';

const Grid = GridParent.extend`
  grid-column-gap: 0;
`;

const ContentColumn = styled.div`
  grid-column: span 8;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const ImageColumn = styled.div`
  grid-column: span 4;
  background-image: url(${props => props.image});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  ${MediaQueries.small} {
    display: none;
  }
`;

const MobileImage = styled.div`
  width: 100%;
  height: 250px;
  background-image: url(${props => props.image});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: none;
  ${MediaQueries.small} {
    display: block;
  }
`;

const TitleSection = styled.div`
  background: ${constants.lightgreenBg};
  background-blend-mode: multiply;
  padding: 60px;

  ${MediaQueries.small} {
    display: block;
    padding: 50px 30px;
  }

  a {
    color: white;
    text-decoration: underline;
  }
`;

const MainContent = styled.div`
  padding: 20px 60px;

  ${MediaQueries.small} {
    padding: 20px 30px;
  }
`;

const ContentTitle = H4.extend`
  margin-bottom: 20px;
`;

const BackButton = Button.extend`
  margin-top: 20px;
`;

class OrderConfirmation extends LoadableComponent {
  componentWillMount() {
    const { getOrderById } = this.props;
    getOrderById(this.props.match.params.id);
  }

  renderSuccess = () => {
    const { order, toTrips } = this.props;
    const { trip } = order;
    return (
      <Container>
        <Grid>
          <ContentColumn>
            <TitleSection>
              <H2 color="white">You're going to {trip.name}!</H2>
              <P color="white" proxima>
                We’re so excited that you want to take a hike with us! Until
                then, take a look at our <Link to="/faq/">FAQs</Link> if you
                have any questions before your trip. We’ll see you soon!
              </P>
            </TitleSection>
            <MobileImage image={trip.detail.imageUrl} />
            <MainContent>
              <ContentTitle>Order Summary</ContentTitle>
              <OrderSummary order={order} />
              <BackButton onClick={toTrips}>Back to trips</BackButton>
            </MainContent>
          </ContentColumn>
          <ImageColumn image={trip.detail.imageUrl} />
        </Grid>
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  order: state.orders.currentOrder,
  status: state.orders.currentOrderStatus,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOrderById,
      toTrips: () => push('/trips'),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation);
