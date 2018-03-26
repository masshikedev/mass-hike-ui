import React from 'react';
import styled from 'styled-components';
import { H2, H4, P, Button, Img, GridParent, MediaQueries } from '../../style';
import { RichText } from 'prismic-reactjs';

const Column = styled.div`
  grid-column: span 12;
`;

const Text = styled.div`
  grid-column: span 8;
  background: repeating-linear-gradient(
    135deg,
    #f05a28,
    #f05a28 10px,
    #da5323 2px,
    #da5323 12px
  );
  color: #fff;
  padding: 100px 0;

  ${MediaQueries.small} {
    grid-column: span 12;
    order: 1;
    text-align: center;
  }
`;

const Date = styled.div`
  font-family: 'Open Sans';
  font-weight: bold;
  color: #f05a28;
  background-color: #fff;
  margin-bottom: 20px;
  width: 150px;
`;

const Image = Img.extend`
  grid-column span 4;

  ${MediaQueries.small} {
    grid-column: span 12;
    order: 0;
  }
`;

const Next = GridParent.extend`
  grid-column-gap: 0;
`;

function HomeNext(props) {
  //This should all be replaced with information from the actual trips api
  return (
    <Next>
      <Text>
        <Date>{props.doc.data.next_trip_date}</Date>
        <H4>Let's go to </H4>
        <H2>{props.doc.data.next_trip[0].text}</H2>
        <P>{props.doc.data.next_trip[1].text}</P>
      </Text>
      <Image src={props.doc.data.next_trip_image.url} />
    </Next>
  );
}

export default HomeNext;
