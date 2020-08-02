import * as React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useLocalStorage } from '@rehooks/local-storage';
import { set } from 'idb-keyval';

import generatePlayerImageURL from '@App/generatePlayerImageURL';
import useFetchPlayers from '@App/hooks/useFetchPlayers';
import useGetNextPlayer from '@App/hooks/useGetNextPlayer';
import { selectedTeamState, selectionConfirmationState } from '@App/atoms';
import { ThemeInterface } from '@App/styles/theme';
import { playerSelector } from '@App/selectors';

import { PlayerIteratorResult } from '@Src/makePlayersIterator';
import { Player } from '@Src/types';
import seenPlayersStore from '@Src/seenPlayersStore';
import resultsStore from '@Src/resultsStore';
import shuffle from '@Src/shuffle';
import GlobalStyle from '@App/styles/global';

import Footer from './Footer';
import Header from './Header';
import Loading from './Loading';
import Teams from './Teams';
import Result from './Result';
import PlayerComponent from './Player';

function App(): React.ReactElement {
  const selectionConfirmation = useRecoilValue(selectionConfirmationState);
  const selectedTeam = useRecoilValue(selectedTeamState);
  const [player, setPlayer] = useRecoilState<Player | null>(playerSelector);
  const { loading, error, players } = useFetchPlayers();
  const [currentPlayer, setCurrentPlayer] = useLocalStorage<Player>('currentPlayer');

  const shuffledPlayers = React.useMemo(() => shuffle(players), [players]);
  const getNextPlayer = useGetNextPlayer({ players: shuffledPlayers });

  React.useEffect(() => {
    if (currentPlayer && !player) {
      try {
        setPlayer(currentPlayer);
      } catch (e) {
        console.log('error', e, currentPlayer);
      }
    } else if (!player) {
      handleSelectNextPlayer();
    }
  });

  const handleSelectNextPlayer = React.useCallback(() => {
    return Promise.resolve()
      .then(() => {
        if (player) {
          return set(
            new Date().getTime(),
            {
              player,
              selectedTeam,
            },
            resultsStore,
          );
        }
        return null;
      })
      .then(() => {
        getNextPlayer().then(({ currentPlayer, nextPlayer }: PlayerIteratorResult) => {
          if (currentPlayer) {
            set(currentPlayer.id, currentPlayer.name, seenPlayersStore)
              .then(() => {
                if (nextPlayer) {
                  new Image().src = generatePlayerImageURL({ playerId: nextPlayer.id });
                }
              })
              .then(() => setCurrentPlayer(currentPlayer))
              .then(() => setPlayer(currentPlayer))
              .catch((e) => console.log('unable to set player in indexeddb', currentPlayer, e));
          }
        });
      })
      .catch((e) => console.log('unable to handle selecting next player', currentPlayer, e));
  }, [player, selectedTeam, getNextPlayer, setPlayer, setCurrentPlayer, currentPlayer]);

  return (
    <>
      <GlobalStyle />
      <StyledApp>
        {selectionConfirmation && <StyledOverlay />}
        {selectionConfirmation && <Result onClose={handleSelectNextPlayer} />}
        <StyledHeader />
        <SwitchTransition mode="out-in">
          <StyledTransition key={String(!loading && !error)} timeout={500} unmountOnExit classNames="main-content">
            <StyledMain key="content">
              {loading || error || !player ? (
                <StyledLoading />
              ) : (
                <StyledContent isDisabled={selectionConfirmation}>
                  <StyledPlayerSection>
                    <PlayerComponent onSkip={handleSelectNextPlayer} player={player} />
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
