import * as React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

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
        {selectionConfirmation && <StyledOverlay />}
        {selectionConfirmation && <Result />}
        <StyledHeader />
        <SwitchTransition mode="out-in">
          <StyledTransition key={String(!loading && !error)} timeout={500} unmountOnExit classNames="main-content">
            <StyledMain key="content">
              {loading ? (
                <StyledLoading />
              ) : (
                <StyledContent isDisabled={selectionConfirmation}>
                  <StyledPlayerSection>
                    <PlayerComponent players={players} />
                  </StyledPlayerSection>
                  <Teams isDisabled={!!(player && selectionConfirmation)} />
                </StyledContent>
              )}
            </StyledMain>
          </StyledTransition>
        </SwitchTransition>
        <StyledFooter />
      </StyledApp>
    </>
  );
}

const StyledApp = styled.div<{ theme: ThemeInterface }>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`;

const StyledOverlay = styled.div`
  height: 100vh;
  left: 0;
  opacity: 0.3;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 2;
`;

const StyledMain = styled.main`
  display: grid;
  grid-column-start: 1;
  grid-column-end: 4;
  grid-template-columns: 1fr 2fr 1fr;
`;

const StyledTransition = styled(CSSTransition)`
  .main-content-enter {
    opacity: 0;
  }

  .main-content-exit {
    opacity: 1;
  }

  .main-content-enter-active {
    opacity: 1;
  }

  .main-content-exit-active {
    opacity: 0;
  }

  .main-content-enter-active,
  .main-content-exit-active {
    transition: opacity 500ms;
  }
`;

const StyledContent = styled.div<{ isDisabled: boolean }>`
  display: flex;
  flex-direction: column;
  grid-column: 2/3;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.3 : 'none')};
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'all')};
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
`;

const StyledFooter = styled(Footer)`
  grid-column-end: 4;
  grid-column-start: 1;
  grid-row: 3/3;
`;

export default App;
