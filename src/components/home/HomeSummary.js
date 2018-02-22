import React from 'react';
import styled from 'styled-components';
import { H2, P, Img } from '../../style';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 500px;
`;

function HomeSummary(props) {
  return (
    <Wrapper>
      <div>
        <H2>Nature is very good and you should go there for these reasons.</H2>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae
          porttitor diam. Cras vitae dui est. Vivamus odio nulla, porta ac purus
          ac, bibendum egestas sapien. In non suscipit mi. Quisque semper quam
          placerat, dapibus felis vel, viverra lacus. Phasellus tincidunt nisl
          eu velit imperdiet, sed lacinia sapien sagittis. Quisque efficitur sit
          amet enim non porttitor. Cras aliquam aliquam dolor vel maximus.
        </P>
        <P>
          Fusce faucibus volutpat elit, a lobortis quam tempor non. Aliquam mi
          mauris, pellentesque nec consequat nec, malesuada scelerisque ligula.
          Ut at elit massa. Phasellus lectus risus, ultrices at lectus non,
          rhoncus luctus neque. Aenean a cursus nisl. Maecenas pellentesque
          dolor bibendum, pulvinar augue vel, pretium magna. Aenean feugiat
          posuere elit id lobortis. In in augue quam. Aenean id commodo arcu,
          eget euismod nisl. Donec elementum dictum ipsum. Cras pulvinar neque
          sit amet arcu pretium molestie. Mauris orci orci, dignissim non
          ultrices non, efficitur ut arcu.
        </P>
        <Img />
      </div>
    </Wrapper>
  );
}

export default HomeSummary;
