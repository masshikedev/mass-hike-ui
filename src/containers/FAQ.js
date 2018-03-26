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
  MediaQueries,
} from '../style';
import QuestionAnswer from '../components/faq/QuestionAnswer';
import styled from 'styled-components';

const Main = styled.div`
  grid-column: span 8;

  ${MediaQueries.small} {
    grid-column: span 12;
    order: 1;
  }
`;

const FixedWrap = styled.div`
  grid-column: span 4;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
`;

const SideBar = styled.div`
  display: grid;
  border-left: solid;
  position: absolute;

  ${MediaQueries.small} {
    position: static;
    border-left: none;
    border-bottom: solid;
    order: 0;
  }
`;

const Search = styled.div`
  ${MediaQueries.small} {
    display: none;
  }
`;

class FAQ extends Component {
  static pageType = 'faq';

  getQuestionTypes(faqs) {
    var questionTypes = faqs.map(faq => {
      return faq.primary.question_type[0].text;
    });

    questionTypes = questionTypes.filter(function(x, i) {
      return questionTypes.indexOf(x) === i;
    });

    return questionTypes;
  }

  displayFAQs(faqs) {
    var questionTypes = this.getQuestionTypes(faqs);

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

  displaySideBarLinks(faqs) {
    var questionTypes = this.getQuestionTypes(faqs);

    var sideBar = questionTypes.map(type => {
      return <P>{type}</P>;
    });
    return sideBar;
  }

  render() {
    return (
      <Container>
        <GridParent>
          <Main>
            <H1>{RichText.asText(this.props.doc.data.title)}</H1>
            <Search>
              <label>
                <H6>Search</H6>
                <Input type="text" />
              </label>
            </Search>
            {this.displayFAQs(this.props.doc.data.body)}
          </Main>
          <FixedWrap>
            <SideBar>
              {this.displaySideBarLinks(this.props.doc.data.body)}
            </SideBar>
          </FixedWrap>
        </GridParent>
      </Container>
    );
  }
}

export default PrismicPage(FAQ);
