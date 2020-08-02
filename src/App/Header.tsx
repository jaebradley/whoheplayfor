import * as React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import { InferProps } from 'prop-types';
import { Icon } from 'react-icons-kit';
import { ic_home } from 'react-icons-kit/md/ic_home';
import { ic_info } from 'react-icons-kit/md/ic_info';
import { ic_replay } from 'react-icons-kit/md/ic_replay';

import theme, { ThemeInterface } from '@App/styles/theme';
import GitHubLogo from '@Images/github.svg';

function Header({ className }: InferProps<typeof Header.propTypes>): React.ReactElement {
  return (
    <StyledHeader className={className || ''} theme={theme}>
      <StyledIcons>
        <StyledIcon size="1.75rem" icon={ic_home} />
        <StyledIcon size="1.75rem" icon={ic_info} />
        <StyledIcon size="1.75rem" icon={ic_replay} />
      </StyledIcons>
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
  justify-content: space-between;
  padding: 0 1rem 0;
`;

const StyledIcons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 7rem;
`;

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
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
