function generatePlayerImageURL({ playerId }: { playerId: number }): string {
  return `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`;
}

export default generatePlayerImageURL;
