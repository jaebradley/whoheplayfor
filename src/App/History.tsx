import * as React from 'react';
import styled, { css } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { get, keys } from 'idb-keyval';
import { Icon } from 'react-icons-kit';
import { ic_error } from 'react-icons-kit/md/ic_error';
import { ic_fast_forward } from 'react-icons-kit/md/ic_fast_forward';
import { ic_keyboard_arrow_left } from 'react-icons-kit/md/ic_keyboard_arrow_left';
import { ic_keyboard_arrow_right } from 'react-icons-kit/md/ic_keyboard_arrow_right';
import { ic_thumb_up } from 'react-icons-kit/md/ic_thumb_up';
import withSizes, { Sizes } from 'react-sizes';

import { playerSelector } from '@App/selectors';
import PlayerImage from '@App/PlayerImage';

import { Player, StoredResult } from '@Src/types';
import resultsStore from '@Src/resultsStore';

type HistoryProps = {
  className?: string;
  isMobile: boolean;
};

function formatPlayerName(name: string) {
  const words = name.split(' ');
  const firstInitial = words[0][0];
  return `${firstInitial}. ${words.slice(1).join(' ')}`;
}

function History({ isMobile }: HistoryProps): React.ReactElement {
  const player = useRecoilValue<Player | null>(playerSelector);
  const [results, setResults] = React.useState<Array<StoredResult>>([]);
  const [endIndex, setEndIndex] = React.useState<number | null>(null);

  const maxCount = React.useMemo<number>(() => (isMobile ? 2 : 5), [isMobile]);

  React.useEffect(() => {
    keys(resultsStore)
      .then((keys) => keys.filter((key) => results.every((result) => result.createdAt !== Number(key))))
      .then((keys) => Promise.all(keys.map((key) => get<StoredResult>(key, resultsStore))))
      .then((data: Array<StoredResult>) => {
        const nextResults = [...results, ...data];
        setResults(nextResults);
        if (endIndex === null || endIndex === results.length - 1) {
          setEndIndex(Math.max(nextResults.length - 1, 0));
        }
      });
    // Don't add results or else this will infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player?.id, endIndex, results.length]);

  const handlePreviousResultClick = React.useCallback(() => {
    setEndIndex(Math.max((endIndex || 0) - 1, 0));
  }, [setEndIndex, endIndex]);

  const handleNextResultClick = React.useCallback(() => {
    setEndIndex(Math.min(Math.max(results.length - 1, 0), (endIndex || 0) + 1));
  }, [setEndIndex, results, endIndex]);

  if (!results.length) {
    return <div />;
  }

  return (
    <StyledHistory>
      <div tabIndex={0} role="button">
        <StyledIterateResultIcon
          isDisabled={(endIndex || 0) < maxCount}
          size="3rem"
          icon={ic_keyboard_arrow_left}
          onClick={handlePreviousResultClick}
        />
      </div>
      {results.slice(Math.max((endIndex || 0) - maxCount + 1, 0), (endIndex || 0) + 1).map((result: StoredResult) => {
        const outcome: boolean | null =
          !result.player || !result.selectedTeam
            ? null
            : result.player.teamAbbreviation === result.selectedTeam.abbreviation;
        return (
          <StyledPlayerDetails key={result.player.id}>
            <StyledPlayerResult result={outcome}>
              <PlayerImage playerId={result.player.id} remSize={3} />
              <Icon size="1.5rem" icon={outcome === null ? ic_fast_forward : outcome ? ic_thumb_up : ic_error} />
            </StyledPlayerResult>
            <StyledName result={outcome}>
              {formatPlayerName(result.player.name)} ({result.player.teamAbbreviation})
            </StyledName>
          </StyledPlayerDetails>
        );
      })}

      <div tabIndex={0} role="button">
        <StyledIterateResultIcon
          isDisabled={endIndex === Math.max(results.length - 1, 0)}
          size="3rem"
          icon={ic_keyboard_arrow_right}
          onClick={handleNextResultClick}
        />
      </div>
    </StyledHistory>
  );
}

const StyledHistory = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  grid-column: 2/3;
`;

const StyledIterateResultIcon = styled(Icon)<{ isDisabled: boolean }>`
  color: ${({ theme }) => theme.secondary};
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      opacity: 0.3;
      pointer-events: none;
    `}
`;

const StyledPlayerDetails = styled.div`
  display: flex;
  flex-direction: column;
  height: 11rem;
`;

const StyledPlayerResult = styled.div<{ result: boolean | null }>`
  align-items: center;
  color: ${({ result, theme }) => (result === null ? 'gray' : result ? theme.secondary : 'red')};
  background-color: moccasin;
  border: 3px solid ${({ result, theme }) => (result === null ? 'gray' : result ? theme.secondary : 'red')};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  height: 5rem;
  justify-content: center;
  width: 5rem;
`;

const StyledName = styled.span<{ result: boolean | null }>`
  color: ${({ result, theme }) => (result === null ? 'gray' : result ? theme.secondary : 'red')};
  display: table;
  font-size: small;
  text-align: center;
  padding-top: 1rem;
  max-width: 5rem;
`;

History.defaultProps = {
  className: '',
  isMobile: false,
};

const mapSizesToProps = (sizes: Sizes) => ({
  isMobile: sizes.width < 480,
});

const HOCHistory = withSizes(mapSizesToProps)(History);

export default HOCHistory;
