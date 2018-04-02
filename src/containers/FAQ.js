import React, { Component } from 'react';
import { RichText } from 'prismic-reactjs';
import { fromJS } from 'immutable';
import PrismicPage from '../prismic/PrismicPage';
import {
  A,
  Button as _Button,
  H1,
  H2,
  H4,
  HR,
  Input,
  Container,
  GridParent,
  MediaQueries,
  constants,
} from '../style';
import QuestionAnswer from '../components/faq/QuestionAnswer';
import styled from 'styled-components';

const FAQs = Container.extend`
  margin-bottom: 30px;
`;

const Main = styled.div`
  grid-column: 3 / span 5;

  ${MediaQueries.small} {
    grid-column: span 12;
    order: 1;
  }
`;

const Button = _Button.extend`
  margin-left: 30px;
`;

const TitleWrapper = GridParent.extend`
  grid-column: span 12;
  padding: 125px 0;
  background: ${constants.green} ${constants.greenBg};
  background-blend-mode: multiply;
  margin-bottom: 50px;
`;

const TitleContent = styled.div`
  grid-column: 3 / span 8;
`;

const Title = H1.extend`
  color: white;
`;

const FAQWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-grow: 0.5;
  :not(:first-child) {
    margin: 30px 0;
  }
`;

const FAQTitle = H2.extend`
  flex-shrink: 0;
  width: fit-content;
  margin: 0 50px;
`;

const SideBar = styled.div`
  display: grid;
  grid-column: span 2 / -3;
  max-height: 300px;

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
            <TitleContent>
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
                <Button onClick={this.clearSearch}>Clear</Button>
              </Search>
            </TitleContent>
          </TitleWrapper>
          <Main>
            {filteredFAQs.map((section, secId) => (
              <React.Fragment>
                {!this.state.search && (
                  <FAQWrapper key={secId}>
                    <HR />
                    <FAQTitle id={this.getSectionTitle(section)}>
                      {this.getSectionTitle(section)}
                    </FAQTitle>
                    <HR />
                  </FAQWrapper>
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
              </React.Fragment>
            ))}
          </Main>
          {!this.state.search && (
            <SideBar>
              <H4>Topics</H4>
              {filteredFAQs.map((section, id) => {
                const link = '#' + this.getSectionTitle(section);
                return (
                  <A href={link} key={id}>
                    {this.getSectionTitle(section)}
                  </A>
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
