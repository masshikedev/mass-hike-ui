import React from 'react';
import { H4, P } from '../../style';
import { RichText } from 'prismic-reactjs';

function QuestionAnswer(props) {
  return (
    <div>
      <H4>{RichText.asText(props.faq)}</H4>
      <P>{RichText.asText(props.faq_response)}</P>
    </div>
  );
}

export default QuestionAnswer;
