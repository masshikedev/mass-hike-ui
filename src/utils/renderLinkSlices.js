import React from 'react';
import { RichText } from 'prismic-reactjs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DefaultWrapper = styled.div``;

const renderLinkSlices = (body, wrapper) => {
  const Wrapper = wrapper ? wrapper : DefaultWrapper;
  return body.map((link, id) => {
    if (link.slice_type && link.slice_type === 'link') {
      if (link.primary.destination.uid) {
        const destination = '/' + link.primary.destination.uid;
        return (
          <Wrapper key={id}>
            <Link to={destination}>{RichText.asText(link.primary.label)}</Link>
          </Wrapper>
        );
      } else {
        return (
          <Wrapper key={id}>
            <a href={link.primary.destination.url}>
              {RichText.asText(link.primary.label)}
            </a>
          </Wrapper>
        );
      }
    }
    return null;
  });
};

export default renderLinkSlices;
