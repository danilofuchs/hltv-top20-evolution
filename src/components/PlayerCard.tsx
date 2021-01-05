import { Player } from "@src/entities/player";
import clsx from "clsx";
import styles from "./PlayerCard.module.css";

export function PlayerCard(props: { player: Player }) {
  const { player } = props;

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={player.profileUrl}
      className={clsx(styles.card, styles.playerCard)}
      style={{ borderColor: player.color }}
    >
      <img className={styles.photo} src={player.image} />
      <h2 className={styles.ign}>{player.ign}</h2>
      <div className={styles.subtitle}>
        <img
          className={styles.flag}
          src={`https://www.hltv.org/img/static/flags/30x20/${player.country}.gif`}
        />
        <h3 className={styles.name}>{player.name}</h3>
      </div>
      <div className={styles.divider} />
      <ul>
        {player.rankings.map(
          (ranking) =>
            ranking.place && (
              <li>
                {ranking.year}: #{ranking.place}
              </li>
            )
        )}
      </ul>
    </a>
  );
}
