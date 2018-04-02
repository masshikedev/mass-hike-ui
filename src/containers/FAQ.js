import React, { Component } from 'react';
import { RichText } from 'prismic-reactjs';
import { fromJS } from 'immutable';
import PrismicPage from '../prismic/PrismicPage';
import {
  Button as _Button,
  H1,
  H2,
  Input,
  Container,
  GridParent,
  MediaQueries,
  constants,
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

const Button = _Button.extend`
  margin-left: 30px;
`;

const TitleWrapper = styled.div`
  grid-column: span 12;
  padding: 75px;
  background: ${constants.greenBg};
`;

const Title = H1.extend`
  color: white;
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
  display: flex;
  flex-direction: row;
  align-items: center;

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

  updateSearch = event => {
    this.setState({ search: event.target.value });
  };

  clearSearch = () => {
    this.setState({ search: '' });
  };

  getSectionTitle(faqSection) {
    return faqSection.getIn(['primary', 'faq_category', 0, 'text']);
  }

  render() {
    let filteredFAQs = fromJS(this.props.doc.data.body).filter(sections => {
      return sections.get('items').filter(item => {
        return (
          item.getIn(['faq', 0, 'text']).includes(this.state.search) ||
          item.getIn(['faq_response', 0, 'text']).includes(this.state.search)
        );
      }).size;
    });
    return (
      <FAQs>
        <GridParent>
          <TitleWrapper>
            <Title>{RichText.asText(this.props.doc.data.title)}</Title>
            <Search>
              <label>
                <Input
                  type="text"
                  placeholder="search"
                  value={this.state.search}
                  onChange={this.updateSearch}
                />
              </label>
              <Button small primary onClick={this.clearSearch}>
                Clear
              </Button>
            </Search>
          </TitleWrapper>
          <Main>
            {filteredFAQs.map((section, secId) => (
              <div key={secId}>
                {!this.state.search && (
                  <H2 id={this.getSectionTitle(section)}>
                    {this.getSectionTitle(section)}
                  </H2>
                )}
                {section.get('items').map((question, faqId) => {
                  return !this.state.search ||
                    question
                      .getIn(['faq', 0, 'text'])
                      .includes(this.state.search) ||
                    question
                      .getIn(['faq_response', 0, 'text'])
                      .includes(this.state.search) ? (
                    <QuestionAnswer key={faqId} {...question.toJS()} />
                  ) : null;
                })}
              </div>
            ))}
          </Main>
          {!this.state.search && (
            <SideBar>
              {filteredFAQs.map((section, id) => {
                const link = '#' + this.getSectionTitle(section);
                return (
                  <a href={link} key={id}>
                    {this.getSectionTitle(section)}
                  </a>
                );
              })}
            </SideBar>
          )}
        </GridParent>
      </FAQs>
    );
  }
}

export default PrismicPage(FAQ);
