import React, { Component } from 'react';
import { RichText } from 'prismic-reactjs';
import PrismicPage from '../prismic/PrismicPage';
import {
  H1,
  H2,
  P,
  H6,
  Input,
  Container,
  GridParent,
  NavMargin,
} from '../style';
import QuestionAnswer from '../components/faq/QuestionAnswer';
import styled from 'styled-components';

const Main = styled.div`
  grid-column: span 8;
`;

const SideBar = styled.div`
  border-left: solid;
  grid-column: span 4;
`;

class FAQ extends Component {
  static pageType = 'faq';

  getQuestionTypes() {
    var questionTypes = this.props.faqs.map(faq => {
      return faq.primary.question_type[0].text;
    });
  }

  displayFAQs(faqs) {
    var questionTypes = faqs.map(faq => {
      return faq.primary.question_type[0].text;
    });

    questionTypes = questionTypes.filter(function(x, i) {
      return questionTypes.indexOf(x) === i;
    });

    const elements = questionTypes.map(type => {
      return (
        <div>
          <H2>{type}</H2>
          {faqs.map(faq => {
            if (faq.primary.question_type[0].text === type) {
              return <QuestionAnswer {...faq.primary} />;
            }
          })}
        </div>
      );
    });
    return elements;
  }

  render() {
    return (
      <Container>
        <GridParent>
          <Main>
            <H1>{RichText.asText(this.props.doc.data.title)}</H1>
            <label>
              <H6>Search</H6>
              <Input type="text" />
            </label>
            {this.displayFAQs(this.props.doc.data.body)}
          </Main>
          <div>
            <SideBar>Henlo</SideBar>
          </div>
        </GridParent>
      </Container>
    );
  }
}

export default PrismicPage(FAQ);
