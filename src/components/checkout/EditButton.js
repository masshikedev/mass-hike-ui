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
    const { section, setCurrentSection, goBack, checkoutPath } = this.props;
    e.preventDefault();
    setCurrentSection(section);
    goBack(checkoutPath);
  };

  onClickDesktop = e => {
    const { section, goBack, checkoutPath } = this.props;
    e.preventDefault();
    goBack(`${checkoutPath}/${SectionOrder[section].path}`);
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
  checkoutPath: state.checkout.basePath,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentSection: section =>
        setCheckoutState({ currentSection: section }),
      goBack: path => push(path),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EditButton);
