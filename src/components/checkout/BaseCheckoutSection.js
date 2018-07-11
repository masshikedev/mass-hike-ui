import { Component } from 'react';

export default class BaseCheckoutSection extends Component {
  componentDidMount() {
    const { setCurrentSection, index, mobile, afterMount } = this.props;
    if (!mobile && index !== null) {
      setCurrentSection(index);
    }
    if (afterMount) afterMount();
  }

  componentDidUpdate() {
    const { mobile, setCheckoutState } = this.props;
    if (mobile && setCheckoutState) {
      setCheckoutState(this.state);
    }
  }

  onCompleteSection = e => {
    const {
      completeSection,
      next,
      index,
      setCheckoutState,
      mobile,
    } = this.props;
    e.preventDefault();
    if (!index) {
      setCheckoutState({ initialized: true });
    }
    const options = mobile ? { index } : { nextSectionPath: next };
    completeSection(this.state, options);
  };

  onBackSection = (e, save) => {
    const { completeSection, prev, index, mobile } = this.props;
    e.preventDefault();
    const options = mobile
      ? { index, goBack: true }
      : { nextSectionPath: prev, save: save };
    completeSection(this.state, options);
  };

  onFurthestSection() {
    const { index, highestCompletedSection } = this.props;
    return index === highestCompletedSection;
  }
}
