export interface Player {
  /** In-game name */
  ign: string;
  rankings: PlayerRank[];
  id?: number;
  name?: string;
  image?: string;
  country?: string;
  profileUrl?: string;
  color?: string;
}

export interface PlayerRank {
  year: number;
  place: number | null;
  article?: string;
  shouldLabel?: boolean;
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
