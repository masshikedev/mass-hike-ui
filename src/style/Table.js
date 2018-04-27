import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  empty-cells: show;
  table-layout: ${props => (props.fixed ? 'fixed' : 'auto')};
  margin: 20px 0 30px;
`;

export default Table;
