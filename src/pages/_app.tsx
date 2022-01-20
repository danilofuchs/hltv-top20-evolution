import { AppProps } from "next/app";
import Script from "next/script";
import "@src/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Global site tag (gtag.js) - Google Analytics */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-S3NKNK22NJ"
      />
      <Script
        id="gtm-script"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-S3NKNK22NJ');`,
        }}
      />
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9756679359419346"
        crossOrigin="anonymous"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
