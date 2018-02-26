import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H1, Button } from '../../style';
import { RichText } from 'prismic-reactjs';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 90vh;
`;

function HomeMain(props) {
  return (
    <Wrapper>
      <div>
        <H1>{RichText.asText(props.doc.data.top_title)}</H1>
        <Button>
          <Link to="/trips">{RichText.asText(props.doc.data.main_cta)}</Link>
        </Button>
      </div>
    </Wrapper>
  );
}

export default HomeMain;
