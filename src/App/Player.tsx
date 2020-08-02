import * as React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { ic_fast_forward } from 'react-icons-kit/md/ic_fast_forward';

import { Player } from '@Src/types';

import PlayerImage from '@App/PlayerImage';
import { ThemeInterface } from '@App/styles/theme';

type PlayerProps = {
  player: Player;
  onSkip: () => void;
};

function Player({ player, onSkip }: PlayerProps): React.ReactElement {
  const [isSkipFocused, setIsSkipFocused] = React.useState(false);

  const handleFocusSkip = React.useCallback(() => {
    setIsSkipFocused(true);
  }, [setIsSkipFocused]);

  const handleBlurSkip = React.useCallback(() => {
    setIsSkipFocused(false);
  }, [setIsSkipFocused]);

  if (!player) {
    return <div />;
  }

  return (
    <StyledPlayer>
      <StyledPlayerDetails>
        <PlayerImage playerId={player.id} remSize={5} />
        <StyledName>{player.name}</StyledName>
        <div
          onMouseEnter={handleFocusSkip}
          onMouseLeave={handleBlurSkip}
          onFocus={handleFocusSkip}
          onBlur={handleBlurSkip}
        >
          <StyledFastForward size="2rem" onClick={onSkip} icon={ic_fast_forward} isFocused={isSkipFocused} />
        </div>
      </StyledPlayerDetails>
    </StyledPlayer>
  );
}

const StyledPlayer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const StyledPlayerDetails = styled.div`
  align-items: center;
  background-color: moccasin;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  height: 11rem;
  width: 11rem;
  justify-content: center;
`;

const StyledName = styled.h5<{ theme: ThemeInterface }>`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  font-size: 1rem;
  margin: 1rem;
  text-align: center;
`;

const StyledFastForward = styled(Icon)<{ isFocused: boolean }>`
  color: ${({ theme }) => theme.primary};
  opacity: ${({ isFocused }) => (isFocused ? null : 0.3)};
`;

export default Player;
