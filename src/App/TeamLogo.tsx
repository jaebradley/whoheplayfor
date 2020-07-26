import * as React from 'react';
import styled from 'styled-components';

import { Team } from '@Src/types';

type TeamLogoProps = {
  className?: string;
  size?: string;
  team: Team;
  onClick: () => void;
};

const TeamLogo: React.FunctionComponent<TeamLogoProps> = ({
  className,
  team,
  size = '3rem',
  onClick,
}: TeamLogoProps) => (
  <StyledLogo
    className={className}
    onClick={onClick}
    alt={team.name}
    size={size}
    src={`https://stats.nba.com/media/img/teams/logos/${team.abbreviation}_logo.svg`}
  />
);

const StyledLogo = styled.img<{ size: string }>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

TeamLogo.defaultProps = {
  className: '',
  size: '3rem',
};

export default TeamLogo;
