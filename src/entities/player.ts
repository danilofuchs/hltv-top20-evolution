export interface Player {
  /** In-game name */
  ign: string;
  rankings: PlayerPlacement[];
  id?: number;
  name?: string;
  image?: string;
  country?: string;
  profileUrl?: string;
  color?: string;
}

export interface PlayerTeam {
  id: number;
  name: string;
  logo?: string;
  startDate: number;
}

export interface PlayerPlacement {
  year: number;
  place: number | null;
  article: string;
  shouldLabel?: boolean;
  teams?: PlayerTeam[];
}

export interface YearRanking {
  year: number;
  article?: string;
  placings: YearPlacing[];
}

export interface YearPlacing {
  place: number;
  player: string;
  article?: string;
}
