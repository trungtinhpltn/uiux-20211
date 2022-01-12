import Head from "next/head";
import { memo } from "react";

const Seo = ({ seo }) => {
  return (
    <Head>
      {seo?.meta_title && (
        <>
          <title>{seo?.meta_title}</title>
          <meta property="og:title" content={seo?.meta_title} />
          <meta name="twitter:title" content={seo?.meta_title} />
        </>
      )}
      {seo?.meta_description && (
        <>
          <meta name="description" content={seo?.meta_description} />
          <meta property="og:description" content={seo?.meta_description} />
          <meta name="twitter:description" content={seo?.meta_description} />
        </>
      )}
    </Head>
  );
};

export default memo(Seo);
