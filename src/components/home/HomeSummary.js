import React from 'react';
import styled from 'styled-components';
import { H2, P, Img } from '../../style';
import { RichText } from 'prismic-reactjs';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 500px;
`;

const Content = styled.div`
  display: flex;
  height: 500px;
`;

function HomeSummary(props) {
  console.log(props);
  return (
    <Wrapper>
      <div>
        <H2>{RichText.asText(props.doc.data.about_title)}</H2>
        <Content>
          <P>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            vitae porttitor diam. Cras vitae dui est. Vivamus odio nulla, porta
            ac purus ac, bibendum egestas sapien. In non suscipit mi. Quisque
            semper quam placerat, dapibus felis vel, viverra lacus. Phasellus
            tincidunt nisl eu velit imperdiet, sed lacinia sapien sagittis.
            Quisque efficitur sit amet enim non porttitor. Cras aliquam aliquam
            dolor vel maximus. Fusce faucibus volutpat elit, a lobortis quam
            tempor non. Aliquam mi mauris, pellentesque nec consequat nec,
            malesuada scelerisque ligula. Ut at elit massa. Phasellus lectus
            risus, ultrices at lectus non, rhoncus luctus neque. Aenean a cursus
            nisl. Maecenas pellentesque dolor bibendum, pulvinar augue vel,
            pretium magna. Aenean feugiat posuere elit id lobortis. In in augue
            quam. Aenean id commodo arcu, eget euismod nisl. Donec elementum
            dictum ipsum. Cras pulvinar neque sit amet arcu pretium molestie.
            Mauris orci orci, dignissim non ultrices non, efficitur ut arcu.
          </P>
        </Content>
      </div>
    </Wrapper>
  );
}

//<Img src={props.doc.data.top_image.url}/>

export default HomeSummary;
