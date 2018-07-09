import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PrismicPage from '../prismic/PrismicPage';
import LoadableComponent from '../components/LoadableComponent';
import { RichText } from 'prismic-reactjs';
import DonationForm from '../components/donate/DonationForm';
import DonationSummary from '../components/donate/DonationSummary';
import { RequestStatus } from '../constants';
import { reset } from '../actions/DonationActions';
import { H1, P, constants } from '../style';
import styled from 'styled-components';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: ${constants.grayBg};
`;

const Content = styled.div`
  max-width: 675px;
  width: 80%;
  margin: 0 auto;
  padding-top: 100px;
  padding-bottom: 100px;
`;

const Title = H1.extend`
  margin-bottom: 20px;
`;

class Donate extends LoadableComponent {
  static pageType = 'donate';
  componentWillMount() {
    this.props.reset();
  }

  renderLoading = () => {
    const { doc } = this.props;
    return (
      <Background>
        <Content>
          <Title>{RichText.asText(doc.data.header)}</Title>
          <P proxima bold size="large" color="green">
            {RichText.asText(doc.data.subheader)}
          </P>
          <DonationForm />
        </Content>
      </Background>
    );
  };

  renderSuccess = () => {
    const { donation, doc } = this.props;
    return (
      <Background>
        <Content>
          <Title>{RichText.asText(doc.data.thank_you_header)}</Title>
          <P proxima bold size="large" color="green">
            {RichText.asText(doc.data.thank_you_subheader)}
          </P>
          <DonationSummary donation={donation} />
        </Content>
      </Background>
    );
  };
}

const mapStateToProps = state => ({
  status: state.donations.status,
  donation: state.donations.currentDonation,
});

const mapDispatchToProps = dispatch => bindActionCreators({ reset }, dispatch);

const connected = connect(mapStateToProps, mapDispatchToProps)(Donate);

export default PrismicPage(connected);
