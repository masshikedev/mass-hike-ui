import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GoogleApiWrapper } from 'google-maps-react';
import { setGoogle } from '../actions/GoogleActions';
import { GOOGLE_MAPS_API_KEY } from '../constants';

class GoogleProvider extends Component {
  componentWillMount() {
    console.log('mount');
    const { google, setGoogle } = this.props;
    setGoogle(google);
  }

  render() {
    return this.props.children;
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setGoogle }, dispatch);

export default connect(null, mapDispatchToProps)(
  GoogleApiWrapper({
    apiKey: GOOGLE_MAPS_API_KEY,
  })(GoogleProvider)
);
