import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="Best CS:GO pro players of all time, ranked across the years"
          />
          <meta
            name="keywords"
            content="CS:GO, HLTV, Gamer, Chart, Counter Strike"
          />
          <link rel="icon" href="/favicon.png" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:title" content="HLTV.org Top 20 Evolution" />
          <meta
            property="og:description"
            content="Best CS:GO pro players of all time, ranked across the years"
          />
          <meta
            property="og:image"
            content="https://hltv.vercel.app/og_image.png"
          />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
