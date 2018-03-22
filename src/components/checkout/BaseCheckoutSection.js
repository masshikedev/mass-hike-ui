import { Component } from 'react';

export default class BaseCheckoutSection extends Component {
  componentDidMount() {
    const { setCurrentSection, index } = this.props;
    setCurrentSection(index);
  }

  onCompleteSection = e => {
    const { completeSection, next } = this.props;
    completeSection(this.state, next);
    e.preventDefault();
  };
}
