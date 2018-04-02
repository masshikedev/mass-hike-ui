import React, { Component } from 'react';
import { RichText } from 'prismic-reactjs';
import { fromJS } from 'immutable';
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

const FAQs = Container.extend``;

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
      return faq.primary.faq_category[0].text;
    });

    return questionTypes;
  }

  displayFAQs(faqs) {
    let questionTypes = this.getQuestionTypes(faqs);

    const elements = faqs.map(faq => {
      const category = faq.primary.faq_category[0].text;
      return (
        <div>
          <H2 id={category}>{category}</H2>
          {faq.items.map(QA => {
            return <QuestionAnswer {...QA} />;
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
    const allSections = fromJS(this.props.doc.data.body);

    let filteredFAQs = this.props.doc.data.body.filter(set => {
      set.items.filter(item => {
        return (
          item.faq[0].text.includes(this.state.search) ||
          item.faq_response[0].text.includes(this.state.search)
        );
      });
      return set.items.length > 0;
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
