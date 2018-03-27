import React from 'react';
import styled from 'styled-components';
import { H2, H5, P, Button, Img, GridParent, MediaQueries } from '../../style';
import { RichText } from 'prismic-reactjs';
import { format } from 'date-fns';
import { MONTH_DATE } from '../../utils/dateFormats';

const Column = styled.div`
  grid-column: span 12;
`;

const Text = styled.div`
  grid-column: span 7;
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

  ${MediaQueries.small} {
    margin-top: 0;
  }
`;

const Date = styled.div`
  font-family: 'Open Sans';
  position: absolute;
  left: 0;
  font-weight: bold;
  color: #f05a28;
  background-color: #fff;
  margin-bottom: 20px;
  padding: 8px;

  ${MediaQueries.small} {
    left: 50%;
    transform: translate(-50%, -150%);
  }
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
        <Date>{format(props.doc.data.next_trip_date, MONTH_DATE)}</Date>
        <Summary>
          <H5>Let's go to </H5>
          <H2>{props.doc.data.next_trip[0].text}</H2>
          <P>{props.doc.data.next_trip[1].text}</P>
        </Summary>
      </Text>
      <Image bg={props.doc.data.next_trip_image.url} />
    </Next>
  );
}

export default HomeNext;
