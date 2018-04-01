import React, { Component } from 'react';
import { RichText } from 'prismic-reactjs';
import PrismicPage from '../prismic/PrismicPage';
import {
  Button,
  H1,
  H2,
  H6,
  Input,
  Container,
  GridParent,
  MediaQueries,
} from '../style';
import QuestionAnswer from '../components/faq/QuestionAnswer';
import styled from 'styled-components';

const FAQs = Container.extend`
  padding: 80px;
`;

const Main = styled.div`
  grid-column: span 8;

  ${MediaQueries.small} {
    grid-column: span 12;
    order: 1;
  }
`;

const Title = H1.extend`
  grid-column: span 12;
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
  max-width: 400px;
  ${MediaQueries.small} {
    display: none;
  }
`;

class FAQ extends Component {
  static pageType = 'faq';

  constructor() {
    super();
    this.state = {
      search: '',
    };
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  clearSearch() {
    this.setState({ search: '' });
  }

  getQuestionTypes(faqs) {
    let questionTypes = faqs.map(faq => {
      return faq.primary.question_type[0].text;
    });

    questionTypes = questionTypes.filter(function(x, i) {
      return questionTypes.indexOf(x) === i;
    });

    return questionTypes;
  }

  displayFAQs(faqs) {
    let questionTypes = this.getQuestionTypes(faqs);

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
    const questionTypes = this.getQuestionTypes(faqs);

    const sideBar = questionTypes.map(type => {
      const link = '#' + type;
      return <a href={link}>{type}</a>;
    });
    return sideBar;
  }

  render() {
    let filteredFAQs = this.props.doc.data.body.filter(faq => {
      return (
        faq.primary.question[0].text.includes(this.state.search) ||
        faq.primary.answer[0].text.includes(this.state.search)
      );
    });
    return (
      <FAQs>
        <GridParent>
          <Title>{RichText.asText(this.props.doc.data.title)}</Title>
          <Search>
            <label>
              <H6>Search</H6>
              <Input
                type="text"
                value={this.state.search}
                onChange={this.updateSearch.bind(this)}
              />
            </label>
            <Button small onClick={this.clearSearch.bind(this)}>
              Clear
            </Button>
          </Search>
          <Main>{this.displayFAQs(filteredFAQs)}</Main>
          <SideBar>{this.displaySideBarLinks(filteredFAQs)}</SideBar>
        </GridParent>
      </FAQs>
    );
  }
}

export default PrismicPage(FAQ);
