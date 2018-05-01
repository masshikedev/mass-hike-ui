import React from 'react';
import styled from 'styled-components';
import { H1, MediaQueries, P, constants, Img, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const Text = styled.div`
  grid-column: span 7;
  padding: 40px 80px;
  padding-top: 80px;
  background: ${constants.lightgreenBg};
  color: #fff;

  ${MediaQueries.small} {
    grid-column: span 12;
    padding: 40px;
  }
`;

const ImpactImg = styled.div`
  grid-column: span 4;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const Title = H1.extend`
  color: #fff;
  margin-bottom: 25px;
`;

const Image = styled.div`
  grid-column: span 5;
  background-image: url(${props => props.bg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 400px;

  ${MediaQueries.small} {
    grid-column: span 12;
    order: 0;
    min-height: 250px;
  }
`;

const Main = GridParent.extend`
  grid-gap: 0;
`;

function ImpactMain(props) {
  return (
    <Main>
      <Text>
        <P color="white" proxima bold size="large">
          Making an
        </P>
        <Title>{RichText.asText(props.doc.data.impact_title)}</Title>
        <P color="white" proxima size="medium">
          {RichText.asText(props.doc.data.main_content)}
        </P>
      </Text>
      <Image bg={props.doc.data.impact_main_image.url} />
    </Main>
  );
}

export default ImpactMain;
