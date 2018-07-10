import React, { Component } from 'react';
import { RichText } from 'prismic-reactjs';
import { fromJS } from 'immutable';
import PrismicPage from '../prismic/PrismicPage';
import {
  A,
  Button,
  P,
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

const TopClearButton = Button.extend`
  margin-left: 30px;
`;

const BottomClearButton = Button.extend`
  margin-top: 10px;
`;

const TitleWrapper = GridParent.extend`
  grid-column: span 12;
  padding: 60px 0;
  background: ${constants.lightgreenBg};
  background-blend-mode: multiply;
  margin-bottom: 50px;

  ${MediaQueries.small} {
    padding: 30px;
  }
`;

const TitleContent = styled.div`
  grid-column: 3 / span 8;

  ${MediaQueries.small} {
    grid-column: span 12;
  }
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
  position: sticky;
  top: 100px;

  ${MediaQueries.small} {
    position: static;
    display: flex;
    flex-flow: row wrap;
    grid-column: 2 / span 10;
    order: 0;
    margin-bottom: 40px;
    justify-content: center;

    a:nth-child(even) {
      text-align: left;
    }
    a:nth-child(odd) {
      text-align: right;
    }

    h4 {
      width: 100%;
      text-align: center;
    }

    a {
      width: 40%;
      flex-grow: 1;
      margin: 10px 0;
      color
    }
  }
`;

const Search = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
  width: 100%:

  ${MediaQueries.small} {
    display: none;
  }

  label {
    width: 450px;
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
                <TopClearButton onClick={this.clearSearch}>
                  Clear
                </TopClearButton>
              </Search>
            </TitleContent>
          </TitleWrapper>
          <Main>
            {filteredFAQs.size === 0 ? (
              <div>
                <P size="large">No results found.</P>
                <BottomClearButton onClick={this.clearSearch}>
                  Clear search
                </BottomClearButton>
              </div>
            ) : (
              filteredFAQs.map((section, secId) => (
                <React.Fragment>
                  <FAQWrapper key={secId}>
                    <HR />
                    <FAQTitle id={this.getSectionTitle(section)} proxima>
                      {this.getSectionTitle(section)}
                    </FAQTitle>
                    <HR />
                  </FAQWrapper>
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
              ))
            )}
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
