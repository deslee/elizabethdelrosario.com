import clsx from "clsx";
import { Fragment, HTMLAttributes } from "react";
import ReactMarkdown from "react-markdown";
import { FragmentType, graphql, useFragment } from "../gql";
import Media from "./Media";

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

export default function Section({section: sectionProp}: Props) {
  const section = useFragment(SectionFragment, sectionProp);
  const media = section.Media.data
  return (
    <Fragment>
      <div className="text-center markdown mx-auto mt-8">
        <ReactMarkdown>{section.Description}</ReactMarkdown>
      </div>
      <div
        className={clsx(
          "mt-8 grid grid-flow-row gap-4 max-w-fit mx-auto",
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
              "",
              media.length <= 1
                ? "max-w-4xl"
                : media.length === 2 || media.length === 4
                ? "max-w-lg"
                : "max-w-md"
            )}
          >
            <Media media={m.attributes} />
          </div>
        ))}
      </div>
    </Fragment>
  );
}
