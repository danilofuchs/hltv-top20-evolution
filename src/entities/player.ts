export interface Player {
  name: string;
  country: string | null;
  rankings: PlayerRank[];
  color?: string;
}

export interface PlayerRank {
  year: number;
  place: number | null;
  shouldLabel?: boolean;
}
