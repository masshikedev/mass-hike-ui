import React from 'react';
import { H4, P } from '../../style';
import { RichText } from 'prismic-reactjs';

function QuestionAnswer(props) {
  return (
    <div>
      <H4>{RichText.asText(props.question)}</H4>
      <P>{RichText.render(props.answer)}</P>
    </div>
  );
}

export default QuestionAnswer;
