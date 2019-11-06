import { default as styled } from 'styled-components';
import { Col } from '@bootstrap-styled/v4';

const Panel = styled(Col)`
  ${(props) => `
     background-color: ${props.theme['$panel-bg']};
     padding-right: 0 !important;
     padding-left: 0 !important;
  `};
`;

export default Panel;
