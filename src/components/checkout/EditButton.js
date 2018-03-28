import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { setCheckoutState } from '../../actions/CheckoutActions';
import SectionOrder from '../../data/CheckoutSectionOrder';
import { Button } from '../../style';

const SmallButton = Button.extend`
  cursor: pointer;
  font-size: 14px;
  width: 60px;
  height: 30px;
  margin-left: 15px;
`;

class EditButton extends Component {
  onClickMobile = e => {
    const { section, setCurrentSection, toMobileCheckout, tripId } = this.props;
    e.preventDefault();
    setCurrentSection(section);
    toMobileCheckout(tripId);
  };

  onClickDesktop = e => {
    const { section, toCheckoutSection, tripId } = this.props;
    e.preventDefault();
    toCheckoutSection(tripId, SectionOrder[section].path);
  };

  render() {
    const { display, mobile } = this.props;
    const onClick = mobile ? this.onClickMobile : this.onClickDesktop;
    if (!display) {
      return null;
    }
    return <SmallButton onClick={onClick}>Edit</SmallButton>;
  }
}

const mapStateToProps = state => ({
  tripId: state.currentTrip.trip.tripId,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentSection: section =>
        setCheckoutState({ currentSection: section }),
      toMobileCheckout: tripId => push(`/trips/${tripId}/checkout-mobile`),
      toCheckoutSection: (tripId, sectionPath) =>
        push(`/trips/${tripId}/checkout/${sectionPath}`),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EditButton);