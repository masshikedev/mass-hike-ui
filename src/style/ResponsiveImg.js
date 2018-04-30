import styled from 'styled-components';

const ResponsiveImg = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('${props => props.src}');
  background-size: cover;
`;

export default ResponsiveImg;
