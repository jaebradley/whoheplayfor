import * as React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { ic_person } from 'react-icons-kit/md/ic_person';

type PlayerImageProps = {
  className?: string;
  playerId: number;
  remSize: number;
};

function PlayerImage({ className, playerId, remSize }: PlayerImageProps): React.ReactElement {
  const url = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerId}.png`;
  return (
    <StyledLink remSize={remSize} className={className}>
      <StyledObject data={url} type="image/png" remSize={remSize}>
        <Icon size={`${remSize}rem`} icon={ic_person} />
      </StyledObject>
    </StyledLink>
  );
}

const StyledLink = styled.a<{ remSize: number }>`
  width: ${({ remSize }) => `${remSize * 2}rem`};
  height: ${({ remSize }) => `${remSize}rem`};
  overflow: hidden;
  display: block;
`;

const StyledObject = styled.object<{ remSize: number }>`
  max-width: ${({ remSize }) => `${remSize * 2}rem`};
`;

PlayerImage.defaultProps = {
  className: '',
  remSize: 5,
};

export default PlayerImage;
