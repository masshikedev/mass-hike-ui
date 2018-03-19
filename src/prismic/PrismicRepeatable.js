import React from 'react';
import NotFound from '../NotFound';
import Prismic from 'prismic-javascript';

export default Wrapped =>
  class PrismicRepeatable extends React.Component {
    state = {
      doc: null,
      err: null,
    };

    componentWillMount() {
      this.fetchPage(this.props);
    }

    componentWillReceiveProps(props) {
      this.fetchPage(props);
    }

    fetchPage = props => {
      if (props.prismicCtx) {
        props.prismicCtx.api
          .query(Prismic.Predicates.at('document.type', Wrapped.pageType), {})
          .then(doc => {
            if (doc) {
              this.setState(() => ({ doc }));
            }
          });
      }
    };

    render() {
      return this.state.doc ? (
        <Wrapped doc={this.state.doc} />
      ) : (
        <h3>Loading...</h3>
      );
    }
  };
