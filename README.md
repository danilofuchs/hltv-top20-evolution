# HLTV.org Top 20 Ranking evolution

Evolution of HTLV.org CS:GO players ranking across time.

## Getting Started

First, run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Updating with latest information

This [Google Sheets document](https://docs.google.com/spreadsheets/d/1xDqUbElQVN6Ns2JdtmaHvt_iq1J5IB6yhkqP--ggrLk/edit?usp=sharing) contains information about every ranking every year.

- Duplicate the latest year ranks in a new sheet
- Fill in the rankings for the year
- Add missing players to the main sheet
- Export this sheet to `scripts/players.csv`
- `cd scripts`
- `yarn install`
- `yarn generate`
- Add references to the new year wherever necessary
- :tada:
