import { Component } from 'react';

export default class BaseCheckoutSection extends Component {
  componentDidMount() {
    const { setCurrentSection, index } = this.props;
    setCurrentSection(index);
  }

  onCompleteSection = e => {
    const { completeSection, next, index, setCheckoutState } = this.props;
    if (index === 0) {
      setCheckoutState({ initialized: true });
    }
    completeSection(this.state, next);
    e.preventDefault();
  };
}
