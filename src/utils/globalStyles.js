import { injectGlobal } from 'styled-components';
import tree from '../images/tree.png';
import { constants } from '../style';
import 'react-day-picker/lib/style.css';
import 'rc-time-picker/assets/index.css';

injectGlobal`
  body {
    font-family: 'Source Serif Pro', Serif;
    font-size: 24px;
    color: #000000;
    background-color: ${constants.gray};
  }

  a {
    text-decoration: none;
    margin: 0;
    padding: 0;
  }

  a:visited {
    color:inherit;
  }

  ul {
    list-style-image: url(${tree});
    list-style-position: inside;
  }

  li {
  	font-size: 16px;
  	line-height: 2;
  }

  h2 {
    font-family: 'proxima-nova';
    font-weight: bold;
    padding-top: 20px;
    color: ${constants.green};

  }

  p {
    font-family: 'proxima-nova';
    font-size: 16px;
  }

  .DayPicker-Day--highlighted {
    background-color: #eeeeee;
  }
`;
