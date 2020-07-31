import * as React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import useFetchPlayers from '@App/hooks/useFetchPlayers';
import { playerState, selectionConfirmationState } from '@App/atoms';

import { Player } from '@Src/types';
import GlobalStyle from '@App/styles/global';
import { ThemeInterface } from '@App/styles/theme';

import Footer from './Footer';
import Header from './Header';
import Loading from './Loading';
import Teams from './Teams';
import Result from './Result';
import PlayerComponent from './Player';

function App(): React.ReactElement {
  const selectionConfirmation = useRecoilValue(selectionConfirmationState);
  const [player] = useRecoilState<Player | null>(playerState);
  const { loading, error, players } = useFetchPlayers();

  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <StyledHeader />
        {loading && <StyledLoading />}
        {!loading && error && <div>Error</div>}
        {!loading && !error && (
          <StyledContent>
            <StyledPlayerSection>
              <PlayerComponent players={players} />
            </StyledPlayerSection>
            {player && !selectionConfirmation && <Teams />}
            {selectionConfirmation && <Result />}
          </StyledContent>
        )}
        <StyledFooter />
      </StyledApp>
    </>
  );
}

const StyledApp = styled.div<{ theme: ThemeInterface }>`
  background-color: floralwhite;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-rows: auto 1fr 3rem;
  height: 100vh;
`;

const StyledContent = styled.main`
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

const StyledLoading = styled(Loading)`
  grid-column-end: 4;
  grid-column-start: 1;
  grid-row: 2/3;
`;

const StyledFooter = styled(Footer)`
  grid-column-end: 4;
  grid-column-start: 1;
  grid-row: 3/3;
`;

export default App;
