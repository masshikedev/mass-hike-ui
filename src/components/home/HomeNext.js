import React from 'react';
import styled from 'styled-components';
import { H2, H5, P, Button, Img, GridParent, MediaQueries } from '../../style';
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
  padding: 40px;

  ${MediaQueries.small} {
    grid-column: span 12;
    order: 1;
    text-align: center;
  }
`;

const Summary = styled.div`
  margin-top: 50px;
  padding: 50px;
`;

const Date = styled.div`
  font-family: 'Open Sans';
  position: absolute;
  left: 0;
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
        <Summary>
          <H5>Let's go to </H5>
          <H2>{props.doc.data.next_trip[0].text}</H2>
          <P>{props.doc.data.next_trip[1].text}</P>
        </Summary>
      </Text>
      <Image src={props.doc.data.next_trip_image.url} />
    </Next>
  );
}

export default HomeNext;
