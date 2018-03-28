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
  grid-column: span 4;
  max-height: 300px;
  position: sticky;
  top: 100px;

  ${MediaQueries.small} {
    grid-column: span 12;
    position: static;
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-left: none;
    border-bottom: solid;
    order: 0;
  }
`;

const Search = styled.div`
  grid-column: span 12;
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
          <H2 id={type}>{type}</H2>
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
      const link = '#' + type;
      return <a href={link}>{type}</a>;
    });
    return sideBar;
  }

  render() {
    return (
      <Container>
        <GridParent>
          <H1>{RichText.asText(this.props.doc.data.title)}</H1>
          <Search>
            <label>
              <H6>Search</H6>
              <Input type="text" />
            </label>
          </Search>
          <Main>{this.displayFAQs(this.props.doc.data.body)}</Main>
          <SideBar>
            {this.displaySideBarLinks(this.props.doc.data.body)}
          </SideBar>
        </GridParent>
      </Container>
    );
  }
}

export default PrismicPage(FAQ);
