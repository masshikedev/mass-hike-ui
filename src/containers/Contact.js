import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RichText } from 'prismic-reactjs';
import PrismicPage from '../prismic/PrismicPage';
import { submitMessage, reset } from '../actions/ContactActions';
import { RequestStatus } from '../constants';
import {
  H1,
  H6,
  P,
  Input,
  TextArea,
  GridParent,
  constants,
  Container,
  Button,
} from '../style';
import styled from 'styled-components';

const Column = styled.div`
  grid-column: span 12;
  padding: 0 20px;
`;

const ColumnFlex = Column.extend`
  display: flex;
  justify-content: center;
  margin: 50px;
`;

const Title = H1.extend`
  margin: 40px auto;
`;

const BGContainer = Container.extend`
  background: ${constants.grayBg};
`;

const WidthContainer = Container.extend`
  max-width: 600px;
  background: none;
`;

const SectionTitle = H6.extend`
  margin-top: 15px;
`;

class Contact extends Component {
  static pageType = 'contact';

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      body: '',
    };
  }

  componentWillMount() {
    this.props.reset();
  }

  buttonDisabled() {
    const { status } = this.props;
    const { name, email, body } = this.state;
    return (
      status === RequestStatus.PENDING ||
      name === '' ||
      email === '' ||
      body === ''
    );
  }

  handleSubmit = e => {
    const { submitMessage } = this.props;
    e.preventDefault();
    if (!this.buttonDisabled()) {
      submitMessage(this.state);
    }
  };

  renderSuccess() {
    return (
      <BGContainer>
        <WidthContainer>
          <P proxima bold color="green" size="large">
            Your message has been sent
          </P>
        </WidthContainer>
      </BGContainer>
    );
  }

  renderError() {
    return (
      <P proxima bold color="error" size="large">
        An error has occured
      </P>
    );
  }

  render() {
    const { name, email, body } = this.state;
    const { status } = this.props;
    if (status === RequestStatus.SUCCESS) {
      return this.renderSuccess();
    }
    return (
      <BGContainer>
        <WidthContainer>
          <GridParent>
            <Column>
              <Title>{RichText.asText(this.props.doc.data.title)}</Title>
              <P proxima bold color="green" size="large">
                {RichText.asText(this.props.doc.data.contact_content)}
              </P>
              <br />
            </Column>
          </GridParent>
          <GridParent>
            <Column>
              <label>
                <SectionTitle>
                  {RichText.asText(this.props.doc.data.field1)}
                </SectionTitle>
                <Input
                  type="text"
                  value={name}
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </label>
              <label>
                <SectionTitle>
                  {RichText.asText(this.props.doc.data.field2)}
                </SectionTitle>
                <Input
                  type="text"
                  value={email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </label>
              <label>
                <SectionTitle>
                  {RichText.asText(this.props.doc.data.field3)}
                </SectionTitle>
                <TextArea
                  type="text"
                  value={body}
                  onChange={e => this.setState({ body: e.target.value })}
                />
              </label>
            </Column>
            <ColumnFlex>
              {status === RequestStatus.ERROR && this.renderError()}
              <Button
                primary
                large
                onClick={this.handleSubmit}
                disabled={this.buttonDisabled()}
              >
                Submit
              </Button>
            </ColumnFlex>
          </GridParent>
        </WidthContainer>
      </BGContainer>
    );
  }
}

const mapStateToProps = state => ({
  status: state.contact.status,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitMessage,
      reset,
    },
    dispatch
  );

const connected = connect(mapStateToProps, mapDispatchToProps)(Contact);

export default PrismicPage(connected);
