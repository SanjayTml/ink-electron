import { default as styled } from 'styled-components';
import { Textarea as BootstrapTextarea} from '@bootstrap-styled/v4';

const Textarea = styled(BootstrapTextarea)`
  ${(props) => `
    font-size: 14px;
    width: 100%;  
    background: ${props.theme['$input-bg']};
    border: 3px solid ${props.theme['$btn-info-bg']};
    border-radius: 5px;
    color: ${props.theme['$btn-info-bg']};
  `};
`;

export default Textarea;
