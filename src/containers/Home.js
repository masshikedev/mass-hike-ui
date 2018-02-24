import React, { Component } from 'react';
import { RichText } from 'prismic-reactjs';
import PrismicPage from '../prismic/PrismicPage';
import HomeMain from '../components/home/HomeMain';
import HomeSummary from '../components/home/HomeSummary';
import HomeDetails from '../components/home/HomeDetails';
import HomeNext from '../components/home/HomeNext';
import ContactFooter from '../components/home/ContactFooter';
import { Container } from '../style';

class Home extends Component {
  static pageType = 'homepage';

  render() {
    return (
      <Container>
        <HomeMain {...this.props} />
        <HomeSummary {...this.props} />
        <HomeDetails {...this.props} />
        <HomeNext {...this.props} />
        <ContactFooter {...this.props} />
      </Container>
    );
  }
}

/*
<div>
        <h1>{RichText.asText(this.props.doc.data.page_title)}</h1>
        <article>{RichText.render(this.props.doc.data.content)}</article>
      </div>
      <Container>
        <HomeMain {this.props}/>
        <HomeSummary />
        <HomeDetails />
        <HomeNext />
        <ContactFooter />
      </Container>
*/
export default PrismicPage(Home);
