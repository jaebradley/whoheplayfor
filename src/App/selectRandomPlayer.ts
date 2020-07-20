import { Player } from '../types';

const DIFFICULTY_LEVEL_TO_PLAYER_POOL_RATIO = new Map([
  ['ALL', 1],
  ['HARD', 0.3],
  ['MEDIUM', 0.4],
  ['EASY', 0.5],
]);

export default function selectRandomPlayer({
  players,
  difficultyLevel,
}: {
  players: Player[];
  difficultyLevel: string;
}): Player {
  const ratio = DIFFICULTY_LEVEL_TO_PLAYER_POOL_RATIO.get(difficultyLevel) || 1;
  const randomIndex = Math.floor(players.length * (1 - ratio)) + Math.floor(players.length * ratio * Math.random());
  return players[randomIndex];
}
