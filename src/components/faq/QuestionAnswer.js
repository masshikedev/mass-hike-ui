import React from 'react';
import styled from 'styled-components';
import {
  H1,
  H2,
  H4,
  P,
  Img,
  MediaQueries,
  Button,
  GridParent,
} from '../../style';
import { RichText } from 'prismic-reactjs';

const Column = styled.div`
  grid-column: span 6;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const Title = styled.div`
  grid-column: span 12;
`;
function QuestionAnswer(props) {
  return (
    <div>
      <H4>{RichText.asText(props.question)}</H4>
      <P>{RichText.render(props.answer)}</P>
    </div>
  );
}

export default QuestionAnswer;
