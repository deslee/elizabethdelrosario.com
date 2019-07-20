import Head from "next/head";

export const PageTitle = ({ title }: { title: string }) => <Head>
    <title>{title}</title>
    <meta property="og:title" key="og:title" content={title} />
    <meta property="twitter:title" key="twitter:title" content={title} />
</Head>

export const PageDescription = ({ description }: { description: string }) => <Head>
    <meta property="og:description" key="og:description" content={description} />
    <meta name="twitter:description" key="twitter:description" content={description} />
    <meta name="description" key="description" content={description} />
</Head>

export const PageMetaImage = ({ image }: { image: string }) => <Head>
    <meta property="og:image" key="og:image" content={image} />
    <meta name="twitter:image" key="twitter:image" content={image} />
</Head>