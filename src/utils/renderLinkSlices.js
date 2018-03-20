import React from 'react';
import { RichText } from 'prismic-reactjs';
import { Link } from 'react-router-dom';

const renderLinkSlices = body => {
  return body.map(link => {
    console.log(link.slice_type);
    if (link.slice_type && link.slice_type === 'link') {
      if (link.primary.destination.uid) {
        const destination = '/' + link.primary.destination.uid;
        return (
          <Link to={destination}>{RichText.asText(link.primary.label)}</Link>
        );
      } else {
        return (
          <a href={link.primary.destination.url}>
            {RichText.asText(link.primary.label)}
          </a>
        );
      }
    }
  });
};

export default renderLinkSlices;
