import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H1, Button, Img, constants, MediaQueries } from '../../style';
import { RichText } from 'prismic-reactjs';
import hero from '../../images/home-hero.png';
import bus from '../../images/bus1.png';
import cloud1 from '../../images/cloud.png';

const HomeSection = styled.div`
  position: relative;
  height: 600px;
  background: url(${hero}), ${constants.grayBg};
  background-size: cover;
  background-position: center bottom;
  overflow: hidden;

  ${MediaQueries.small} {
    display: auto;
    background-position: right;
  }
`;

const Drawing = styled.div`
  overflow: hidden;
`;

const Images = styled.div`
  grid-column: span 12;
`;

const Bus = Img.extend`
  width: 150px;
  position: absolute;
  left: 33%;
  top: 88%;
`;

const Cloud = Img.extend`
  overflow: hidden;
  ${MediaQueries.small} {
    display: none;
  }
`;

const Cloud1 = Cloud.extend`
  width: 170px;
  position: absolute;
  left: 16%;
  top: 30%;
`;

const Cloud2 = Cloud.extend`
  width: 327px;
  position: absolute;
  left: 7%;
  top: 37%;
`;

const Cloud3 = Cloud.extend`
  width: 327px;
  position: absolute;
  right: 8%;
  top: 2%;
`;

const Cloud4 = Cloud.extend`
  width: 478px;
  position: absolute;
  right: -11%;
  top: 7%;
`;

const Cloud5 = Cloud.extend`
  width: 515px;
  position: absolute;
  left: -7%;
  top: -15%;
`;

const Column = styled.div`
  padding-top: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  height: 100%;
  width: 80%;
  margin: 0 auto;
`;

const Title = H1.extend`
  max-width: 500px;
`;

function HomeMain(props) {
  return (
    <HomeSection>
      <Images>
        <Drawing>
          <Bus src={bus} />
        </Drawing>
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
      </Images>
      <Column>
        <Title center>{RichText.asText(props.doc.data.top_title)}</Title>

        <Link to="/trips">
          <Button primary>{RichText.asText(props.doc.data.main_cta)}</Button>
        </Link>
      </Column>
    </HomeSection>
  );
}

export default HomeMain;
