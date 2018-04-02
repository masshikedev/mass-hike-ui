import { injectGlobal } from 'styled-components';
import tree from '../images/tree.png';

injectGlobal`
  body {

    font-family: 'Source Serif Pro', Serif;
    font-size: 24px;
    color: #000000;
    background-color: #f9f9f9;
  }

  a {
  text-decoration: none;
  color: inherit;
  }

  ul {
    list-style-image: url(${tree});
    list-style-position: inside;
  }

  li {
  	font-size: 16px;
  	line-height: 2;
  }
`;
