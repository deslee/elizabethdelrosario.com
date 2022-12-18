import clsx from "clsx";
import { createContext, useContext, useState } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import ReactMarkdown from "react-markdown";
import { FragmentType, graphql, useFragment } from "../gql";
import Media, { ImageModal } from "./Media";

const SectionFragment = graphql(`
  fragment SectionFragment on ComponentLayoutSection {
    Title
    Description
    Media {
      data {
        id
        attributes {
          ...MediaFragment
        }
      }
    }
  }
`);

type Props = {
  section: FragmentType<typeof SectionFragment>;
};

const SectionContext = createContext({
  selectedMedia: "",
  setMedia: (id: string) => {},
});

export function useSelectedMedia() {
  const { selectedMedia, setMedia } = useContext(SectionContext);
  return { selectedMedia, setMedia };
}

export default function Section({ section: sectionProp }: Props) {
  const section = useFragment(SectionFragment, sectionProp);
  const media = section.Media.data;
  const [selectedMediaId, setMedia] = useState("");
  const selectedMedia = media.find((media) => media.id === selectedMediaId);
  return (
    <SectionContext.Provider
      value={{ selectedMedia: selectedMediaId, setMedia }}
    >
      <div className="text-center markdown mx-auto mt-8">
        <ReactMarkdown>{section.Description}</ReactMarkdown>
      </div>
      <Flipper flipKey={selectedMediaId}>
        <div
          className={clsx(
            "mt-8 grid grid-flow-row gap-4 max-w-fit mx-auto relative",
            media.length <= 1
              ? "grid-cols-1"
              : media.length === 2 || media.length === 4
              ? "grid-cols-2"
              : "grid-cols-3"
          )}
        >
          {media.map((m) => (
            <div
              key={m.id}
              className={clsx(
                media.length <= 1
                  ? "max-w-4xl"
                  : media.length === 2 || media.length === 4
                  ? "max-w-lg"
                  : "max-w-md"
              )}
            >
              <Media id={m.id} media={m.attributes} />
            </div>
          ))}
        </div>
        {selectedMedia && (
          <div
            className="fixed inset-0 bg-black/40 cursor-pointer"
            onClick={() => {
              setMedia("");
            }}
          >
            <Flipped flipId={selectedMedia.id}>
              <div className="h-full">
                <ImageModal
                  id={selectedMedia.id}
                  media={selectedMedia.attributes}
                />
              </div>
            </Flipped>
          </div>
        )}
      </Flipper>
    </SectionContext.Provider>
  );
}
