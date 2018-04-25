import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createNewMember } from '../actions/MemberActions';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import PrismicPage from '../prismic/PrismicPage';
import { RichText } from 'prismic-reactjs';
import renderLinkSlices from '../utils/renderLinkSlices';
import {
  Container,
  P,
  H2,
  Input,
  H5,
  Button,
  constants,
  MediaQueries,
  GridParent,
} from '../style';

const FooterWrap = Container.extend`
  color: white;
  background-color: ${constants.green};
  padding-top: 0;
  min-height: ${constants.footerMinHeight};
`;

const MembershipSection = styled.div`
  grid-column-start: 8;
  grid-column-end: 13;
  ${MediaQueries.small} {
    grid-column: span 12;
    align-items: center;
  }
`;

const Links = styled.ul`
  display: grid;
  grid-column-start: 4;
  grid-column-end: 7;
  grid-template-columns: repeat(2, 1fr);
  font-family: 'proxima-nova';
  font-size: 18px;
  font-weight: 600;
  height: 0;

  ${MediaQueries.small} {
    grid-template-columns: 1fr 1fr;
    grid-column: span 12;
    height: auto;
  }
`;

const Logo = H2.extend`
  grid-column: span 3;
  font-family: 'proxima-soft';
  font-size: 28px;
  font-weight: 500;
  text-transform: uppercase;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const Social = styled.div`
  grid-column: span 2;
  color: 'white';

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const FootGrid = GridParent.extend`
  padding: 60px;

  ${MediaQueries.small} {
    grid-gap: 20px;
  }
`;

const SMLink = styled.a`
  color: white;
  padding-right: 20px;

  ${MediaQueries.small} {
    flex: 1;
    padding: 0;
  }
`;

const SMLinks = styled.div`
  display: flex;
`;

const ListItem = styled.li``;

const MemberInput = Input.extend`
  margin-bottom: 10px;
`;

class Footer extends Component {
  static pageType = 'footer';

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      submitted: false,
    };
  }

  onSubmit = e => {
    const { createNewMember } = this.props;
    const { name, email } = this.state;
    e.preventDefault();
    createNewMember({ name, email });
    this.setState({ submitted: true });
  };

  renderMembershipSection() {
    const { submitted, name, email } = this.state;
    if (submitted) {
      return (
        <MembershipSection>
          <P proxima size="large" color="white">
            Thank you for signing up to be a member of Mass Hike!
          </P>
        </MembershipSection>
      );
    }
    return (
      <MembershipSection>
        <P proxima bold size="large" color="white">
          Sign up to receive newsletters!
        </P>
        <P proxima size="medium" color="white">
          Join the Mass Hike membership list
        </P>
        <label>
          <MemberInput
            type="text"
            value={name}
            placeholder="Name"
            onChange={e => this.setState({ name: e.target.value })}
          />
          <MemberInput
            type="text"
            value={email}
            placeholder="Email Address"
            onChange={e => this.setState({ email: e.target.value })}
          />
        </label>
        <Button onClick={this.onSubmit}>
          {RichText.asText(this.props.doc.data.submit_button)}
        </Button>
      </MembershipSection>
    );
  }

  render() {
    return (
      <FooterWrap>
        <FootGrid>
          <Social>
            <Logo>Mass Hike</Logo>
            <SMLinks>
              <SMLink href="https://www.facebook.com/masshike/" target="blank">
                <FontAwesome name="fab fa-facebook" />
              </SMLink>
              <SMLink href="https://www.instagram.com/masshike/" target="blank">
                <FontAwesome name="fab fa-instagram" />
              </SMLink>
              <SMLink href="https://twitter.com/MassHike" target="blank">
                <FontAwesome name="fab fa-twitter" />
              </SMLink>
            </SMLinks>
          </Social>
          <Links>{renderLinkSlices(this.props.doc.data.body, ListItem)}</Links>
          {this.renderMembershipSection()}
        </FootGrid>
      </FooterWrap>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createNewMember }, dispatch);

const connected = connect(null, mapDispatchToProps)(Footer);

export default PrismicPage(connected);
