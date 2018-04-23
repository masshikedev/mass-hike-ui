import React, { Component } from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTripList } from '../../actions/TripListActions';
import previewImage from '../../images/square.png';
import {
  H2,
  H3,
  H6,
  P,
  GridParent,
  constants,
  MediaQueries,
} from '../../style';
import { format } from 'date-fns';
import renderByStatus from '../../utils/renderByStatus';
import { MONTH_DATE } from '../../utils/dateFormats';

const Text = styled.div`
  grid-column: span 7;
  background: ${constants.orangeBg};
  color: #fff;
  padding: 40px;

  ${MediaQueries.small} {
    grid-column: span 12;
    order: 1;
    text-align: center;
    padding: 10px;
  }
`;

const Summary = styled.div`
  margin-top: 50px;
  padding: 50px;

  ${MediaQueries.small} {
    margin-top: 0;
  }
`;

const Date = styled.div`
  font-family: 'Open Sans';
  position: absolute;
  left: 0;
  font-weight: bold;
  color: ${constants.orange};
  background-color: #fff;
  margin-bottom: 20px;
  padding: 8px;

  ${MediaQueries.small} {
    left: 50%;
    transform: translate(-50%, -80%);
  }
`;

const Image = styled.div`
  grid-column: span 5;
  background-image: url(${props => props.bg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 400px;

  ${MediaQueries.small} {
    grid-column: span 12;
    order: 0;
  }
`;

const Next = GridParent.extend`
  grid-column-gap: 0;
`;

class HomeNext extends Component {
  componentWillMount() {
    const { getTripList } = this.props;
    getTripList();
  }

  renderLoading() {
    return <H3 />;
  }

  renderError() {
    return <H3>An error has occured.</H3>;
  }

  renderSuccess = () => {
    const trip = this.props.trips[0];

    return (
      <Next>
        <Text>
          <Date>{format(trip.time.hikeStart, MONTH_DATE)}</Date>
          <Summary>
            <H6 color="white">Let's go to </H6>
            <H2>{trip.name}</H2>
            <P proxima medium large color="white">
              {trip.detail.body}
            </P>
          </Summary>
        </Text>
        <Image bg={previewImage} />
      </Next>
    );
  };

  render() {
    const { status } = this.props;
    return (
      <div>
        {renderByStatus(
          status,
          this.renderLoading,
          this.renderSuccess,
          this.renderError
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trips: state.tripList.trips,
  status: state.tripList.status,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTripList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomeNext);
