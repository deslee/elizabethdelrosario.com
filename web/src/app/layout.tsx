import './globals.css'
import Image from "next/image";
import { getSiteData } from "./data";
import Link from "next/link";
import {
  faEnvelope,
  IconDefinition,
} from "@fortawesome/free-regular-svg-icons";
import {
  faFacebookF,
  faImdb,
  faInstagram,
  faLinkedinIn,
  faTwitter,
  faVimeoV,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Enum_Componentlayoutsocialicon_Icon } from "@/gql/graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const iconMap: Record<Enum_Componentlayoutsocialicon_Icon, IconDefinition> = {
  Email: faEnvelope,
  Facebook: faFacebookF,
  IMDb: faImdb,
  Instagram: faInstagram,
  LinkedIn: faLinkedinIn,
  Twitter: faTwitter,
  Vimeo: faVimeoV,
  Youtube: faYoutube,
};

export async function generateMetadata() {
  const data = await getSiteData();

  return {
    title: {
      default: data.title,
      template: `%s | ${data.title}`,
    },
    icons: {
      icon: data.favicon?.url,
      shortcut: data.favicon?.url,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getSiteData();
  return (
    <html lang="en">
      <body>
        <header className="relative text-white text-shadow-black">
          {data.header && (
            <Image
              src={data.header.url}
              alt={data.header.alternativeText ?? ""}
              fill={true}
              placeholder={data.header.placeholder ? "blur" : "empty"}
              blurDataURL={data.header.placeholder ?? undefined}
              className="absolute -z-10 object-cover"
            ></Image>
          )}
          <div className="py-24 flex flex-col items-center gap-8 justify-center">
            <div className="bg-black/20 p-2 rounded">
              <h1 className="p-8 text-center text-6xl uppercase tracking-wider border border-2 border-gray-300 rounded">
                {data.title}
              </h1>
            </div>
            <div className="text-xl text-center italic bg-black/10 px-8 py-4 rounded">
              {data.subtitle}
            </div>
          </div>
          <nav className="p-4 flex gap-8 text-xl justify-center rounded max-w-fit mx-auto">
            <Link className="nav-item" href="/">
              Home
            </Link>
            {data.categories.map((category) => (
              <Link
                className="nav-item"
                key={category.slug}
                href={`/${category.slug}`}
              >
                {category.name}
              </Link>
            ))}
            <Link className="nav-item" href="/bio">
              Bio
            </Link>
          </nav>
        </header>

        <main>{children}</main>
        <footer className="pt-16 pb-8 text-light tracking-widest uppercase text-center">
          <div className="flex justify-center gap-4 my-8">
            {data.socials.map((social) => {
              const icon = iconMap[social.icon];
              return (
                <Link
                  key={social.id}
                  href={social.icon === 'Email' ? `mailto:${social.url}` : social.url}
                  target="_blank"
                  title={social.icon}
                >
                  <FontAwesomeIcon
                    className="h-5 w-5 hover:text-primary"
                    icon={icon}
                  />
                </Link>
              );
            })}
          </div>
          <p className="text-xl">{data.footer}</p>
        </footer>
      </body>
    </html>
  );
}
