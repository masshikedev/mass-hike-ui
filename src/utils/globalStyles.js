import { injectGlobal } from 'styled-components';
import tree from '../images/tree.png';
import { constants } from '../style';

injectGlobal`
  body {
    font-family: 'Source Serif Pro', Serif;
    font-size: 24px;
    color: #000000;
    background-color: #f9f9f9;
  }

  a {
    text-decoration: none;
    margin: 0;
    padding: 0;
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
