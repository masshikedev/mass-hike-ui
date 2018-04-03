import React from 'react';
import styled from 'styled-components';
import { H1, P, GridParent, MediaQueries, constants } from '../../style';
import { RichText } from 'prismic-reactjs';

const About = GridParent.extend`
  grid-column-gap: 0;
`;

const Text = styled.div`
  grid-column: span 7;
  padding: 40px 80px;
  padding-top: 80px;
  background: ${constants.lightgreenBg};
  color: #fff;

  ${MediaQueries.small} {
    grid-column: span 12;
    padding: 40px;
    text-align: center;
  }
`;

const Title = H1.extend`
  margin-bottom: 10px;
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

function AboutMain(props) {
  console.log(props);
  return (
    <About>
      <Text>
        <P color="white" bold proxima size="large">
          Learn a bit
        </P>
        <Title>{RichText.asText(props.doc.data.title)}</Title>
        <P proxima color="white">
          {RichText.asText(props.doc.data.main_content)}
        </P>
      </Text>
      <Image bg={props.doc.data.about_image.url} />
    </About>
  );
}

export default AboutMain;
