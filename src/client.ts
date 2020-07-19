import axios from 'axios';

function getLeagueLeaders(): Promise<string> {
  return axios.get(
    'https://stats.nba.com/stats/leagueLeaders?LeagueID=00&PerMode=PerGame&Scope=S&Season=2019-20&SeasonType=Regular+Season&StatCategory=PTS',
  );
}

function getPlayerImage({ id }: { id: number }): Promise<string> {
  return axios.get(`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/${id}/2019/260x190/201935.png`);
}

function getTeamLogo({ abbreviation }: { abbreviation: string }): Promise<string> {
  return axios.get(`https://stats.nba.com/media/img/teams/logos/${abbreviation}_logo.svg`);
}

export { getLeagueLeaders, getPlayerImage, getTeamLogo };
