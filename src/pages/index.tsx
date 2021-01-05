import React, { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import clsx from "clsx";
import { Player } from "@src/entities/player";
import playersJson from "@src/data/players.json";

import { getPlayerColor } from "@src/utils/color";
import styles from "@src/styles/Home.module.css";

import { BumpChart } from "@src/components/BumpChart";
import { PlayerCard } from "@src/components/PlayerCard";
import { Footer } from "@src/components/Footer";

export default function Home() {
  const players: Player[] = useMemo(
    () =>
      playersJson.map((player) => ({
        ...player,
        color: getPlayerColor(player.ign),
      })),
    [playersJson]
  );

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const onPlayerClick = useCallback((player: Player) => {
    setSelectedPlayer(player);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>HLTV.org Top 20 Evolution</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a
            href="https://www.hltv.org/"
            rel="noopener noreferrer"
            target="blank"
          >
            HLTV.org
          </a>{" "}
          Top 20 Evolution
        </h1>
        <div className={styles.content}>
          <div className={clsx(styles.card, styles.chartCard)}>
            <BumpChart players={players} onPlayerClick={onPlayerClick} />
          </div>
          <div className={styles.playerCard}>
            <PlayerCard player={selectedPlayer} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
