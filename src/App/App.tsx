import * as React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil/dist';
import styled from 'styled-components';

import useFetchPlayers from '@App/hooks/useFetchPlayers';
import { playerState, selectionConfirmationState } from '@App/atoms';
import { resultSelector } from '@App/selectors';

import { Player } from '@Src/types';
import GlobalStyle from '@App/styles/global';
import { ThemeInterface } from '@App/styles/theme';

import Header from './Header';
import Teams from './Teams';
import Result from './Result';
import PlayerComponent from './Player';

function App(): React.ReactElement {
  const result = useRecoilValue<boolean | null>(resultSelector);
  const selectionConfirmation = useRecoilValue(selectionConfirmationState);
  const [player] = useRecoilState<Player | null>(playerState);
  const { loading, error, players } = useFetchPlayers();

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <StyledHeader />
        <StyledContent>
          <StyledPlayerSection>
            <PlayerComponent players={players} />
          </StyledPlayerSection>
          {selectionConfirmation && <Result result={!!result} />}
          {player && !selectionConfirmation && <Teams />}
        </StyledContent>
      </StyledApp>
    </>
  );
}

const StyledApp = styled.div<{ theme: ThemeInterface }>`
  background-color: floralwhite;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  grid-row: 2/3;
  grid-column: 2/3;
`;

const StyledPlayerSection = styled.section`
  align-items: center;
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const StyledHeader = styled(Header)`
  grid-column: 1/-1;
  place-items: center;
  text-align: center;
`;

export default App;
