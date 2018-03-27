import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H1, Button, Img, GridParent, MediaQueries } from '../../style';
import { RichText } from 'prismic-reactjs';
import hero from '../../images/home-hero2.png';
import bus from '../../images/bus1.png';
import cloud1 from '../../images/cloud.png';
import cloud2 from '../../images/cloud cut1.png';
import cloud3 from '../../images/cloud cut2.png';

const HomeSection = GridParent.extend`
  position: relative;
  height: 600px;
  background: url(${hero}),
    repeating-linear-gradient(
      135deg,
      #f8f8f8,
      #f8f8f8 10px,
      #f2f4f0 2px,
      #f2f4f0 12px
    );
  background-size: cover;
  background-position: center;
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
  grid-column: span 12;
  grid-row-start: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`;

const Title = H1.extend`
  max-width: 500px;
`;

const BookNow = Button.extend`
  width: 181px;
  height: 63px;
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
        <Title>{RichText.asText(props.doc.data.top_title)}</Title>
        <BookNow>
          <Link to="/trips">{RichText.asText(props.doc.data.main_cta)}</Link>
        </BookNow>
      </Column>
    </HomeSection>
  );
}

export default HomeMain;
