export interface Player {
  name: string;
  country: string | null;
  rankings: PlayerRank[];
}

export interface PlayerRank {
  year: number;
  place: number | null;
}
