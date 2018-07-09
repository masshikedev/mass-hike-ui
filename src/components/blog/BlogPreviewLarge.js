import React, { Component } from 'react';
import styled from 'styled-components';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { P, Button, MediaQueries, GridParent, constants } from '../../style';
import moment from 'moment';
import { MONTH_DATE_YEAR } from '../../utils/dateFormats';
import { RichText } from 'prismic-reactjs';

const Wrapper = styled.div`
  position: relative;

  ${MediaQueries.small} {
    padding-top: 10px;
  }
`;

const Preview = GridParent.extend`
  grid-template-columns: repeat(24, 1fr);
  grid-gap: 0;
`;

const Column = styled.div`
  padding: 60px;
  grid-column: span 10;
  background: ${constants.offwhiteBg};

  ${MediaQueries.small} {
    grid-column: span 24;
  }
`;

const Title = P.extend``;

const Image = Column.extend`
  background-image: url(${props => props.bg});
  grid-column: span 13;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 300px;
`;

const LeftBorder = styled.div`
  grid-column: span 1;
  min-height: 20px;
  background: ${constants.orangeBg};

  ${MediaQueries.small} {
    grid-column: span 24;
    height: 50px;
  }
`;

const FeaturedText = P.extend`
  position: absolute;
  top: 30px;
  background: #fff;
  padding: 10px 40px;

  ${MediaQueries.small} {
    position: relative;
    width: fit-content;
    display: block;
    margin: 0 auto;
    top: 80px;
  }
`;

const ReadMoreButton = Button.extend`
  margin-top: 30px;
`;

class BlogPreviewLarge extends Component {
  render() {
    return (
      <Wrapper>
        <FeaturedText proxima spaced size="large" color="orange" bold uppercase>
          Featured
        </FeaturedText>
        <Preview>
          <LeftBorder />
          <Image bg={this.props.image} />
          <Column>
            <Title color="green" size="large" proxima extrabold>
              {this.props.title}
            </Title>
            <P proxima bold>
              {moment.utc(this.props.date).format(MONTH_DATE_YEAR)}
            </P>
            <P proxima>{RichText.asText(this.props.preview)}</P>
            <ReadMoreButton
              primary
              onClick={() => this.props.toFull(this.props.uid)}
            >
              Read More
            </ReadMoreButton>
          </Column>
        </Preview>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toFull: uid => push(`blog/${uid}`),
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(BlogPreviewLarge);
