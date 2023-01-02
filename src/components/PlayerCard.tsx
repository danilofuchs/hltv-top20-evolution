import { Player, PlayerPlacement } from "@src/entities/player";
import clsx from "clsx";
import styles from "./PlayerCard.module.css";
import React, { useMemo } from "react";
import { Avatar } from "@src/assets/Avatar";
import { getCountryFlagSrc } from "@src/utils/country";
import Image from "next/image";

export function PlayerCard(props: { player: Player | null }) {
  const { player } = props;

  const sortedRankings = useMemo(() => {
    if (!player) {
      return [];
    }
    const copy = [...player.rankings];
    copy.sort((a, b) => b.year - a.year);
    return copy;
  }, [player]);

  if (!player) {
    return (
      <div className={clsx(styles.card, styles.playerCard)}>
        <Avatar />
        <h2>Select a player on the graph to see details</h2>
      </div>
    );
  }

  return (
    <div
      className={clsx(styles.card, styles.playerCard)}
      style={{ borderColor: player.color }}
    >
      {player.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={`Player ${player.ign}`}
          className={styles.photo}
          src={player.image}
        />
      ) : (
        <Avatar />
      )}
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
          <Image
            alt={`Flag of the player's country (${player.country})`}
            width={22}
            height={22}
            src={getCountryFlagSrc(player.country)}
          />
        )}
        <h3
          className={clsx(styles.name, {
            [styles.nameWithMargin]: player.country,
          })}
        >
          {player.name}
        </h3>
      </div>
      <div className={styles.divider} />
      {sortedRankings.map((ranking) => (
        <YearPlacementRow
          key={ranking.year}
          player={player}
          placement={ranking}
        />
      ))}
    </div>
  );
}

function YearPlacementRow(props: {
  player: Player;
  placement: PlayerPlacement;
}) {
  const { player, placement } = props;

  if (placement.place === null) {
    return null;
  }

  return (
    <a
      className={styles.yearPlacementRow}
      href={placement.article}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div>{placement.year}</div>
      <div>#{placement.place}</div>
      <div className={styles.yearPlacementTeams}>
        {placement.teams?.map((team) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={team.id + team.startDate}
            alt={team.name}
            width={22}
            height={22}
            src={
              team.logo ?? "https://hltv.org/img/static/team/placeholder.svg"
            }
          />
        ))}
      </div>
    </a>
  );
}
