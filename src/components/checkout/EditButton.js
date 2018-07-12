import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { setCheckoutState } from '../../actions/CheckoutActions';
import SectionOrder from '../../data/CheckoutSectionOrder';
import { Button } from '../../style';

class EditButton extends Component {
  onClickMobile = e => {
    const { section } = this.props;
    e.preventDefault();
    const newSection = document.getElementById(`section ${section}`);
    if (newSection) {
      window.scroll({
        top: newSection.offsetTop,
        left: 0,
        behavior: 'smooth',
      });
    }
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
    return (
      <Button small onClick={onClick}>
        edit
      </Button>
    );
  }
}

const mapStateToProps = state => ({
  tripId: state.currentTrip.trip ? state.currentTrip.trip.tripId : null,
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
