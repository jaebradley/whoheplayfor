import * as React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import { InferProps } from 'prop-types';

import theme, { ThemeInterface } from '@App/styles/theme';
import GitHubLogo from '@Images/github.svg';

function Header({ className }: InferProps<typeof Header.propTypes>): React.ReactElement {
  return (
    <StyledHeader className={className || ''} theme={theme}>
      <a href="https://github.com/jaebradley/whoheplayfor" target="_blank" rel="noreferrer">
        <StyledGithubLogo />
      </a>
    </StyledHeader>
  );
}

const StyledHeader = styled.header<{ theme: ThemeInterface }>`
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  height: 4rem;
  justify-content: flex-end;
  padding: 0 1rem 0;
`;

const StyledGithubLogo = styled(GitHubLogo)`
  background-color: ${({ theme }) => theme.primary};
  fill: ${({ theme }) => theme.secondary};
  height: 2rem;
  width: 2rem;
`;

Header.propTypes = {
  className: PropTypes.string,
};

Header.defaultProps = {
  className: '',
};

export default Header;
