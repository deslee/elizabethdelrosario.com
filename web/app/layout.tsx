import "./globals.css";
import { Quattrocento_Sans } from "@next/font/google";
import { getSiteSettings } from "../queries/common";
import Link from "next/link";

const font = Quattrocento_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { site, categories } = await getSiteSettings();
  return (
    <html>
      <head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          :root {
            --sans-font: ${font.style.fontFamily};
          }
        `,
          }}
        ></style>
      </head>
      <body>
        <header>hi</header>
        <nav>
          {categories.map((category) => (
            <Link key={category.id} href={`/${category.Slug}`}>
              {category.Name}
            </Link>
          ))}
        </nav>
        <main>{children}</main>
        <footer>footer</footer>
      </body>
    </html>
  );
}
