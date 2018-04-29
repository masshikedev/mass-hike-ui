import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getAvailability,
  adminUpdateAvailability,
} from '../actions/AvailabilityActions';
import AdminPage from '../components/admin/AdminPage';
import LoadableComponent from '../components/LoadableComponent';
import AvailabilityForm from '../components/admin/AvailabilityForm';
import CashLocationList from '../components/admin/CashLocationList';
import { AdminContainer, P, H2, Button } from '../style';
import styled from 'styled-components';
import { RequestStatus } from '../constants';

const Subtitle = P.extend`
  margin-top: 5px;
  margin-bottom: 10px;
`;

const SubtitleSpacer = styled.div`
  height: 28px;
`;

class EditAvailability extends LoadableComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentAvailableTimes: [],
      timesChanged: false,
      changesSaved: false,
      locationsChangesSaves: false,
    };
  }

  componentWillMount() {
    const { getAvailability } = this.props;
    getAvailability();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentAvailableTimes: nextProps.availability.times,
      changesSaved: nextProps.updateStatus === RequestStatus.SUCCESS,
    });
  }

  onChangeTimes = nextTimes => {
    this.setState({
      currentAvailableTimes: nextTimes,
      changesSaved: false,
      timesChanged: true,
    });
  };

  onConfirmTimeChange = () => {
    const { updateAvailability, availability } = this.props;
    const { currentAvailableTimes, timesChanged } = this.state;
    if (!timesChanged) {
      return null;
    }
    updateAvailability({ times: currentAvailableTimes });
    this.setState({ timesChanged: false });
  };

  onConfirmLocationChange = locations => {
    const { updateAvailability } = this.props;
    updateAvailability({ locations: locations });
  };

  renderSuccess = () => {
    const {
      currentAvailableTimes,
      currentAvailableLocations,
      timesChanged,
      changesSaved,
    } = this.state;
    const { availability } = this.props;
    return (
      <AdminContainer>
        <H2>
          Available Times
          {changesSaved ? (
            <Subtitle bold color="green">
              Changes saved
            </Subtitle>
          ) : (
            <SubtitleSpacer />
          )}
        </H2>
        <AvailabilityForm
          editable
          availability={currentAvailableTimes}
          onChange={this.onChangeTimes}
        />
        <Button onClick={this.onConfirmTimeChange} disabled={!timesChanged}>
          Confirm Changes
        </Button>
        <H2>Available Locations</H2>
        <CashLocationList
          locations={availability.locations}
          onConfirm={this.onConfirmLocationChange}
          changesSaved={changesSaved}
        />
      </AdminContainer>
    );
  };
}

const mapStateToProps = state => ({
  availability: state.availability,
  status: state.availability.status,
  updateStatus: state.availability.updateStatus,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAvailability,
      updateAvailability: adminUpdateAvailability,
    },
    dispatch
  );

export default AdminPage(
  connect(mapStateToProps, mapDispatchToProps)(EditAvailability)
);
