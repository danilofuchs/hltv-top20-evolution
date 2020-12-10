export interface Player {
  name: string;
  country: string | null;
  rankings: {
    "2013": number | null;
    "2014": number | null;
    "2015": number | null;
    "2016": number | null;
    "2017": number | null;
    "2018": number | null;
    "2019": number | null;
  };
}
