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
  shouldLabel?: boolean;
}
