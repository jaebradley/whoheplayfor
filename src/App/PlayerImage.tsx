import * as React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { ic_person } from 'react-icons-kit/md/ic_person';

function PlayerImage({ playerId }: { playerId: number }): React.ReactElement {
  const url = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`;
  return (
    <StyledLink>
      <StyledObject data={url} type="image/png">
        <Icon size="5rem" icon={ic_person} />
      </StyledObject>
    </StyledLink>
  );
}

const StyledLink = styled.a`
  width: 10rem;
  height: 5rem;
  overflow: hidden;
  display: block;
`;

const StyledObject = styled.object`
  max-width: 10rem;
`;

export default PlayerImage;
