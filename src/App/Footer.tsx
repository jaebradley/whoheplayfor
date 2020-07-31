import * as React from 'react';
import styled from 'styled-components';
import { InferProps } from 'prop-types';
import * as PropTypes from 'prop-types';

function Footer({ className }: InferProps<typeof Footer.propTypes>): React.ReactElement {
  return (
    <StyledFooter className={className || ''}>
      <StyledTextWrapper>
        <a href="https://github.com/jaebradley/whoheplayfor" target="_blank" rel="noreferrer">
          <StyledText>made with ❤️ (and 🏀)</StyledText>
        </a>
      </StyledTextWrapper>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.primary};
`;

const StyledTextWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;

const StyledText = styled.span`
  color: ${({ theme }) => theme.secondary};
`;

Footer.propTypes = {
  className: PropTypes.string,
};

Footer.defaultProps = {
  className: '',
};

export default Footer;
