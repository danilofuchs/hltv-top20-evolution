import Head from "next/head";
import styles from "@src/styles/Home.module.css";
import { BumpChart } from "@src/components/BumpChart";
import playersJson from "@src/data/players.json";

export default function Home() {
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

        <div className={styles.card}>
          <BumpChart players={playersJson} />
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerGithub}>
          <a
            href="https://github.com/danilofuchs/hltv-top20-evolution"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made by @danilofuchs{" "}
            <img
              src="/images/github/Github-Mark-32px.png"
              srcSet="/images/github/Github-Mark-32px.png 1x, /images/github/Github-Mark-64px.png 2x, /images/github/Github-Mark-120px-plus.png 3x"
              alt="Github Logo"
              className={styles.logo}
            />
          </a>
        </div>
        <div className={styles.footerVictory}>
          <a
            href="https://formidable.com/open-source/victory/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Graphs made using Victory
          </a>
        </div>
      </footer>
    </div>
  );
}
