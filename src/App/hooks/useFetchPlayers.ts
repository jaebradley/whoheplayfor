import * as React from 'react';
import useFetch from 'use-http';

import { Player } from '@Src/types';

export default function useFetchPlayers(): { loading: boolean; error: Error; players: Player[] } {
  const { loading, error, data } = useFetch(
    `https://cors-anywhere.herokuapp.com/https://stats.nba.com/stats/leagueLeaders?LeagueID=00&PerMode=Totals&Scope=S&Season=${process.env.SEASON}&SeasonType=Regular+Season&StatCategory=MIN`,
    {},
    [],
  );
  const players = React.useMemo(() => {
    if (data?.resultSet?.rowSet) {
      return data.resultSet.rowSet.map((row: [number, number, string, string, number, number]) => {
        const [id, , name, teamAbbreviation, gamesPlayed, minutesPlayed] = row;
        return {
          id,
          name,
          teamAbbreviation,
          gamesPlayed,
          minutesPlayed,
        };
      });
    }
    return [];
  }, [data]);
  return {
    loading,
    error,
    players,
  };
}
