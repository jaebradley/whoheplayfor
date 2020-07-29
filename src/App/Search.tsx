import * as React from 'react';
import styled, { css } from 'styled-components';
import { useRecoilState } from 'recoil';
import { Icon } from 'react-icons-kit';
import { ic_delete } from 'react-icons-kit/md/ic_delete';

import { ThemeInterface } from '@App/styles/theme';
import { searchTermState } from '@App/atoms';

function Search(): React.ReactElement {
  const [searchTerm, setSearchTerm] = useRecoilState<string | null>(searchTermState);
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOnChange = React.useCallback(
    (e) => {
      setSearchTerm(e.target.value);
    },
    [setSearchTerm],
  );
  const handleOnFocus = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);
  const handleClear = React.useCallback(() => {
    setIsOpen(false);
    setSearchTerm(null);
  }, [setIsOpen, setSearchTerm]);
  const handleKeyDown = React.useCallback(
    (e) => {
      if (e.keyCode === 27) {
        handleClear();
        e.target.blur();
      }
    },
    [handleClear],
  );
  return (
    <StyledSearchWrapper>
      <StyledLabel isOpen={isOpen}>
        <StyledInput
          type="text"
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onKeyDown={handleKeyDown}
          value={searchTerm || ''}
        />
      </StyledLabel>
      {!!searchTerm && <StyledIcon onClick={handleClear} icon={ic_delete} />}
    </StyledSearchWrapper>
  );
}

const StyledSearchWrapper = styled.div`
  display: flex;
  align-items: center;
`;

// Copied from https://codepen.io/sebastianpopp/pen/myYmmy
const StyledLabel = styled.label<{ isOpen: boolean; theme: ThemeInterface }>`
  align-items: center;
  display: flex;
  position: relative;
  height: 2rem;
  width: 2rem;
  box-sizing: border-box;
  padding: 0 0.5rem 0 0.5rem;
  border: 0.1875rem solid ${(props) => props.theme.primary};
  border-radius: 1rem;
  transition: all 200ms ease;
  cursor: text;

  &:after {
    content: '';
    position: absolute;
    width: 0.1875rem;
    height: 1.25rem;
    right: -0.3125rem;
    top: 1.25rem;
    background: ${(props) => props.theme.primary};
    border-radius: 0.1875rem;
    transform: rotate(-45deg);
    transition: all 200ms ease;
  }

  ${(props) =>
    props.isOpen &&
    css`
      width: 15rem;
      margin-right: 0;

      &:after {
        height: 0;
      }
    `}
`;

const StyledInput = styled.input<{ theme: ThemeInterface }>`
  background: transparent;
  border: none;
  box-sizing: border-box;
  caret-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.primary};
  font-size: 1rem;
  outline-width: 0;
  width: 100%;
`;

const StyledIcon = styled(Icon)<{ theme: ThemeInterface }>`
  color: ${(props) => props.theme.primary};
`;

export default Search;
