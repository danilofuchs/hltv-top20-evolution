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
            content="Player ranking evolution on HLTV Top 20, since 2013"
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
            content="Player ranking evolution on HLTV Top 20, since 2013"
          />
          <meta
            property="og:image"
            content="https://hltv.vercel.app/og_image.jpeg"
          />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="600" />

          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          {/* Global site tag (gtag.js) - Google Analytics */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-S3NKNK22NJ"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', 'G-S3NKNK22NJ');`,
            }}
          ></script>
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
