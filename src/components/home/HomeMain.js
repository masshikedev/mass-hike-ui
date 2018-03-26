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
  height: 564px;
  background: url(${hero}),
    repeating-linear-gradient(
      135deg,
      #f8f8f8,
      #f8f8f8 10px,
      #f2f4f0 2px,
      #f2f4f0 12px
    );
`;

const Drawing = Img.extend`
  position: absolute;

  ${MediaQueries.small} {
    display: none;
  }
`;

const Bus = Drawing.extend`
  width: 150px;
  bottom: 347px;
  left: 700px;
`;

const Cloud1 = Drawing.extend`
  width: 324px;
  top: 100px;
  right: 324px;
`;

const Cloud2 = Drawing.extend`
  width: 324px;
  bottom: 550px;
  left: 340px;
`;

const Cloud3 = Drawing.extend`
  width: 250px;
  top: 200px;
  right: 500px;
`;

const Column = styled.div`
  grid-column: span 12;
  grid-row-start: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
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
      <Bus src={bus} />
      <Cloud1 src={cloud1} />
      <Cloud2 src={cloud1} />
      <Cloud3 src={cloud1} />
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
