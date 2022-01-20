import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export function BottomAd() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9756679359419346"
        data-ad-slot="3635402802"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
}
