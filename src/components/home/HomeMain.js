import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H1, Button, GridParent } from '../../style';
import { RichText } from 'prismic-reactjs';

const HomeSection = GridParent.extend`
  height: 600px;
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
