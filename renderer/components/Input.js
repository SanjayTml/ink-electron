import { default as styled } from 'styled-components';
import { Input as BootstrapInput} from '@bootstrap-styled/v4';

const Input = styled(BootstrapInput)`
  ${(props) => `
      height: 34px;
  `};
`;

export default Input;
