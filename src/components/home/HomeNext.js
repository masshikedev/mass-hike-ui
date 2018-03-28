import React from 'react';
import styled from 'styled-components';
import {
  H2,
  H6,
  H10,
  Button,
  Img,
  GridParent,
  constants,
  MediaQueries,
} from '../../style';
import { RichText } from 'prismic-reactjs';
import { format } from 'date-fns';
import { MONTH_DATE } from '../../utils/dateFormats';

const Column = styled.div`
  grid-column: span 12;
`;

const Text = styled.div`
  grid-column: span 7;
  background: ${constants.orangeBg};
  color: #fff;
  padding: 40px;

  ${MediaQueries.small} {
    grid-column: span 12;
    order: 1;
    text-align: center;
    padding: 10px;
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
  color: ${constants.orange};
  background-color: #fff;
  margin-bottom: 20px;
  padding: 8px;

  ${MediaQueries.small} {
    left: 50%;
    transform: translate(-50%, -80%);
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
          <H6>Let's go to </H6>
          <H2>{props.doc.data.next_trip[0].text}</H2>
          <H10>{props.doc.data.next_trip[1].text}</H10>
        </Summary>
      </Text>
      <Image bg={props.doc.data.next_trip_image.url} />
    </Next>
  );
}

export default HomeNext;
