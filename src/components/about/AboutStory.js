import React from 'react';
import styled from 'styled-components';
import { P, MediaQueries, GridParent, constants } from '../../style';
import { RichText } from 'prismic-reactjs';
import hero from '../../images/home-hero2.png';

const Text = P.extend`
  grid-column: span 8;
  padding: 40px;
  padding-top: 20px;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const Title = styled.div`
  grid-column: span 12;
  display: flex;
  padding: 0 40px;
  padding-top: 20px;
  order: 0;

  :after {
    position: relative;
    content: '';
    height: 2px;
    background-color: #d8dce0;
    width: 70%;
    margin-left: 15px;
    top: 35%;
  }

  ${MediaQueries.small} {
    :after {
      display: none;
    }
  }
`;

const Story = GridParent.extend`
  background: ${constants.paleblue};
`;

const Image = styled.div`
  grid-column: span 12;
  background-image: url(${hero});
  background-position: bottom;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 300px;

  ${MediaQueries.small} {
    min-height: 264px;
    background-position: right bottom;
    background-size: auto;
  }
`;

function AboutStory(props) {
  return (
    <Story>
      <Title>
        <P size="xlarge" bold proxima>
          {RichText.asText(props.doc.data.title2)}
        </P>
      </Title>
      <Text size="medium">{RichText.render(props.doc.data.our_story)}</Text>
      <Image />
    </Story>
  );
}

export default AboutStory;
