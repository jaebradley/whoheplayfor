import * as React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { get, keys } from 'idb-keyval';

import { playerSelector } from '@App/selectors';
import PlayerImage from '@App/PlayerImage';

import { Player, StoredResult } from '@Src/types';
import resultsStore from '@Src/resultsStore';

function History(): React.ReactElement {
  const player = useRecoilValue<Player | null>(playerSelector);
  const [results, setResults] = React.useState<Array<StoredResult>>([]);
  const [endIndex, setEndIndex] = React.useState(0);

  React.useEffect(() => {
    keys(resultsStore)
      .then((keys) => Promise.all(keys.map((key) => get<StoredResult>(key, resultsStore))))
      .then((data) => {
        setResults(data);
        setEndIndex(data.length ? data.length - 1 : 0);
      });
  }, [setResults, player]);

  return (
    <StyledHistory>
      {results.slice(Math.max(endIndex - 4, 0), endIndex + 1).map((result) => (
        <PlayerImage key={result.player.id} playerId={result.player.id} />
      ))}
    </StyledHistory>
  );
}

const StyledHistory = styled.div`
  display: flex;
`;

export default History;
