import * as React from 'react';
import styled from 'styled-components';

function PlayerImage({ playerId }: { playerId: number }): React.ReactElement {
  const url = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`;
  return (
    <StyledLink>
      <StyledImage src={url} />
    </StyledLink>
  );
}

const StyledLink = styled.a`
  width: 10rem;
  height: 5rem;
  overflow: hidden;
  display: block;
`;

const StyledImage = styled.img`
  max-width: 10rem;
`;

export default PlayerImage;
