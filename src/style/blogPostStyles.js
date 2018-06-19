import { injectGlobal } from 'styled-components';
import { constants } from '../style';

injectGlobal`
  .blog-text {
    p {
      font-size: 16px;
      line-height: 22px;
      font-family: 'Source Serif Pro', Serif;
    }

    h2 {
      font-family: 'proxima-nova';
      font-weight: bold;
      padding-top: 30px;
      color: ${constants.green};
      margin-bottom: 5px;
    }

    img {
      margin-top: 30px;
      margin-bottom: 5px;
    }

    h3 {
      letter-spacing: 1px;
    }
  }
`;
