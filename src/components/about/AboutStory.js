import React from 'react';
import styled from 'styled-components';
import { P, MediaQueries, Img, GridParent, constants } from '../../style';
import { RichText } from 'prismic-reactjs';
import hero from '../../images/home-hero2.png';
import cloud1 from '../../images/cloud2.png';

const Text = P.extend`
  grid-column: span 8;
  padding: 0 80px;
  padding-top: 20px;
  z-index: 10;

  ${MediaQueries.small} {
    grid-column: span 12;
    padding-left: 40px;
    padding-right: 40px;
  }
`;

const Title = styled.div`
  grid-column: span 12;
  display: flex;
  padding: 0 80px;
  padding-top: 40px;
  order: 0;
  z-index: 10;

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
    padding-left: 40px;
    padding-right: 40px;
  }
`;

const Story = GridParent.extend`
  background: ${constants.paleblue};
  position: relative;
  overflow: hidden;
  min-height: 700px;
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

const Drawing = styled.div`
  overflow: hidden;

  ${MediaQueries.small} {
    display: none;
  }
`;

const Drawings = styled.div`
  grid-column: span 12;
  z-index: 0;
`;

const Cloud = Img.extend`
  overflow: hidden;
  ${MediaQueries.small} {
    display: none;
  }
`;

const Cloud1 = Cloud.extend`
  width: 251px;
  position: absolute;
  left: 18%;
  top: 47%;
`;

const Cloud2 = Cloud.extend`
  width: 274px;
  position: absolute;
  left: 64%;
  top: 7%;
`;

const Cloud3 = Cloud.extend`
  width: 450px;
  position: absolute;
  left: 73%;
  top: 14%;
`;

const Cloud4 = Cloud.extend`
  width: 500px;
  position: absolute;
  left: -10%;
  top: -8%;
`;

const Cloud5 = Cloud.extend`
  width: 100px;
  position: absolute;
  left: 35%;
  top: 48%;
`;

function AboutStory(props) {
  return (
    <Story>
      <Drawings>
        <Drawing>
          <Cloud1 src={cloud1} />
        </Drawing>
        <Drawing>
          <Cloud2 src={cloud1} />
        </Drawing>
        <Drawing>
          <Cloud3 src={cloud1} />
        </Drawing>
        <Drawing>
          <Cloud4 src={cloud1} />
        </Drawing>
        <Drawing>
          <Cloud5 src={cloud1} />
        </Drawing>
      </Drawings>
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
