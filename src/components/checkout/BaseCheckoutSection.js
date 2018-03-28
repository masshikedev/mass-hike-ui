import { Component } from 'react';

export default class BaseCheckoutSection extends Component {
  componentDidMount() {
    const { setCurrentSection, index, mobile } = this.props;
    if (!mobile) {
      setCurrentSection(index);
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
}
