import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import { GOOGLE_MAPS_API_KEY } from '../../../constants';
import { P, GridParent, Input, Button, H6 } from '../../../style';
import styled from 'styled-components';

const Column = styled.div`
  grid-column: span 4;
`;

const ZipcodeFormContainer = GridParent.extend`
  margin-top: 20px;
`;

const AddButton = Button.extend`
  margin-top: 20px;
`;

class ZipcodeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentZipcode: '',
      validationError: '',
      service: this.getService(props.google),
    };
  }

  getService(google) {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -33.866, lng: 151.196 },
      zoom: 15,
    });
    return new google.maps.places.PlacesService(map);
  }

  getZipcodeData(zipcode, callback) {
    const { service } = this.state;
    service.textSearch({ query: zipcode }, callback);
  }

  onClickAdd = e => {
    e.preventDefault();
    const { currentZipcode } = this.state;
    const { onAddZipcode } = this.props;
    if (!isNaN(currentZipcode) && currentZipcode.length === 5) {
      this.getZipcodeData(currentZipcode, results => {
        onAddZipcode({
          zipcode: currentZipcode,
          location: results[0].formatted_address,
        });
      });
      this.setState({ currentZipcode: '', validationError: '' });
    } else {
      this.setState({ validationError: 'Invalid Zipcode' });
    }
  };

  render() {
    const { error } = this.props;
    const { currentZipcode, validationError } = this.state;
    return (
      <div>
        <ZipcodeFormContainer>
          <Column>
            <H6>Zipcode</H6>
            <Input
              type="text"
              value={currentZipcode}
              onChange={e => this.setState({ currentZipcode: e.target.value })}
            />
          </Column>
          <Column>
            <AddButton onClick={this.onClickAdd}>Add zipcode</AddButton>
          </Column>
        </ZipcodeFormContainer>
        {error && <P error>{error}</P>}
        {validationError && <P error>{validationError}</P>}
      </div>
    );
  }
}

export default GoogleApiWrapper({ apiKey: GOOGLE_MAPS_API_KEY })(ZipcodeForm);
