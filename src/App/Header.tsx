import * as React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import { InferProps } from 'prop-types';
import { Icon } from 'react-icons-kit';
import { ic_menu } from 'react-icons-kit/md/ic_menu';

import theme, { ThemeInterface } from '@App/styles/theme';

function Header({ className }: InferProps<typeof Header.propTypes>): React.ReactElement {
  return (
    <StyledHeader className={className || ''} theme={theme}>
      <StyledLink href="#menu">
        <Icon size="2rem" icon={ic_menu} />
      </StyledLink>
    </StyledHeader>
  );
}

const StyledHeader = styled.header<{ theme: ThemeInterface }>`
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  height: 3rem;
`;

const StyledLink = styled.a<{ theme: ThemeInterface }>`
  color: ${({ theme }) => theme.secondary};
`;

Header.propTypes = {
  className: PropTypes.string,
};

Header.defaultProps = {
  className: '',
};

export default Header;
