import { default as styled } from 'styled-components';
import { Row } from '@bootstrap-styled/v4';

const StyledRow = styled.div`
  ${(props) => `
     background-color: ${props.theme['$brand-primary']};
     color: ${props.theme['$text-color']};
     border-top: 2px solid #101010;
     width: 100%;
     height: 50px;
     padding: 25px 15px;
     line-height: 0;
     font-weight: ${props.fontWeight};
  `};
`;

export default function PanelHeader({ title, icon, fontWeight }) {
  // TODO add icon
  return (
    <StyledRow fontWeight={fontWeight || 300}>{title}</StyledRow>
  );
}
