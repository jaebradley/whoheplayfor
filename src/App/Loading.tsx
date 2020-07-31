import * as React from 'react';
import styled from 'styled-components';

import NBA from '@Images/nba.gif';
import { InferProps } from 'prop-types';
import * as PropTypes from 'prop-types';

function Loading({ className }: InferProps<typeof Loading.propTypes>): React.ReactElement {
  return (
    <StyledContent className={className || ''}>
      <StyledLoadingWrapper>
        <StyledImage src={NBA} />
        <StyledLoadingDots>Loading</StyledLoadingDots>
      </StyledLoadingWrapper>
    </StyledContent>
  );
}

const StyledContent = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  height: 100%;
  justify-content: center;
`;

const StyledLoadingWrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledImage = styled.img`
  height: 10rem;
  width: 10rem;
`;

const StyledLoadingDots = styled.div`
  color: ${({ theme }) => theme.secondary};
  padding-top: 1rem;

  :after {
    position: absolute;
    margin-left: 0.1rem;
    content: ' ...';
    display: inline-block;
    animation: loading steps(4) 2s infinite;
    clip: rect(auto, 0rem, auto, auto);
  }

  @keyframes loading {
    to {
      clip: rect(auto, 1rem, auto, auto);
    }
  }
`;

Loading.propTypes = {
  className: PropTypes.string,
};

Loading.defaultProps = {
  className: '',
};

export default Loading;
