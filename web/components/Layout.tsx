import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { FragmentType, graphql, useFragment } from "../gql";

const Layout_QueryFragment = graphql(`
  fragment Layout_QueryFragment on Query {
    site {
      data {
        id
        attributes {
          Title
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
  title?: string;
};

const LayoutContext = createContext({ title: "" });

export function useSiteTitle() {
  const value = useContext(LayoutContext);
  return value.title;
}

export default function Layout(props: PropsWithChildren<Props>) {
  const query = useFragment(Layout_QueryFragment, props.query);
  const site = query.site.data.attributes;

  useEffect(() => {
    console.log("mount layout");
    return () => {
      console.log("unmount layout");
    };
  }, []);

  return (
    <LayoutContext.Provider value={{ title: site.Title }}>
      <Head>
        <title>{props.title}</title>
      </Head>
      <header className="relative text-white text-shadow-black">
        {site.Header && (
          <Image
            src={site.Header.data.attributes.url}
            alt={site.Header.data.attributes.alternativeText ?? ""}
            fill={true}
            placeholder="blur"
            blurDataURL={site.Header.data.attributes.placeholder}
            className="absolute -z-10 object-cover"
          ></Image>
        )}
        <div className="py-24 flex flex-col items-center gap-8 justify-center">
          <h1 className="p-8 text-center text-6xl uppercase tracking-wider border">
            {site.Title}
          </h1>
          <div className="text-xl italic">{site.Subtitle}</div>
        </div>
        <nav className="p-8 flex gap-8 text-xl justify-center">
          <Link href="/">Home</Link>
          {query.categories.data.map((category) => (
            <Link
              href={`/${category.attributes.Slug}`}
              key={category.id}
              className=""
            >
              {category.attributes.Name}
            </Link>
          ))}
          <Link href="/bio">Bio</Link>
        </nav>
      </header>

      <main className="grow">{props.children}</main>
      <footer className="pt-16 pb-8 text-light tracking-widest uppercase text-center">
        <p className="text-xl">{site.Footer}</p>
      </footer>
    </LayoutContext.Provider>
  );
}
