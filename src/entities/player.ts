export interface Player {
  name: string;
  country: string | null;
  rankings: {
    "2013": string | null;
    "2014": string | null;
    "2015": string | null;
    "2016": string | null;
    "2017": string | null;
    "2018": string | null;
    "2019": string | null;
  };
}
