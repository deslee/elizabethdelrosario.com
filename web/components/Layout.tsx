import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { FragmentType, graphql, useFragment } from "../gql";
import { Enum_Componentlayoutsocialicon_Icon } from "../gql/generated/graphql";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaVimeoV,
  FaEnvelope,
  FaYoutube,
  FaImdb,
} from "react-icons/fa";
import { IconType } from "react-icons";
import { Flipper, Flipped } from "react-flip-toolkit";
import ReactMarkdown from "react-markdown";

const iconMap: Record<Enum_Componentlayoutsocialicon_Icon, IconType> = {
  Email: FaEnvelope,
  Facebook: FaFacebookF,
  IMDb: FaImdb,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedinIn,
  Twitter: FaTwitter,
  Vimeo: FaVimeoV,
  Youtube: FaYoutube,
};

const Layout_QueryFragment = graphql(`
  fragment Layout_QueryFragment on Query {
    site {
      data {
        id
        attributes {
          Title
          Favicon {
            data {
              attributes {
                url
                formats
              }
            }
          }
          Subtitle
          Footer
          Header {
            data {
              attributes {
                url
                alternativeText
                placeholder
              }
            }
          }
          Socials {
            Icon
            Url
          }
        }
      }
    }
    categories {
      data {
        id
        attributes {
          Name
          Slug
        }
      }
    }
  }
`);

type Props = {
  query: FragmentType<typeof Layout_QueryFragment>;
  slug: string;
};

const LayoutContext = createContext({ title: "" });

export function useSiteTitle() {
  const value = useContext(LayoutContext);
  return value.title;
}

export default function Layout(props: PropsWithChildren<Props>) {
  const query = useFragment(Layout_QueryFragment, props.query);
  const site = query.site.data.attributes;
  const slug = props.slug;

  useEffect(() => {
    console.log("mount layout");
    return () => {
      console.log("unmount layout");
    };
  }, []);

  return (
    <LayoutContext.Provider value={{ title: site.Title }}>
      <Head>
        <title>{site.Title}</title>
        {site.Favicon.data && (
          <link
            rel="icon"
            type="image/x-icon"
            href={
              site.Favicon.data.attributes.formats.thumbnail?.url ??
              site.Favicon.data.attributes.url
            }
          />
        )}
      </Head>
      <header className="relative text-white text-shadow-black">
        {site.Header && (
          <Image
            src={site.Header.data.attributes.url}
            alt={site.Header.data.attributes.alternativeText ?? ""}
            fill={true}
            placeholder={
              site.Header.data.attributes.placeholder ? "blur" : "empty"
            }
            blurDataURL={site.Header.data.attributes.placeholder}
            className="absolute -z-10 object-cover"
          ></Image>
        )}
        <div className="py-24 flex flex-col items-center gap-8 justify-center">
          <div className="bg-black/20 p-2 rounded">
            <h1 className="p-8 text-center text-6xl uppercase tracking-wider border border-2 border-gray-300 rounded">
              {site.Title}
            </h1>
          </div>
          <ReactMarkdown className="text-xl text-center italic bg-black/10 px-8 py-4 rounded">
            {site.Subtitle}
          </ReactMarkdown>
        </div>
        <Flipper flipKey={slug}>
          <nav className="p-8 flex gap-8 text-xl justify-center rounded max-w-fit mx-auto">
            <Link className="nav-item" href="/">
              Home
              {slug === "featured" && (
                <Flipped flipId={"indicator"}>
                  <div className="absolute bottom-0 w-full left-0 border-b-2">
                    &nbsp;
                  </div>
                </Flipped>
              )}
            </Link>
            {query.categories.data
              .filter((c) => c.attributes.Slug !== "featured")
              .map((category) => (
                <Link
                  href={`/${category.attributes.Slug}`}
                  key={category.id}
                  className="nav-item"
                >
                  {category.attributes.Name}
                  {slug === category.attributes.Slug && (
                    <Flipped flipId="indicator">
                      <div className="absolute bottom-0 w-full left-0 border-b-2">
                        &nbsp;
                      </div>
                    </Flipped>
                  )}
                </Link>
              ))}
            <Link className="nav-item" href="/bio">
              Bio
              {slug === "bio" && (
                <Flipped flipId="indicator">
                  <div className="absolute bottom-0 w-full left-0 border-b-2">
                    &nbsp;
                  </div>
                </Flipped>
              )}
            </Link>
          </nav>
        </Flipper>
      </header>

      <main className="grow">{props.children}</main>
      <footer className="pt-16 pb-8 text-light tracking-widest uppercase text-center">
        <div className="flex justify-center gap-4 my-8">
          {site.Socials.map((social) => {
            const Icon = iconMap[social.Icon];
            return (
              <Link
                key={social.Url}
                href={social.Url}
                target="_blank"
                title={social.Icon}
              >
                <Icon className="h-5 w-5 hover:fill-primary" />
              </Link>
            );
          })}
        </div>
        <p className="text-xl">{site.Footer}</p>
      </footer>
    </LayoutContext.Provider>
  );
}
