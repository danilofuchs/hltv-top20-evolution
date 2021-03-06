import { Player } from "@src/entities/player";
import clsx from "clsx";
import styles from "./PlayerCard.module.css";
import React, { useMemo } from "react";
import { Avatar } from "@src/assets/Avatar";
import { getCountryFlagSrc } from "@src/utils/country";

export function PlayerCard(props: { player: Player | null }) {
  const { player } = props;

  if (!player) {
    return (
      <div className={clsx(styles.card, styles.playerCard)}>
        <Avatar />
        <h2>Select a player on the graph to see details</h2>
      </div>
    );
  }

  const sortedRankings = useMemo(() => {
    const copy = [...player.rankings];
    copy.sort((a, b) => b.year - a.year);
    return copy;
  }, [player.rankings]);

  return (
    <div
      className={clsx(styles.card, styles.playerCard)}
      style={{ borderColor: player.color }}
    >
      <img className={styles.photo} src={player.image} />
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={player.profileUrl}
        className={styles.ign}
      >
        {player.ign}
      </a>
      <div className={styles.subtitle}>
        {player.country && (
          <img
            className={styles.flag}
            src={getCountryFlagSrc(player.country)}
          />
        )}
        <h3 className={styles.name}>{player.name}</h3>
      </div>
      <div className={styles.divider} />
      <ul>
        {sortedRankings.map(
          (ranking) =>
            ranking.place && (
              <li key={ranking.year}>
                {ranking.article ? (
                  <a
                    className={styles.rankingArticleLink}
                    href={ranking.article}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ranking.year}: #{ranking.place}
                  </a>
                ) : (
                  <>
                    {ranking.year}: #{ranking.place}
                  </>
                )}
              </li>
            )
        )}
      </ul>
    </div>
  );
}
