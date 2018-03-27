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
  height: 780px;
  background: url(${hero}),
    repeating-linear-gradient(
      135deg,
      #f8f8f8,
      #f8f8f8 10px,
      #f2f4f0 2px,
      #f2f4f0 12px
    );
  background-size: 100% 100%;

  ${MediaQueries.small} {
    display: auto;
  }

  @media (max-width: 767px) {
  }
`;

const Drawing = styled.div``;

const Images = styled.div`
  grid-column: span 12;
`;

const Bus = Img.extend`
  width: 150px;
  position: absolute;
  left: 33%;
  top: 91%;
`;

const Cloud1 = Img.extend`
  width: 170px;
  position: absolute;
  left: 16%;
  top: 33%;
`;

const Cloud2 = Img.extend`
  width: 327px;
  position: absolute;
  left: 7%;
  top: 40%;
`;

const Cloud3 = Img.extend`
  width: 327px;
  position: absolute;
  right: 0%;
  top: 10%;
`;

const Cloud4 = Img.extend`
  width: 327px;
  position: absolute;
  left: 73%;
  top: 0%;
`;

const Cloud5 = Img.extend`
  width: 378px;
  position: absolute;
  left: 0%;
  top: 0%;
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
          <Cloud3 src={cloud2} />
        </Drawing>
        <Drawing>
          <Cloud4 src={cloud1} />
        </Drawing>
        <Drawing>
          <Cloud5 src={cloud3} />
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
