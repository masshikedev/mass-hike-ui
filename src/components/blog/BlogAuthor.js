import React from 'react';
import styled from 'styled-components';
import {
  MediaQueries,
  Img,
  H1,
  H2,
  P,
  HR,
  constants,
  GridParent,
} from '../../style';
import { RichText } from 'prismic-reactjs';
import moment from 'moment';
import { MONTH_DATE_YEAR } from '../../utils/dateFormats';

const AuthorContainer = GridParent.extend`
  padding: 40px 20px;
`;

const AuthorImg = Img.extend`
  border-radius: 100%;
  grid-column: span 3;
`;

const AuthorInfo = styled.div`
  grid-column: span 9;
`;

const AuthorName = styled.div`
  display: flex;
  padding: 0;
`;

const AuthorNameItem = P.extend`
  padding: 0;
  padding-right: 10px;
  margin: 0;

  ${MediaQueries.small} {
    font-size: 16px;
  }
`;

const Dash = AuthorNameItem.extend``;

function BlogAuthor(props) {
  return (
    <AuthorContainer>
      <AuthorImg src={props.author_image.url} />
      <AuthorInfo>
        <AuthorName>
          <AuthorNameItem proxima bold size="large">
            {RichText.asText(props.blog_author)}
          </AuthorNameItem>
          <Dash proxima bold size="large">
            -
          </Dash>
          <AuthorNameItem proxima bold size="large" color="yellow">
            {moment.utc(props.blog_date).format(MONTH_DATE_YEAR)}
          </AuthorNameItem>
        </AuthorName>
        <P proxima size="medium">
          {RichText.asText(props.author_bio)}
        </P>
      </AuthorInfo>
    </AuthorContainer>
  );
}

export default BlogAuthor;
