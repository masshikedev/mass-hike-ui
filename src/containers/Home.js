import React, { Component } from 'react';
import { RichText } from 'prismic-reactjs';
import PrismicPage from '../prismic/PrismicPage';

class Home extends Component {
  static pageType = 'homepage';

  render() {
    return (
      <div>
        <h1>{RichText.asText(this.props.doc.data.page_title)}</h1>
        <article>{RichText.render(this.props.doc.data.content)}</article>
      </div>
    );
  }
}

export default PrismicPage(Home);
