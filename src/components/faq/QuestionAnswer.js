import React from 'react';
import { H6, P, constants } from '../../style';
import { RichText } from 'prismic-reactjs';
import styled from 'styled-components';

const QA = styled.div`
  width: 80%;
  margin: 20px auto;
`;

function QuestionAnswer(props) {
  return (
    <QA>
      <H6 color={constants.green}>{RichText.asText(props.faq)}</H6>
      <P>{RichText.asText(props.faq_response)}</P>
    </QA>
  );
}

export default QuestionAnswer;
